import type { Puzzle } from '../../types/puzzle';
import type { SrsCard } from '../srs';

export interface SelectionOptions {
  /** Solo problemas con este tema. */
  theme?: string;
  /** Problema a evitar (el que se acaba de jugar). */
  excludeId?: string;
  /** Ventana de dificultad alrededor de la puntuación (por defecto ±200). */
  window?: number;
  random?: () => number;
}

export type SelectionReason = 'review' | 'new' | 'ahead';

/**
 * Elige el siguiente problema:
 *  1. Primero, los repasos pendientes (los fallados vuelven antes), por fecha de vencimiento.
 *  2. Después, un problema nuevo de dificultad cercana a la puntuación del alumno.
 *  3. Si no quedan nuevos, se adelanta el repaso más próximo.
 */
export function selectNextPuzzle(
  puzzles: Puzzle[],
  cards: Record<string, SrsCard>,
  rating: number,
  now: number,
  options: SelectionOptions = {},
): { puzzle: Puzzle; reason: SelectionReason } | null {
  const { theme, excludeId, window = 200, random = Math.random } = options;
  const pool = puzzles.filter((p) => p.id !== excludeId && (!theme || p.themes.includes(theme)));
  if (pool.length === 0) {
    const fallback = puzzles.find((p) => !theme || p.themes.includes(theme));
    return fallback ? { puzzle: fallback, reason: 'ahead' } : null;
  }

  const due = pool
    .filter((p) => cards[p.id] && (cards[p.id]?.due ?? Infinity) <= now)
    .sort((a, b) => (cards[a.id]?.due ?? 0) - (cards[b.id]?.due ?? 0));
  if (due[0]) return { puzzle: due[0], reason: 'review' };

  const fresh = pool.filter((p) => !cards[p.id]);
  if (fresh.length > 0) {
    // Se busca dentro de la ventana; si no hay ninguno, se amplía hasta el más cercano.
    const inWindow = fresh.filter((p) => Math.abs(p.rating - rating) <= window);
    const candidates =
      inWindow.length > 0
        ? inWindow
        : [...fresh].sort((a, b) => Math.abs(a.rating - rating) - Math.abs(b.rating - rating)).slice(0, 5);
    const pick = candidates[Math.floor(random() * candidates.length)] ?? candidates[0];
    if (pick) return { puzzle: pick, reason: 'new' };
  }

  const ahead = [...pool].sort((a, b) => (cards[a.id]?.due ?? 0) - (cards[b.id]?.due ?? 0))[0];
  return ahead ? { puzzle: ahead, reason: 'ahead' } : null;
}

/** Número de repasos pendientes ahora mismo. */
export function countDue(cards: Record<string, SrsCard>, now: number, ids?: Set<string>): number {
  return Object.entries(cards).filter(([id, c]) => c.due <= now && (!ids || ids.has(id))).length;
}
