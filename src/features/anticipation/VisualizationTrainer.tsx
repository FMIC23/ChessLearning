import { useEffect, useMemo, useRef, useState } from 'react';
import type { Puzzle } from '@/types/puzzle';
import { ChessBoard } from '@/components/ChessBoard';
import { Markdown } from '@/components/Markdown';
import { MoveTextInput } from '@/components/MoveTextInput';
import { Badge, Button, Card, Feedback } from '@/components/ui';
import {
  buildVisualizationTask,
  checkVisualizationAnswer,
  pickRandom,
  VISUALIZATION_LEVELS,
  visualizationCandidates,
  type VisualizationLevel,
  type VisualizationTask,
} from '@/lib/anticipation';
import { applyMove, formatLine, needsPromotion, toSpanishSan, uciLineToSan, type MoveInput } from '@/lib/chess';
import { useProgress } from '@/store/progress';

type Phase = 'thinking' | 'correct' | 'wrong' | 'revealed';

export function VisualizationTrainer({ puzzles }: { puzzles: Puzzle[] }) {
  const [level, setLevel] = useState<VisualizationLevel>(1);
  const [round, setRound] = useState(0);
  const recent = useRef<string[]>([]);
  const candidates = useMemo(() => visualizationCandidates(puzzles, level), [puzzles, level]);
  const task = useMemo(() => {
    void round;
    const puzzle = pickRandom(candidates, recent.current);
    return puzzle ? buildVisualizationTask(puzzle) : null;
  }, [candidates, round]);

  useEffect(() => {
    if (task) recent.current = [...recent.current, task.puzzle.id].slice(-20);
  }, [task]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Dificultad:</span>
        {([1, 2, 3] as VisualizationLevel[]).map((l) => (
          <Button key={l} variant={level === l ? 'primary' : 'secondary'} aria-pressed={level === l} onClick={() => setLevel(l)}>
            {VISUALIZATION_LEVELS[l].label} · {VISUALIZATION_LEVELS[l].description}
          </Button>
        ))}
      </div>
      {!task ? (
        <Card>No hay posiciones para este nivel.</Card>
      ) : (
        <VisualizationTask key={`${task.puzzle.id}-${round}`} task={task} onNext={() => setRound((r) => r + 1)} />
      )}
    </div>
  );
}

function VisualizationTask({ task, onNext }: { task: VisualizationTask; onNext: () => void }) {
  const recordAnticipation = useProgress((s) => s.recordAnticipation);
  const [phase, setPhase] = useState<Phase>('thinking');
  const [from, setFrom] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [shownFen, setShownFen] = useState(task.startFen);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const recorded = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const color = task.finalFen.split(' ')[1] === 'b' ? 'negras' : 'blancas';

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const record = (success: boolean) => {
    if (recorded.current) return;
    recorded.current = true;
    recordAnticipation('visualization', success);
  };

  /** Reproduce en el tablero las jugadas imaginadas y, al final, la solución. */
  const replay = () => {
    const moves = task.puzzle.solution;
    let fen = task.startFen;
    moves.forEach((m, i) => {
      timers.current.push(
        setTimeout(() => {
          const r = applyMove(fen, m);
          if (!r) return;
          fen = r.fen;
          setShownFen(r.fen);
          setLastMove({ from: r.move.from, to: r.move.to });
        }, 700 * (i + 1)),
      );
    });
  };

  const answer = (move: MoveInput | string): boolean => {
    if (phase === 'correct' || phase === 'revealed') return false;
    const result = checkVisualizationAnswer(task, move);
    if (!result.legal) {
      setMessage('Esa jugada no es legal en la posición que deberías estar imaginando. ¡Revisa dónde está cada pieza!');
      return false;
    }
    if (result.correct) {
      record(true);
      setPhase('correct');
      setMessage(null);
      replay();
    } else {
      record(false);
      setPhase('wrong');
      const san = applyMove(task.finalFen, move)?.move.san;
      setMessage(`${san ? toSpanishSan(san) : 'Esa jugada'} no es la mejor. Vuelve a repasar la posición en tu cabeza.`);
    }
    return false;
  };

  const onSquare = (square: string) => {
    if (phase === 'correct' || phase === 'revealed') return;
    if (!from) {
      setFrom(square);
      return;
    }
    if (from === square) {
      setFrom(null);
      return;
    }
    const promotion = needsPromotion(task.finalFen, from, square) ? 'q' : undefined;
    answer(promotion ? { from, to: square, promotion } : { from, to: square });
    setFrom(null);
  };

  const solutionSan = uciLineToSan(task.startFen, task.puzzle.solution);
  const done = phase === 'correct' || phase === 'revealed';

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">
      <div>
        <ChessBoard
          fen={shownFen}
          orientation={color === 'blancas' ? 'white' : 'black'}
          lastMove={lastMove}
          highlights={from ? { [from]: 'rgba(47,111,214,0.5)' } : undefined}
          onSquareClick={onSquare}
          label="Posición inicial (las piezas no se mueven: imagina las jugadas)"
        />
        {!done && (
          <MoveTextInput
            fen={task.finalFen}
            onMove={(m) => answer(m)}
          />
        )}
      </div>
      {/* En el móvil, primero las jugadas a imaginar y luego el tablero. */}
      <div className="order-first space-y-4 lg:order-none">
        <Card>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge tone="blue">Visualización</Badge>
            <Badge>Dificultad {task.puzzle.rating}</Badge>
          </div>
          <p className="font-semibold">Sin mover las piezas, imagina estas jugadas:</p>
          <p className="my-3 rounded-lg bg-slate-100 p-3 font-mono text-lg dark:bg-slate-800">
            {formatLine(task.startFen, task.hiddenSan)}
          </p>
          <p>
            Ahora juegan las <strong>{color}</strong>. ¿Cuál es la mejor jugada en la posición resultante?
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Respóndela escribiéndola (p. ej. «Dxf7») o haciendo clic en la casilla de origen y en la de destino tal y como estarían
            las piezas después de esas jugadas.
          </p>
          {message && (
            <div className="mt-3">
              <Feedback tone="error">{message}</Feedback>
            </div>
          )}
          {!done && (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  record(false);
                  setPhase('revealed');
                  replay();
                }}
              >
                Mostrar la solución
              </Button>
              <Button variant="ghost" onClick={onNext}>
                Saltar
              </Button>
            </div>
          )}
        </Card>
        {done && (
          <Card className={phase === 'correct' ? 'border-emerald-400' : 'border-amber-400'}>
            <p className="text-lg font-semibold">{phase === 'correct' ? '✅ ¡Lo has visto!' : '📘 Solución'}</p>
            <p className="mt-1 text-sm">Mira cómo se desarrollan las jugadas en el tablero.</p>
            <p className="mt-2 font-mono text-sm">{formatLine(task.startFen, solutionSan)}</p>
            {task.puzzle.explanation && (
              <div className="mt-2">
                <Markdown text={task.puzzle.explanation} />
              </div>
            )}
            <Button variant="primary" className="mt-3" onClick={onNext}>
              Siguiente posición
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
