/** Puntuación inicial de un jugador que empieza desde cero. */
export const INITIAL_RATING = 800;
export const MIN_RATING = 100;

/** Probabilidad esperada de ganar (fórmula Elo). */
export function expectedScore(rating: number, opponent: number): number {
  return 1 / (1 + 10 ** ((opponent - rating) / 400));
}

/** Factor K: más alto al principio para converger rápido a la fuerza real. */
export function kFactor(gamesPlayed: number): number {
  if (gamesPlayed < 20) return 40;
  if (gamesPlayed < 60) return 24;
  return 16;
}

/** Nueva puntuación tras un resultado (1 = victoria/acierto, 0.5 = tablas/acierto con ayuda, 0 = derrota/fallo). */
export function updateRating(rating: number, opponent: number, score: number, gamesPlayed: number): number {
  const delta = kFactor(gamesPlayed) * (score - expectedScore(rating, opponent));
  return Math.max(MIN_RATING, Math.round(rating + delta));
}

export interface RatingInputs {
  puzzleRating: number;
  puzzleCount: number;
  gameRating: number;
  gameCount: number;
}

/**
 * Elo estimado combinado. Las partidas pesan más que los problemas en cuanto hay suficientes,
 * porque los problemas tienden a sobrestimar la fuerza práctica.
 */
export function combinedRating({ puzzleRating, puzzleCount, gameRating, gameCount }: RatingInputs): number {
  if (puzzleCount === 0 && gameCount === 0) return INITIAL_RATING;
  if (gameCount === 0) return puzzleRating;
  if (puzzleCount === 0) return gameRating;
  const gameWeight = Math.min(0.7, 0.2 + gameCount * 0.05);
  return Math.round(gameRating * gameWeight + puzzleRating * (1 - gameWeight));
}

/** Nombre orientativo de la categoría según el Elo. */
export function ratingCategory(rating: number): string {
  if (rating < 1000) return 'Principiante';
  if (rating < 1400) return 'Aficionado';
  if (rating < 1800) return 'Jugador de club';
  if (rating < 2000) return 'Club avanzado';
  if (rating < 2200) return 'Experto';
  return 'Maestro';
}
