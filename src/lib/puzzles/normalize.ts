import type { Puzzle, PuzzleData } from '../../types/puzzle';
import { applyMove } from '../chess';

/** Convierte un problema del formato de archivo (propio o Lichess) al formato de juego. */
export function normalizePuzzle(data: PuzzleData): Puzzle {
  const base = {
    id: data.id,
    rating: data.rating,
    themes: data.themes,
    title: data.title,
    hint: data.hint,
    explanation: data.explanation,
    source: data.source ?? 'propio',
    url: data.url,
  } as const;
  if (!data.opponentFirst) {
    return { ...base, fen: data.fen, solution: data.moves };
  }
  const [setupMove, ...solution] = data.moves;
  const after = setupMove ? applyMove(data.fen, setupMove) : null;
  if (!setupMove || !after) throw new Error(`Problema ${data.id}: la jugada inicial del rival no es legal`);
  return { ...base, fen: after.fen, solution, setup: { fen: data.fen, move: setupMove } };
}

/** Errores de estructura y legalidad de un problema. */
export function validatePuzzle(data: PuzzleData): string[] {
  const errors: string[] = [];
  const label = `Problema ${data.id}`;
  if (!data.id) errors.push('problema sin id');
  if (!Number.isFinite(data.rating)) errors.push(`${label}: falta la dificultad (rating)`);
  if (!Array.isArray(data.themes) || data.themes.length === 0) errors.push(`${label}: sin temas`);
  let puzzle: Puzzle;
  try {
    puzzle = normalizePuzzle(data);
  } catch (error) {
    return [...errors, (error as Error).message];
  }
  if (puzzle.solution.length === 0 || puzzle.solution.length % 2 === 0) {
    errors.push(`${label}: la solución debe tener un número impar de jugadas (terminar en el alumno)`);
  }
  let fen = puzzle.fen;
  for (const [i, move] of puzzle.solution.entries()) {
    const r = applyMove(fen, move);
    if (!r) {
      errors.push(`${label}: jugada ${i + 1} ilegal (${move})`);
      break;
    }
    fen = r.fen;
  }
  return errors;
}
