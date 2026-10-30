import { describe, expect, it } from 'vitest';
import { gradeFromResult, INITIAL_EASE, isDue, MIN_EASE, RELEARN_DELAY, review } from './srs';

const DAY = 86_400_000;
const now = Date.UTC(2024, 0, 1);

describe('repetición espaciada', () => {
  it('un acierto programa el repaso para el día siguiente y luego alarga el intervalo', () => {
    const c1 = review(undefined, 'good', now);
    expect(c1).toMatchObject({ repetitions: 1, interval: 1, due: now + DAY, attempts: 1, successes: 1 });
    const c2 = review(c1, 'good', c1.due);
    expect(c2.interval).toBe(4);
    const c3 = review(c2, 'good', c2.due);
    expect(c3.interval).toBeGreaterThanOrEqual(10);
  });

  it('un fallo reinicia la tarjeta y la vuelve a mostrar a los pocos minutos', () => {
    const learned = review(review(undefined, 'good', now), 'good', now + DAY);
    const failed = review(learned, 'fail', now + 5 * DAY);
    expect(failed).toMatchObject({ repetitions: 0, interval: 0, lapses: 1, due: now + 5 * DAY + RELEARN_DELAY });
    expect(failed.ease).toBeLessThan(learned.ease);
    expect(isDue(failed, now + 5 * DAY)).toBe(false);
    expect(isDue(failed, now + 5 * DAY + RELEARN_DELAY)).toBe(true);
  });

  it('los problemas fallados aparecen con más frecuencia que los que nunca se fallaron', () => {
    let clean = review(undefined, 'good', now);
    let lapsed = review(review(undefined, 'fail', now), 'good', now);
    for (let i = 0; i < 3; i++) {
      clean = review(clean, 'good', clean.due);
      lapsed = review(lapsed, 'good', lapsed.due);
    }
    expect(lapsed.interval).toBeLessThan(clean.interval);
  });

  it('la facilidad nunca baja del mínimo', () => {
    let card = review(undefined, 'fail', now);
    for (let i = 0; i < 20; i++) card = review(card, 'fail', now);
    expect(card.ease).toBe(MIN_EASE);
  });

  it('una respuesta fácil sube la facilidad y una difícil la baja', () => {
    expect(review(undefined, 'easy', now).ease).toBeGreaterThan(INITIAL_EASE);
    expect(review(undefined, 'hard', now).ease).toBeLessThan(INITIAL_EASE);
  });

  it('calcula la calificación según el resultado', () => {
    expect(gradeFromResult({ solved: false, mistakes: 0, usedHint: false })).toBe('fail');
    expect(gradeFromResult({ solved: true, mistakes: 1, usedHint: false })).toBe('fail');
    expect(gradeFromResult({ solved: true, mistakes: 0, usedHint: true })).toBe('hard');
    expect(gradeFromResult({ solved: true, mistakes: 0, usedHint: false, seconds: 5 })).toBe('easy');
    expect(gradeFromResult({ solved: true, mistakes: 0, usedHint: false, seconds: 40 })).toBe('good');
  });
});
