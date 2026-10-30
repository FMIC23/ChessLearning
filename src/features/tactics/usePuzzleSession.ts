import { useCallback, useEffect, useRef, useState } from 'react';
import type { Puzzle } from '@/types/puzzle';
import type { MovesExercise } from '@/types/lesson';
import { applyMove, type MoveInput } from '@/lib/chess';
import { evaluateMoveAttempt } from '@/lib/lessons/exercise';

export type PuzzleStatus = 'setup' | 'playing' | 'wrong' | 'solved';

export interface PuzzleOutcome {
  solved: boolean;
  mistakes: number;
  usedHint: boolean;
  viewedSolution: boolean;
  seconds: number;
}

/** Convierte un problema en un ejercicio de jugadas para reutilizar la lógica de evaluación. */
export function puzzleToExercise(puzzle: Puzzle): MovesExercise {
  return {
    type: 'moves',
    fen: puzzle.fen,
    solution: puzzle.solution,
    prompt: '',
    goal: puzzle.themes.some((t) => t.startsWith('mate')) ? 'mate' : undefined,
  };
}

/**
 * Estado de un problema en curso. Llama a `onFirstResult` una única vez: al primer fallo,
 * al ver la solución o al resolverlo sin errores.
 */
export function usePuzzleSession(puzzle: Puzzle, onFirstResult: (outcome: PuzzleOutcome) => void, replyDelay = 450) {
  const exercise = puzzleToExercise(puzzle);
  const [fen, setFen] = useState(puzzle.setup ? puzzle.setup.fen : puzzle.fen);
  const [ply, setPly] = useState(0);
  const [status, setStatus] = useState<PuzzleStatus>(puzzle.setup ? 'setup' : 'playing');
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [viewedSolution, setViewedSolution] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const recorded = useRef(false);
  const startedAt = useRef(Date.now());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback(
    (fn: () => void, ms = replyDelay) => {
      timers.current.push(setTimeout(fn, ms));
    },
    [replyDelay],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Reproduce la jugada previa del rival (problemas de Lichess).
  useEffect(() => {
    if (!puzzle.setup) return;
    const setup = puzzle.setup;
    const t = setTimeout(() => {
      const r = applyMove(setup.fen, setup.move);
      if (r) {
        setFen(r.fen);
        setLastMove({ from: r.move.from, to: r.move.to });
      }
      setStatus('playing');
      startedAt.current = Date.now();
    }, 600);
    return () => clearTimeout(t);
  }, [puzzle]);

  const record = useCallback(
    (outcome: Omit<PuzzleOutcome, 'seconds'>) => {
      if (recorded.current) return;
      recorded.current = true;
      onFirstResult({ ...outcome, seconds: (Date.now() - startedAt.current) / 1000 });
    },
    [onFirstResult],
  );

  const advance = useCallback(
    (fenAfter: string, move: { from: string; to: string }, nextPly: number | undefined, reply: string | undefined) => {
      setFen(fenAfter);
      setLastMove(move);
      setShowArrow(false);
      if (reply && nextPly !== undefined) {
        setBusy(true);
        later(() => {
          const r = applyMove(fenAfter, reply);
          if (r) {
            setFen(r.fen);
            setLastMove({ from: r.move.from, to: r.move.to });
          }
          setPly(nextPly);
          setBusy(false);
        });
      }
    },
    [later],
  );

  const onMove = useCallback(
    (move: MoveInput): boolean => {
      if (status === 'solved' || status === 'setup' || busy) return false;
      const result = evaluateMoveAttempt(exercise, ply, fen, move);
      if (!result.legal) return false;
      if (!result.correct) {
        setMistakes((m) => m + 1);
        setStatus('wrong');
        setMessage('Esa no es la jugada. Inténtalo otra vez o mira la solución.');
        record({ solved: false, mistakes: mistakes + 1, usedHint: hintLevel > 0, viewedSolution });
        return false;
      }
      const played = applyMove(fen, move);
      if (!played) return false;
      setMessage(null);
      setStatus(result.done ? 'solved' : 'playing');
      advance(played.fen, played.move, result.nextPly, result.reply);
      if (result.done) record({ solved: true, mistakes, usedHint: hintLevel > 0, viewedSolution });
      return true;
    },
    [advance, busy, exercise, fen, hintLevel, mistakes, ply, record, status, viewedSolution],
  );

  /** Primer clic: muestra la flecha de la jugada correcta. Segundo clic: la juega. */
  const solutionStep = useCallback(() => {
    if (status === 'solved' || busy || status === 'setup') return;
    if (!viewedSolution) {
      setViewedSolution(true);
      record({ solved: false, mistakes, usedHint: hintLevel > 0, viewedSolution: true });
    }
    if (!showArrow) {
      setShowArrow(true);
      return;
    }
    const expected = exercise.solution[ply];
    const played = expected ? applyMove(fen, expected) : null;
    if (!played) return;
    const done = ply >= exercise.solution.length - 1;
    setStatus(done ? 'solved' : 'playing');
    setMessage(null);
    advance(played.fen, played.move, done ? undefined : ply + 2, done ? undefined : exercise.solution[ply + 1]);
  }, [advance, busy, exercise.solution, fen, hintLevel, mistakes, ply, record, showArrow, status, viewedSolution]);

  const retry = useCallback(() => {
    setStatus('playing');
    setMessage(null);
  }, []);

  const expected = exercise.solution[ply];
  const expectedMove = expected && status !== 'solved' ? applyMove(fen, expected)?.move : undefined;

  return {
    fen,
    ply,
    status,
    lastMove,
    mistakes,
    hintLevel,
    viewedSolution,
    message,
    busy,
    expectedMove,
    showArrow,
    onMove,
    retry,
    solutionStep,
    nextHint: () => setHintLevel((h) => Math.min(2, h + 1)),
    usedHint: hintLevel > 0,
  };
}
