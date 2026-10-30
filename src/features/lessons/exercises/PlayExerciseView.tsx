import { useEffect, useMemo, useRef, useState } from 'react';
import type { PlayExercise } from '@/types/lesson';
import { ChessBoard } from '@/components/ChessBoard';
import { Markdown } from '@/components/Markdown';
import { Button, Feedback } from '@/components/ui';
import { useEngine } from '@/engine/useEngine';
import { scoreToCp } from '@/engine/uci';
import { parseUci } from '@/lib/chess';
import { judgePlay, type PlayVerdict } from '@/lib/lessons/playGoal';
import { useChessGame } from '@/lib/useChessGame';
import type { ExerciseViewProps } from './types';

const GOAL_TEXT: Record<PlayExercise['goal'], string> = {
  mate: 'Objetivo: dar jaque mate',
  promote: 'Objetivo: coronar un peón',
  win: 'Objetivo: conseguir una ventaja decisiva',
  draw: 'Objetivo: conseguir las tablas',
};

/** Práctica contra Stockfish: el motor defiende con su mejor jugada. */
export function PlayExerciseView({ exercise, onSolved, solved }: ExerciseViewProps<PlayExercise>) {
  const [attempt, setAttempt] = useState(0);
  const [failures, setFailures] = useState(0);
  const [done, setDone] = useState(solved);
  return (
    <PlayAttempt
      key={attempt}
      exercise={exercise}
      done={done}
      onFinish={(success) => {
        if (success) {
          if (!done) onSolved(failures);
          setDone(true);
        } else {
          setFailures((f) => f + 1);
        }
      }}
      onRetry={() => setAttempt((a) => a + 1)}
    />
  );
}

function PlayAttempt({
  exercise,
  done,
  onFinish,
  onRetry,
}: {
  exercise: PlayExercise;
  done: boolean;
  onFinish: (success: boolean) => void;
  onRetry: () => void;
}) {
  const { engine, status, error } = useEngine();
  const game = useChessGame(exercise.fen);
  const student = exercise.fen.split(' ')[1] === 'b' ? 'b' : 'w';
  const [verdict, setVerdict] = useState<PlayVerdict>({ state: 'continue' });
  const [thinking, setThinking] = useState(false);
  const reported = useRef(false);
  const moveRef = useRef(game.move);
  useEffect(() => {
    moveRef.current = game.move;
  });

  const chess = useMemo(() => game.game(), [game]);
  const studentMoves = game.history.filter((m) => m.color === student).length;
  const finished = verdict.state !== 'continue';

  const finish = (v: PlayVerdict) => {
    setVerdict(v);
    if (v.state !== 'continue' && !reported.current) {
      reported.current = true;
      onFinish(v.state === 'success');
    }
  };

  // Tras cada jugada del alumno: comprobar objetivo y responder con el motor.
  const { currentFen, history } = game;
  useEffect(() => {
    if (!engine || finished) return;
    const g = game.game();
    const last = history[history.length - 1] ?? null;
    if (g.turn() === student) {
      // Turno del alumno: comprobar si ya ha terminado (por ejemplo, mate del motor).
      const v = judgePlay(exercise, g, student, studentMoves, last);
      if (v.state !== 'continue') finish(v);
      return;
    }
    const pre = judgePlay(exercise, g, student, studentMoves, last);
    if (pre.state !== 'continue') {
      finish(pre);
      return;
    }
    let alive = true;
    setThinking(true);
    engine
      .analyze(currentFen, { depth: exercise.engineDepth ?? 12 }, 'full')
      .then((result) => {
        if (!alive) return;
        const line = result.lines[0];
        // La puntuación del motor es desde el bando que mueve (el rival): se invierte para el alumno.
        const studentCp = line ? -scoreToCp(line.score) : undefined;
        const v = judgePlay(exercise, g, student, studentMoves, last, studentCp);
        if (v.state !== 'continue') {
          finish(v);
          setThinking(false);
          return;
        }
        setTimeout(() => {
          if (!alive) return;
          if (result.bestMove) moveRef.current(parseUci(result.bestMove), true);
          setThinking(false);
        }, 350);
      })
      .catch(() => setThinking(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- se reacciona solo a cambios de posición
  }, [currentFen, engine, finished]);

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]">
      <ChessBoard
        fen={game.fen}
        orientation={exercise.orientation ?? (student === 'w' ? 'white' : 'black')}
        interactive={!finished && !thinking && chess.turn() === student && game.isViewingLatest && !!engine}
        movableColor={student}
        onMove={(m) => game.move(m) !== null}
        lastMove={game.lastMove}
        keyboardInput
        label="Práctica contra el ordenador"
      />
      <div className="space-y-3">
        <Markdown text={exercise.prompt} />
        <p className="text-sm font-medium">{GOAL_TEXT[exercise.goal]}</p>
        {exercise.maxMoves && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Jugadas: {studentMoves} / {exercise.maxMoves}
          </p>
        )}
        {status === 'loading' && <Feedback tone="info">Cargando el motor…</Feedback>}
        {status === 'error' && <Feedback tone="error">No se pudo cargar el motor: {error}</Feedback>}
        {thinking && <p className="text-sm text-slate-500">El ordenador está pensando…</p>}
        {verdict.state === 'success' && <Feedback tone="success">{verdict.message}</Feedback>}
        {verdict.state === 'fail' && <Feedback tone="error">{verdict.message}</Feedback>}
        {(verdict.state === 'success' || done) && exercise.explanation && <Markdown text={exercise.explanation} />}
        {!finished && exercise.hint && <p className="text-sm text-slate-500">💡 {exercise.hint}</p>}
        <div className="flex flex-wrap gap-2">
          <Button onClick={onRetry}>{verdict.state === 'fail' ? 'Intentarlo de nuevo' : 'Reiniciar posición'}</Button>
        </div>
      </div>
    </div>
  );
}
