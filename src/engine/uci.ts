/** Puntuación UCI desde el punto de vista del bando que mueve. */
export interface UciScore {
  type: 'cp' | 'mate';
  value: number;
}

export interface UciInfo {
  depth: number;
  multipv: number;
  score: UciScore;
  pv: string[];
  nodes?: number;
}

/** Interpreta una línea «info» de Stockfish. Ignora las que no tienen puntuación o son cotas. */
export function parseInfo(line: string): UciInfo | null {
  if (!line.startsWith('info ') || !line.includes(' score ') || /\b(lower|upper)bound\b/.test(line)) return null;
  const tokens = line.split(' ');
  const get = (key: string) => {
    const i = tokens.indexOf(key);
    return i > -1 ? tokens[i + 1] : undefined;
  };
  const scoreIndex = tokens.indexOf('score');
  const type = tokens[scoreIndex + 1];
  const value = Number(tokens[scoreIndex + 2]);
  if ((type !== 'cp' && type !== 'mate') || Number.isNaN(value)) return null;
  const pvIndex = tokens.indexOf('pv');
  return {
    depth: Number(get('depth') ?? 0),
    multipv: Number(get('multipv') ?? 1),
    score: { type, value },
    pv: pvIndex > -1 ? tokens.slice(pvIndex + 1).filter(Boolean) : [],
    nodes: get('nodes') ? Number(get('nodes')) : undefined,
  };
}

/** Devuelve la jugada de «bestmove e2e4 ponder e7e5», o null si no hay (posición terminal). */
export function parseBestMove(line: string): { bestMove: string | null } | null {
  if (!line.startsWith('bestmove')) return null;
  const move = line.split(' ')[1];
  return { bestMove: move && move !== '(none)' && move !== '0000' ? move : null };
}

/** Puntuación vista desde las blancas. */
export function toWhitePov(score: UciScore, sideToMove: 'w' | 'b'): UciScore {
  return sideToMove === 'w' ? score : { type: score.type, value: -score.value };
}

/** Convierte a centipeones; los mates valen ±(10000 − distancia). */
export function scoreToCp(score: UciScore): number {
  if (score.type === 'cp') return score.value;
  if (score.value === 0) return -10000;
  return score.value > 0 ? 10000 - score.value : -10000 - score.value;
}

/** Texto legible de una evaluación (desde las blancas): «+1.25», «−0.40», «M3», «−M2». */
export function formatScore(score: UciScore): string {
  if (score.type === 'mate') {
    if (score.value === 0) return '#';
    return `${score.value > 0 ? '' : '−'}M${Math.abs(score.value)}`;
  }
  const pawns = score.value / 100;
  const sign = pawns > 0 ? '+' : pawns < 0 ? '−' : '';
  return `${sign}${Math.abs(pawns).toFixed(2)}`;
}
