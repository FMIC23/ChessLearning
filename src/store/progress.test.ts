import { beforeEach, describe, expect, it } from 'vitest';
import { INITIAL_RATING } from '@/lib/elo';
import { useProgress } from './progress';

describe('store de progreso', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('registra lecciones completadas y actividad', () => {
    useProgress.getState().completeLesson('fundamentos/la-torre', 2);
    useProgress.getState().completeLesson('fundamentos/la-torre', 0);
    const s = useProgress.getState();
    expect(s.lessons['fundamentos/la-torre']).toMatchObject({ mistakes: 0, times: 2 });
    expect(s.activityDays).toHaveLength(1);
  });

  it('registra problemas: puntuación, temas y repetición espaciada', () => {
    const now = Date.now();
    const r = useProgress.getState().recordPuzzle({ puzzleId: 'p1', puzzleRating: 1000, themes: ['fork', 'short'], grade: 'good', score: 1 }, now);
    expect(r.before).toBe(INITIAL_RATING);
    expect(r.after).toBeGreaterThan(INITIAL_RATING);
    useProgress.getState().recordPuzzle({ puzzleId: 'p2', puzzleRating: 700, themes: ['fork'], grade: 'fail', score: 0 }, now);
    const s = useProgress.getState();
    expect(s.themeStats.fork).toEqual({ attempts: 2, successes: 1 });
    expect(s.puzzleCount).toBe(2);
    expect(s.puzzleCards.p2?.lapses).toBe(1);
    expect(s.ratingHistory).toHaveLength(2);
  });
});
