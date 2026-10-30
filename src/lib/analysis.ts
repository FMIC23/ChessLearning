import type { UciScore } from '../engine/uci';
import { scoreToCp } from '../engine/uci';

/** Probabilidad de ganar (0–100) para una ventaja en centipeones (fórmula de Lichess). */
export function winPercent(cp: number): number {
  const clamped = Math.max(-1000, Math.min(1000, cp));
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * clamped)) - 1);
}

/** Probabilidad de ganar desde una puntuación UCI (mates incluidos). */
export function winPercentFromScore(score: UciScore): number {
  if (score.type === 'mate') return score.value > 0 ? 100 : 0;
  return winPercent(score.value);
}

export type MoveClass = 'best' | 'good' | 'inaccuracy' | 'mistake' | 'blunder' | 'book';

/** Umbrales de pérdida de probabilidad de ganar (puntos porcentuales), como en Lichess. */
export const THRESHOLDS = { inaccuracy: 5, mistake: 10, blunder: 15 } as const;

export function classifyLoss(loss: number): Exclude<MoveClass, 'best' | 'book'> {
  if (loss >= THRESHOLDS.blunder) return 'blunder';
  if (loss >= THRESHOLDS.mistake) return 'mistake';
  if (loss >= THRESHOLDS.inaccuracy) return 'inaccuracy';
  return 'good';
}

/** Precisión de una jugada (0–100) según la pérdida de probabilidad de ganar (fórmula de Lichess). */
export function moveAccuracy(loss: number): number {
  const acc = 103.1668 * Math.exp(-0.04354 * Math.max(0, loss)) - 3.1669;
  return Math.max(0, Math.min(100, acc));
}

export type GamePhase = 'apertura' | 'medio juego' | 'final';

/** Fase de la partida según el número de jugada y el material sobre el tablero (FEN). */
export function gamePhase(fen: string, ply: number): GamePhase {
  const board = fen.split(' ')[0] ?? '';
  const values: Record<string, number> = { q: 9, r: 5, b: 3, n: 3 };
  let material = 0;
  let queens = 0;
  for (const ch of board.toLowerCase()) {
    material += values[ch] ?? 0;
    if (ch === 'q') queens++;
  }
  if (material <= 26 || (queens === 0 && material <= 32)) return 'final';
  if (ply < 20) return 'apertura';
  return 'medio juego';
}

export interface PositionEval {
  fen: string;
  /** Evaluación desde las blancas. */
  score: UciScore;
  bestMove: string | null;
  /** Variante principal (UCI). */
  pv: string[];
}

export interface AnalyzedMove {
  ply: number;
  san: string;
  uci: string;
  color: 'w' | 'b';
  fenBefore: string;
  fenAfter: string;
  /** Evaluación (desde las blancas) tras la jugada. */
  scoreAfter: UciScore;
  /** Pérdida de probabilidad de ganar del bando que mueve. */
  loss: number;
  accuracy: number;
  classification: MoveClass;
  bestMove: string | null;
  bestLine: string[];
  phase: GamePhase;
}

export interface SideSummary {
  accuracy: number;
  acpl: number;
  counts: Record<MoveClass, number>;
  /** Errores e imprecisiones por fase. */
  phaseErrors: Record<GamePhase, number>;
}

export interface GameAnalysis {
  moves: AnalyzedMove[];
  evals: PositionEval[];
  white: SideSummary;
  black: SideSummary;
}

export interface MoveInfo {
  san: string;
  uci: string;
  color: 'w' | 'b';
  fenBefore: string;
  fenAfter: string;
}

/**
 * Construye el análisis de una partida a partir de las jugadas y de la evaluación del motor
 * en cada posición (evals[i] = posición antes de la jugada i; evals[n] = posición final).
 */
export function analyzeGame(moves: MoveInfo[], evals: PositionEval[], bookPlies = 0): GameAnalysis {
  const analyzed: AnalyzedMove[] = moves.map((move, i) => {
    const before = evals[i];
    const after = evals[i + 1];
    if (!before || !after) throw new Error(`Falta la evaluación de la posición ${i}`);
    const sign = move.color === 'w' ? 1 : -1;
    const povBefore = { ...before.score, value: before.score.value * sign };
    const povAfter = { ...after.score, value: after.score.value * sign };
    const loss = Math.max(0, winPercentFromScore(povBefore) - winPercentFromScore(povAfter));
    const isBest = before.bestMove === move.uci;
    let classification: MoveClass = isBest ? 'best' : classifyLoss(loss);
    if (i < bookPlies && classification !== 'blunder' && classification !== 'mistake') classification = 'book';
    return {
      ply: i + 1,
      san: move.san,
      uci: move.uci,
      color: move.color,
      fenBefore: move.fenBefore,
      fenAfter: move.fenAfter,
      scoreAfter: after.score,
      loss,
      accuracy: isBest ? 100 : moveAccuracy(loss),
      classification,
      bestMove: before.bestMove,
      bestLine: before.pv,
      phase: gamePhase(move.fenBefore, i),
    };
  });

  const summary = (color: 'w' | 'b'): SideSummary => {
    const own = analyzed.filter((m) => m.color === color);
    const counts: Record<MoveClass, number> = { best: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0, book: 0 };
    const phaseErrors: Record<GamePhase, number> = { apertura: 0, 'medio juego': 0, final: 0 };
    let cpLoss = 0;
    for (const m of own) {
      counts[m.classification]++;
      if (m.classification === 'inaccuracy' || m.classification === 'mistake' || m.classification === 'blunder') {
        phaseErrors[m.phase]++;
      }
      const idx = m.ply - 1;
      const sign = color === 'w' ? 1 : -1;
      const before = scoreToCp(evals[idx]!.score) * sign;
      const after = scoreToCp(evals[idx + 1]!.score) * sign;
      cpLoss += Math.max(0, Math.min(1000, Math.max(-1000, before)) - Math.min(1000, Math.max(-1000, after)));
    }
    const accuracy = own.length ? own.reduce((a, m) => a + m.accuracy, 0) / own.length : 0;
    return { accuracy: Math.round(accuracy * 10) / 10, acpl: own.length ? Math.round(cpLoss / own.length) : 0, counts, phaseErrors };
  };

  return { moves: analyzed, evals, white: summary('w'), black: summary('b') };
}

export const CLASS_INFO: Record<MoveClass, { label: string; symbol: string; className: string; color: string }> = {
  best: { label: 'Mejor jugada', symbol: '★', className: 'text-emerald-600 dark:text-emerald-400', color: '#16a34a' },
  good: { label: 'Buena', symbol: '', className: 'text-slate-500', color: '#64748b' },
  book: { label: 'Teoría', symbol: '', className: 'text-slate-500', color: '#64748b' },
  inaccuracy: { label: 'Imprecisión', symbol: '?!', className: 'text-amber-600 dark:text-amber-400', color: '#d97706' },
  mistake: { label: 'Error', symbol: '?', className: 'text-orange-600 dark:text-orange-400', color: '#ea580c' },
  blunder: { label: 'Error grave', symbol: '??', className: 'text-red-600 dark:text-red-400', color: '#dc2626' },
};
