import type { UciInfo } from './uci';
import { scoreToCp } from './uci';

export interface EngineLevel {
  level: number;
  name: string;
  /** Elo aproximado (orientativo) para calcular la puntuación del alumno. */
  elo: number;
  description: string;
  /** Profundidad de búsqueda (niveles bajos) o tiempo por jugada en ms (niveles altos). */
  depth?: number;
  movetime?: number;
  /** Número de alternativas que se analizan para elegir (niveles bajos). */
  multipv: number;
  /** Probabilidad de jugar una jugada al azar entre las candidatas. */
  blunderChance: number;
  /** «Temperatura» en centipeones: cuanto mayor, más aleatoria la elección entre candidatas. */
  temperature: number;
  /** Límite de fuerza de Stockfish (niveles altos). */
  uciElo?: number;
  skill: number;
}

export const ENGINE_LEVELS: EngineLevel[] = [
  { level: 1, name: 'Muy débil', elo: 400, description: 'Para tus primeras partidas: comete errores graves a menudo.', depth: 1, multipv: 12, blunderChance: 0.45, temperature: 400, skill: 0 },
  { level: 2, name: 'Débil', elo: 700, description: 'Deja piezas colgadas de vez en cuando.', depth: 2, multipv: 8, blunderChance: 0.25, temperature: 220, skill: 2 },
  { level: 3, name: 'Principiante', elo: 950, description: 'Conoce las reglas y ve las amenazas simples.', depth: 3, multipv: 6, blunderChance: 0.12, temperature: 120, skill: 4 },
  { level: 4, name: 'Aficionado', elo: 1150, description: 'Aprovecha tus errores tácticos sencillos.', depth: 5, multipv: 4, blunderChance: 0.06, temperature: 60, skill: 7 },
  { level: 5, name: 'Club', elo: 1400, description: 'Un jugador de club sólido.', movetime: 300, multipv: 1, blunderChance: 0, temperature: 0, uciElo: 1400, skill: 10 },
  { level: 6, name: 'Club fuerte', elo: 1700, description: 'Juego posicional y táctico correcto.', movetime: 450, multipv: 1, blunderChance: 0, temperature: 0, uciElo: 1700, skill: 13 },
  { level: 7, name: 'Experto', elo: 2000, description: 'Castiga casi cualquier imprecisión.', movetime: 700, multipv: 1, blunderChance: 0, temperature: 0, uciElo: 2000, skill: 16 },
  { level: 8, name: 'Fuerte', elo: 2500, description: 'Nivel de maestro. ¡Suerte!', movetime: 1200, multipv: 1, blunderChance: 0, temperature: 0, uciElo: 2500, skill: 20 },
];

export function getLevel(level: number): EngineLevel {
  return ENGINE_LEVELS.find((l) => l.level === level) ?? ENGINE_LEVELS[0]!;
}

/**
 * Elige la jugada del ordenador entre las candidatas (MultiPV) para simular un nivel humano:
 * a veces una jugada al azar; si no, una elección ponderada que favorece las mejores.
 */
export function chooseMove(lines: UciInfo[], level: EngineLevel, random: () => number = Math.random): string | null {
  const candidates = lines.filter((l) => l.pv[0]).sort((a, b) => a.multipv - b.multipv);
  if (candidates.length === 0) return null;
  const best = candidates[0]!;
  if (candidates.length === 1 || level.temperature === 0) return best.pv[0] ?? null;
  // No se regalan mates: si hay mate a favor, se juega.
  if (best.score.type === 'mate' && best.score.value > 0 && random() > level.blunderChance) return best.pv[0] ?? null;
  if (random() < level.blunderChance) {
    return candidates[Math.floor(random() * candidates.length)]?.pv[0] ?? best.pv[0] ?? null;
  }
  const bestCp = scoreToCp(best.score);
  const weights = candidates.map((c) => Math.exp((scoreToCp(c.score) - bestCp) / level.temperature));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i] ?? 0;
    if (r <= 0) return candidates[i]?.pv[0] ?? null;
  }
  return best.pv[0] ?? null;
}
