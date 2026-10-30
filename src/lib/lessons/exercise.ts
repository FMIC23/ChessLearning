import type { MovesExercise, SquaresExercise } from '../../types/lesson';
import { applyMove, createGame, pieceMoves, sameMove, toUci, type MoveInput } from '../chess';

export interface MoveAttemptResult {
  legal: boolean;
  correct: boolean;
  /** FEN tras la jugada del alumno (si es legal). */
  fenAfter?: string;
  san?: string;
  /** Respuesta automática del rival (UCI/SAN) si el ejercicio continúa. */
  reply?: string;
  /** Siguiente índice de jugada del alumno (si continúa). */
  nextPly?: number;
  done: boolean;
  /** Mensaje específico para un error habitual. */
  message?: string;
}

/** Índice de la última jugada que debe hacer el alumno. */
export function lastUserPly(exercise: Pick<MovesExercise, 'solution'>): number {
  const n = exercise.solution.length;
  return n % 2 === 1 ? n - 1 : n - 2;
}

/** Evalúa una jugada del alumno en un ejercicio de jugadas. */
export function evaluateMoveAttempt(
  exercise: MovesExercise,
  ply: number,
  fen: string,
  move: MoveInput | string,
): MoveAttemptResult {
  const played = applyMove(fen, move);
  if (!played) return { legal: false, correct: false, done: false };
  const isLast = ply >= lastUserPly(exercise);
  const expected = exercise.solution[ply];
  let correct = expected !== undefined && sameMove(fen, move, expected);
  if (!correct && ply === 0 && exercise.accept) {
    correct = exercise.accept.some((alt) => sameMove(fen, move, alt));
  }
  if (!correct && exercise.goal === 'mate' && isLast) {
    correct = createGame(played.fen).isCheckmate();
  }
  const base = { legal: true, correct, fenAfter: played.fen, san: played.move.san };
  if (!correct) {
    const message = exercise.wrong?.[toUci(played.move)] ?? exercise.wrong?.[played.move.san];
    return { ...base, done: false, message };
  }
  if (isLast) return { ...base, done: true };
  const reply = exercise.solution[ply + 1];
  return { ...base, done: false, reply, nextPly: ply + 2 };
}

/** Bando que mueve el alumno en un ejercicio. */
export function studentColor(fen: string): 'white' | 'black' {
  return fen.split(' ')[1] === 'b' ? 'black' : 'white';
}

/**
 * Casillas a las que puede ir la pieza de `square`, independientemente del turno.
 * Útil para ejercicios del tipo «marca todas las casillas a las que puede ir el alfil».
 */
export function pieceTargets(fen: string, square: string): string[] {
  return pieceMoves(fen, square).map((m) => m.to);
}

/** Resuelve la lista de casillas objetivo de un ejercicio de casillas. */
export function resolveTargets(exercise: SquaresExercise): string[] {
  if (Array.isArray(exercise.targets)) return [...exercise.targets].sort();
  const match = /^moves:([a-h][1-8])$/.exec(exercise.targets);
  if (match && exercise.fen) return pieceTargets(exercise.fen, match[1] ?? '');
  throw new Error(`Objetivos no válidos: ${exercise.targets}`);
}

export const EMPTY_FEN = '8/8/8/8/8/8/8/8 w - - 0 1';

/** Aplica una respuesta del rival y devuelve el FEN resultante. */
export function applyReply(fen: string, reply: string): { fen: string; from: string; to: string } | null {
  const result = applyMove(fen, reply);
  return result ? { fen: result.fen, from: result.move.from, to: result.move.to } : null;
}
