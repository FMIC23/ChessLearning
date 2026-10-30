import type { Opening, OpeningNode } from '../../types/opening';
import { isStudentTurn, lineMoves } from './tree';

export interface LineStat {
  attempts: number;
  /** Intentos sin errores. */
  perfect: number;
  /** Aciertos perfectos consecutivos. */
  streak: number;
  lastPlayed: string;
}

export interface OpeningStat {
  lines: Record<string, LineStat>;
  studiedAt?: string;
}

/** Una línea se considera dominada tras dos repasos seguidos sin errores. */
export const MASTERY_STREAK = 2;

export function isLineMastered(stat: LineStat | undefined): boolean {
  return (stat?.streak ?? 0) >= MASTERY_STREAK;
}

export function openingMastery(opening: Pick<Opening, 'lines'>, stat: OpeningStat | undefined): { mastered: number; total: number } {
  const total = opening.lines.length;
  const mastered = opening.lines.filter((_, i) => isLineMastered(stat?.lines[String(i)])).length;
  return { mastered, total };
}

/**
 * Elige la línea a repasar: primero las nunca vistas, después las no dominadas
 * (las de peor racha antes) y, si todas están dominadas, la repasada hace más tiempo.
 */
export function chooseLine(opening: Pick<Opening, 'lines'>, stat: OpeningStat | undefined, random: () => number = Math.random, exclude?: number): number {
  const indices = opening.lines.map((_, i) => i).filter((i) => i !== exclude || opening.lines.length === 1);
  const unseen = indices.filter((i) => !stat?.lines[String(i)]);
  if (unseen.length) return unseen[Math.floor(random() * unseen.length)] ?? unseen[0]!;
  const pending = indices.filter((i) => !isLineMastered(stat?.lines[String(i)]));
  if (pending.length) {
    const minStreak = Math.min(...pending.map((i) => stat?.lines[String(i)]?.streak ?? 0));
    const worst = pending.filter((i) => (stat?.lines[String(i)]?.streak ?? 0) === minStreak);
    return worst[Math.floor(random() * worst.length)] ?? worst[0]!;
  }
  return [...indices].sort((a, b) => (stat?.lines[String(a)]?.lastPlayed ?? '').localeCompare(stat?.lines[String(b)]?.lastPlayed ?? ''))[0] ?? 0;
}

export function updateLineStat(prev: LineStat | undefined, perfect: boolean, date = new Date().toISOString()): LineStat {
  return {
    attempts: (prev?.attempts ?? 0) + 1,
    perfect: (prev?.perfect ?? 0) + (perfect ? 1 : 0),
    streak: perfect ? (prev?.streak ?? 0) + 1 : 0,
    lastPlayed: date,
  };
}

export type TestStep =
  | { kind: 'opponent'; node: OpeningNode }
  | { kind: 'student'; expected: OpeningNode[] }
  | { kind: 'done' };

/**
 * Siguiente paso del test en la línea `lineIndex` desde `node`: la jugada del rival (siguiendo la línea),
 * las jugadas válidas del alumno (todas las del repertorio en ese nodo), o el final de la línea.
 */
export function nextTestStep(node: OpeningNode, lineIndex: number, color: 'white' | 'black'): TestStep {
  const inLine = node.children.filter((c) => c.lines.includes(lineIndex));
  if (inLine.length === 0) return { kind: 'done' };
  if (isStudentTurn(node, color)) return { kind: 'student', expected: node.children };
  return { kind: 'opponent', node: inLine[0]! };
}

/**
 * Comprueba la jugada del alumno. Si coincide con la de la línea, sigue en ella; si es otra jugada
 * del repertorio, se cambia a una línea que la contenga.
 */
export function checkStudentMove(node: OpeningNode, san: string, lineIndex: number): { correct: boolean; child?: OpeningNode; lineIndex: number } {
  const child = node.children.find((c) => c.san === san);
  if (!child) return { correct: false, lineIndex };
  const nextLine = child.lines.includes(lineIndex) ? lineIndex : (child.lines[0] ?? lineIndex);
  return { correct: true, child, lineIndex: nextLine };
}

/** Número de jugadas del alumno en una línea (para mostrar el progreso). */
export function studentMovesInLine(line: { moves: string }, color: 'white' | 'black'): number {
  const n = lineMoves(line).length;
  return color === 'white' ? Math.ceil(n / 2) : Math.floor(n / 2);
}
