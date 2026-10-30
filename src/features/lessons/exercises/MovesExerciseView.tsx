import { useEffect, useRef, useState } from 'react';
import type { MovesExercise } from '@/types/lesson';
import { ChessBoard } from '@/components/ChessBoard';
import { Button, Feedback } from '@/components/ui';
import { Markdown } from '@/components/Markdown';
import { applyMove, formatLine, toSpanishSan, type MoveInput } from '@/lib/chess';
import { applyReply, evaluateMoveAttempt, studentColor } from '@/lib/lessons/exercise';
import type { ExerciseViewProps } from './types';

type Status = { tone: 'success' | 'error' | 'info'; text: string } | null;

export function MovesExerciseView({ exercise, onSolved, solved }: ExerciseViewProps<MovesExercise>) {
  const [fen, setFen] = useState(exercise.fen);
  const [ply, setPly] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [done, setDone] = useState(solved);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const color = studentColor(exercise.fen);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleMove = (move: MoveInput): boolean => {
    if (done || waiting) return false;
    const result = evaluateMoveAttempt(exercise, ply, fen, move);
    if (!result.legal) return false;
    if (!result.correct) {
      setMistakes((m) => m + 1);
      setStatus({ tone: 'error', text: result.message ?? `${toSpanishSan(result.san ?? '')} no es la jugada buscada. Inténtalo de nuevo.` });
      return false;
    }
    const played = applyMove(fen, move);
    if (!played) return false;
    setFen(played.fen);
    setLastMove({ from: played.move.from, to: played.move.to });
    setShowSolution(false);
    if (result.done) {
      setDone(true);
      setStatus({ tone: 'success', text: '¡Correcto!' });
      onSolved(mistakes);
      return true;
    }
    setStatus({ tone: 'info', text: `¡Bien! ${toSpanishSan(played.move.san)}. Ahora responde el rival…` });
    if (result.reply) {
      const reply = result.reply;
      setWaiting(true);
      timer.current = setTimeout(() => {
        const r = applyReply(played.fen, reply);
        if (r) {
          setFen(r.fen);
          setLastMove({ from: r.from, to: r.to });
        }
        setPly(result.nextPly ?? ply + 2);
        setWaiting(false);
        setStatus({ tone: 'info', text: 'Sigue: encuentra la siguiente jugada.' });
      }, 500);
    }
    return true;
  };

  const reset = () => {
    setFen(exercise.fen);
    setPly(0);
    setLastMove(null);
    setStatus(null);
    setShowSolution(false);
  };

  const expected = exercise.solution[ply];
  const expectedMove = expected ? applyMove(fen, expected)?.move : undefined;
  const arrows =
    showSolution && expectedMove && !done
      ? [{ startSquare: expectedMove.from, endSquare: expectedMove.to, color: 'rgba(22, 163, 74, 0.85)' }]
      : [];

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]">
      <ChessBoard
        fen={fen}
        orientation={exercise.orientation ?? color}
        interactive={!done && !waiting}
        movableColor={color === 'white' ? 'w' : 'b'}
        onMove={handleMove}
        lastMove={lastMove}
        arrows={arrows}
        keyboardInput
      />
      <div className="space-y-3">
        <Markdown text={exercise.prompt} />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Juegan las <strong>{color === 'white' ? 'blancas' : 'negras'}</strong>.
        </p>
        {status && <Feedback tone={status.tone}>{status.text}</Feedback>}
        {showHint && exercise.hint && !done && <Feedback tone="info">💡 {exercise.hint}</Feedback>}
        {done && exercise.explanation && (
          <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/40">
            <Markdown text={exercise.explanation} />
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Solución: {formatLine(exercise.fen, solutionSan(exercise))}
            </p>
          </div>
        )}
        {!done && (
          <div className="flex flex-wrap gap-2">
            {exercise.hint && (
              <Button onClick={() => setShowHint(true)} disabled={showHint}>
                Pista
              </Button>
            )}
            <Button
              onClick={() => {
                setShowSolution(true);
                setMistakes((m) => m + 1);
              }}
            >
              Ver jugada
            </Button>
            {ply > 0 && <Button onClick={reset}>Reiniciar</Button>}
          </div>
        )}
      </div>
    </div>
  );
}

function solutionSan(exercise: MovesExercise): string[] {
  let fen = exercise.fen;
  const san: string[] = [];
  for (const m of exercise.solution) {
    const r = applyMove(fen, m);
    if (!r) break;
    san.push(r.move.san);
    fen = r.fen;
  }
  return san;
}
