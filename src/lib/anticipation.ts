import type { Puzzle } from '../types/puzzle';
import { applyMove, createGame, type MoveInput } from './chess';
import { evaluateMoveAttempt } from './lessons/exercise';

/**
 * Posición «sin mover» (null move): el mismo tablero con el turno cambiado.
 * Sirve para preguntar «¿qué haría el rival si fuera su turno?». No es válida si el bando
 * que mueve está en jaque (el rival podría capturar al rey).
 */
export function nullMoveFen(fen: string): string | null {
  const game = createGame(fen);
  if (game.inCheck()) return null;
  const parts = fen.split(' ');
  parts[1] = parts[1] === 'w' ? 'b' : 'w';
  parts[3] = '-';
  const flipped = parts.join(' ');
  try {
    createGame(flipped);
    return flipped;
  } catch {
    return null;
  }
}

export type VisualizationLevel = 1 | 2 | 3;

export const VISUALIZATION_LEVELS: Record<VisualizationLevel, { label: string; description: string; hidden: [number, number] }> = {
  1: { label: 'Fácil', description: 'Imagina 2 jugadas', hidden: [2, 2] },
  2: { label: 'Medio', description: 'Imagina 4 jugadas', hidden: [4, 4] },
  3: { label: 'Difícil', description: 'Imagina 6 jugadas o más', hidden: [6, 99] },
};

export interface VisualizationTask {
  puzzle: Puzzle;
  /** Posición que se muestra en el tablero (no cambia). */
  startFen: string;
  /** Jugadas que hay que imaginar (SAN). */
  hiddenSan: string[];
  /** Posición tras las jugadas imaginadas. */
  finalFen: string;
  /** Índice en la solución de la jugada que hay que encontrar. */
  answerPly: number;
}

/** Problemas aptos para un nivel de visualización (según cuántas jugadas hay que imaginar). */
export function visualizationCandidates(puzzles: Puzzle[], level: VisualizationLevel): Puzzle[] {
  const [min, max] = VISUALIZATION_LEVELS[level].hidden;
  return puzzles.filter((p) => {
    const hidden = p.solution.length - 1;
    return hidden >= min && hidden <= max;
  });
}

/** Prepara una tarea: se muestran todas las jugadas de la solución salvo la última, que es la pregunta. */
export function buildVisualizationTask(puzzle: Puzzle): VisualizationTask | null {
  const answerPly = puzzle.solution.length - 1;
  if (answerPly < 1) return null;
  let fen = puzzle.fen;
  const hiddenSan: string[] = [];
  for (const move of puzzle.solution.slice(0, answerPly)) {
    const r = applyMove(fen, move);
    if (!r) return null;
    hiddenSan.push(r.move.san);
    fen = r.fen;
  }
  return { puzzle, startFen: puzzle.fen, hiddenSan, finalFen: fen, answerPly };
}

/** Comprueba la respuesta de visualización (en los mates vale cualquier mate). */
export function checkVisualizationAnswer(task: VisualizationTask, move: MoveInput | string): { legal: boolean; correct: boolean } {
  const exercise = {
    type: 'moves' as const,
    fen: task.puzzle.fen,
    solution: task.puzzle.solution,
    prompt: '',
    goal: task.puzzle.themes.some((t) => t.startsWith('mate')) ? ('mate' as const) : undefined,
  };
  const r = evaluateMoveAttempt(exercise, task.answerPly, task.finalFen, move);
  return { legal: r.legal, correct: r.correct };
}

/** Elige una tarea al azar evitando las recientes. */
export function pickRandom<T extends { id: string }>(items: T[], recent: string[], random: () => number = Math.random): T | null {
  const fresh = items.filter((i) => !recent.includes(i.id));
  const pool = fresh.length ? fresh : items;
  return pool[Math.floor(random() * pool.length)] ?? null;
}

/** Candidatos para «¿Qué amenaza el rival?»: problemas cuyo primer golpe es claro (corto). */
export function threatCandidates(puzzles: Puzzle[]): Puzzle[] {
  return puzzles.filter((p) => p.solution.length <= 5);
}
