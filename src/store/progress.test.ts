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

describe('partidas guardadas', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('las partidas puntuables actualizan la puntuación de partidas', () => {
    const saved = useProgress
      .getState()
      .saveGame({ pgn: '1. e4 *', result: '1-0', source: 'ordenador', white: 'Tú', black: 'SF', playerColor: 'w', level: 2, rated: true }, 700);
    expect(saved.ratingChange?.after).toBeGreaterThan(saved.ratingChange!.before);
    expect(useProgress.getState().gameCount).toBe(1);
    expect(useProgress.getState().games[0]?.id).toBe(saved.id);
  });

  it('las partidas no puntuables no cambian la puntuación', () => {
    useProgress.getState().saveGame({ pgn: '1. e4 *', result: '0-1', source: 'ordenador', white: 'Tú', black: 'SF', playerColor: 'w', rated: false }, 700);
    expect(useProgress.getState().gameRating).toBe(INITIAL_RATING);
    expect(useProgress.getState().gameCount).toBe(0);
  });

  it('guarda el resumen del análisis y permite borrar partidas', () => {
    const g = useProgress.getState().saveGame({ pgn: '1. e4 *', result: '*', source: 'importada', white: 'A', black: 'B' });
    useProgress.getState().saveAnalysis(
      g.id,
      { analyzedAt: 'x', accuracy: { w: 80, b: 70 }, counts: { w: {}, b: {} }, phaseErrors: { apertura: 1 } },
      'b',
    );
    expect(useProgress.getState().games[0]).toMatchObject({ playerColor: 'b', analysis: { accuracy: { w: 80, b: 70 } } });
    useProgress.getState().deleteGame(g.id);
    expect(useProgress.getState().games).toHaveLength(0);
  });
});

describe('anticipación', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('cuenta intentos y aciertos por modalidad', () => {
    const { recordAnticipation } = useProgress.getState();
    recordAnticipation('predictions', true);
    recordAnticipation('predictions', false);
    recordAnticipation('visualization', true);
    const a = useProgress.getState().anticipation;
    expect(a.predictions).toEqual({ attempts: 2, successes: 1 });
    expect(a.visualization).toEqual({ attempts: 1, successes: 1 });
    expect(a.threats).toEqual({ attempts: 0, successes: 0 });
  });
});
