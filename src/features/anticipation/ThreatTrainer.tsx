import { useMemo, useRef, useState } from 'react';
import type { Puzzle } from '@/types/puzzle';
import { ChessBoard } from '@/components/ChessBoard';
import { Markdown } from '@/components/Markdown';
import { Badge, Button, Card, Feedback } from '@/components/ui';
import { pickRandom, threatCandidates } from '@/lib/anticipation';
import { applyMove, formatLine, parseUci, toSpanishSan, uciLineToSan, type MoveInput } from '@/lib/chess';
import { evaluateMoveAttempt } from '@/lib/lessons/exercise';
import { puzzleToExercise } from '@/features/tactics/usePuzzleSession';
import { useProgress } from '@/store/progress';

export function ThreatTrainer({ puzzles }: { puzzles: Puzzle[] }) {
  const candidates = useMemo(() => threatCandidates(puzzles), [puzzles]);
  const [round, setRound] = useState(0);
  const recent = useRef<string[]>([]);
  const puzzle = useMemo(() => {
    void round;
    const p = pickRandom(candidates, recent.current);
    if (p) recent.current = [...recent.current, p.id].slice(-20);
    return p;
  }, [candidates, round]);
  if (!puzzle) return <Card>No hay posiciones disponibles.</Card>;
  return <ThreatTask key={`${puzzle.id}-${round}`} puzzle={puzzle} onNext={() => setRound((r) => r + 1)} />;
}

function ThreatTask({ puzzle, onNext }: { puzzle: Puzzle; onNext: () => void }) {
  const recordAnticipation = useProgress((s) => s.recordAnticipation);
  const [fen, setFen] = useState(puzzle.fen);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [status, setStatus] = useState<'thinking' | 'wrong' | 'found' | 'revealed'>('thinking');
  const [message, setMessage] = useState<string | null>(null);
  const recorded = useRef(false);
  const attacker = puzzle.fen.split(' ')[1] === 'b' ? 'b' : 'w';
  const you = attacker === 'w' ? 'negras' : 'blancas';
  const rival = attacker === 'w' ? 'blancas' : 'negras';
  const done = status === 'found' || status === 'revealed';

  const record = (success: boolean) => {
    if (recorded.current) return;
    recorded.current = true;
    recordAnticipation('threats', success);
  };

  const onMove = (move: MoveInput): boolean => {
    if (done) return false;
    // Basta con identificar el primer golpe del rival (en los mates en 1 vale cualquier mate).
    const exercise = { ...puzzleToExercise(puzzle), solution: [puzzle.solution[0] ?? ''] };
    if (!puzzle.themes.includes('mateIn1')) exercise.goal = undefined;
    const r = evaluateMoveAttempt(exercise, 0, puzzle.fen, move);
    if (!r.legal) return false;
    if (r.correct) {
      const played = applyMove(puzzle.fen, move);
      if (played) {
        setFen(played.fen);
        setLastMove({ from: played.move.from, to: played.move.to });
      }
      record(true);
      setStatus('found');
      setMessage(null);
      return true;
    }
    record(false);
    setStatus('wrong');
    setMessage(`${r.san ? toSpanishSan(r.san) : 'Esa jugada'} no es la amenaza más peligrosa. Busca jaques, capturas y ataques dobles.`);
    return false;
  };

  const first = puzzle.solution[0] ? parseUci(puzzle.solution[0]) : null;
  const arrows = status === 'revealed' && first ? [{ startSquare: first.from, endSquare: first.to, color: 'rgba(220,38,38,0.85)' }] : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">
      <ChessBoard
        fen={fen}
        orientation={attacker === 'w' ? 'black' : 'white'}
        interactive={!done}
        movableColor={attacker}
        onMove={onMove}
        lastMove={lastMove}
        arrows={arrows}
        keyboardInput
        label="Posición vista desde tu lado: busca la amenaza del rival"
      />
      <div className="order-first space-y-4 lg:order-none">
        <Card>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge tone="red">Defensa</Badge>
            <Badge>Dificultad {puzzle.rating}</Badge>
          </div>
          <p>
            Juegas con <strong>{you}</strong>, pero ahora le toca mover al rival (<strong>{rival}</strong>). Ponte en su lugar: ¿qué
            golpe tiene preparado contra ti?
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Juega en el tablero la jugada que haría tu rival. Toca sus piezas para ver hasta dónde llegan.
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
                  setStatus('revealed');
                }}
              >
                Mostrar la amenaza
              </Button>
              <Button variant="ghost" onClick={onNext}>
                Saltar
              </Button>
            </div>
          )}
        </Card>
        {done && (
          <Card className={status === 'found' ? 'border-emerald-400' : 'border-amber-400'}>
            <p className="text-lg font-semibold">{status === 'found' ? '✅ ¡Amenaza detectada!' : '⚠️ Esta era la amenaza'}</p>
            <p className="mt-2 text-sm">
              Si no la ves a tiempo, el rival juega: <span className="font-mono">{formatLine(puzzle.fen, uciLineToSan(puzzle.fen, puzzle.solution))}</span>
            </p>
            {puzzle.explanation && (
              <div className="mt-2">
                <Markdown text={puzzle.explanation} />
              </div>
            )}
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Antes de cada jugada pregúntate: «¿Qué quiere hacer mi rival?». Detectar sus amenazas a tiempo evita la mayoría de las
              derrotas.
            </p>
            <Button variant="primary" className="mt-3" onClick={onNext}>
              Siguiente posición
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
