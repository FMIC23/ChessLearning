/**
 * Repetición espaciada (variante simplificada de SM-2).
 *
 * - Un acierto limpio alarga el intervalo multiplicándolo por el factor de facilidad.
 * - Un acierto con ayuda (pista o algún fallo) lo alarga menos y baja un poco la facilidad.
 * - Un fallo reinicia la tarjeta: vuelve a aparecer a los pocos minutos y luego al día siguiente,
 *   y su factor de facilidad baja, así que en adelante aparece con más frecuencia.
 */
export interface SrsCard {
  /** Factor de facilidad (mín. 1.3). */
  ease: number;
  /** Intervalo actual en días. */
  interval: number;
  /** Aciertos consecutivos. */
  repetitions: number;
  /** Fallos totales. */
  lapses: number;
  /** Próximo repaso (ms desde epoch). */
  due: number;
  lastReview: number;
  /** Intentos y aciertos totales (para estadísticas). */
  attempts: number;
  successes: number;
}

export type ReviewGrade = 'fail' | 'hard' | 'good' | 'easy';

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;
export const MIN_EASE = 1.3;
export const INITIAL_EASE = 2.5;
/** Tras un fallo, el problema vuelve a estar disponible a los 10 minutos. */
export const RELEARN_DELAY = 10 * MINUTE;

const QUALITY: Record<ReviewGrade, number> = { fail: 1, hard: 3, good: 4, easy: 5 };

export function newCard(now: number): SrsCard {
  return { ease: INITIAL_EASE, interval: 0, repetitions: 0, lapses: 0, due: now, lastReview: 0, attempts: 0, successes: 0 };
}

/** Aplica un repaso y devuelve la tarjeta actualizada (no muta la original). */
export function review(card: SrsCard | undefined, grade: ReviewGrade, now: number): SrsCard {
  const c = card ?? newCard(now);
  const q = QUALITY[grade];
  // Fórmula de SM-2 para el factor de facilidad.
  const ease = Math.max(MIN_EASE, c.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  const attempts = c.attempts + 1;

  if (grade === 'fail') {
    return {
      ...c,
      ease,
      interval: 0,
      repetitions: 0,
      lapses: c.lapses + 1,
      due: now + RELEARN_DELAY,
      lastReview: now,
      attempts,
    };
  }

  const repetitions = c.repetitions + 1;
  let interval: number;
  if (repetitions === 1) interval = grade === 'easy' ? 3 : 1;
  else if (repetitions === 2) interval = grade === 'hard' ? 2 : 4;
  else interval = Math.round(c.interval * (grade === 'hard' ? 1.2 : ease));
  // Los problemas que se han fallado alguna vez crecen más despacio.
  if (c.lapses > 0) interval = Math.max(1, Math.round(interval * 0.7));

  return {
    ...c,
    ease,
    interval,
    repetitions,
    due: now + interval * DAY,
    lastReview: now,
    attempts,
    successes: c.successes + 1,
  };
}

export function isDue(card: SrsCard, now: number): boolean {
  return card.due <= now;
}

/** Calcula la calificación a partir del resultado de un problema. */
export function gradeFromResult(result: { solved: boolean; mistakes: number; usedHint: boolean; seconds?: number }): ReviewGrade {
  if (!result.solved || result.mistakes > 0) return 'fail';
  if (result.usedHint) return 'hard';
  if (result.seconds !== undefined && result.seconds < 10) return 'easy';
  return 'good';
}
