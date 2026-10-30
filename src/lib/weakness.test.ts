import { describe, expect, it } from 'vitest';
import { detectWeakPoints, type WeaknessInput } from './weakness';

const empty: WeaknessInput = { themeStats: {}, games: [], lessons: {}, lessonTitles: {}, openings: {}, openingNames: {} };

describe('puntos débiles', () => {
  it('sin datos no hay puntos débiles', () => {
    expect(detectWeakPoints(empty)).toEqual([]);
  });

  it('detecta temas tácticos con bajo acierto (con un mínimo de intentos)', () => {
    const points = detectWeakPoints({
      ...empty,
      themeStats: { fork: { attempts: 10, successes: 3 }, pin: { attempts: 2, successes: 0 }, skewer: { attempts: 10, successes: 9 }, short: { attempts: 20, successes: 0 } },
    });
    expect(points.map((p) => p.id)).toEqual(['tema-fork']);
    expect(points[0]).toMatchObject({ title: 'Táctica: Horquilla', link: '/tactica?tema=fork' });
  });

  it('detecta la fase con más errores y los errores graves frecuentes', () => {
    const points = detectWeakPoints({
      ...empty,
      games: [
        { phaseErrors: { apertura: 0, 'medio juego': 1, final: 4 }, blunders: 2 },
        { phaseErrors: { apertura: 1, 'medio juego': 0, final: 3 }, blunders: 1 },
      ],
    });
    const ids = points.map((p) => p.id);
    expect(ids).toContain('fase-final');
    expect(ids).toContain('errores-graves');
    expect(ids).not.toContain('fase-apertura');
  });

  it('incluye lecciones con muchos errores y aperturas sin dominar', () => {
    const points = detectWeakPoints({
      ...empty,
      lessons: { 'tactica/clavada': { completedAt: '', mistakes: 5, times: 1 }, 'tactica/otra': { completedAt: '', mistakes: 0, times: 1 } },
      lessonTitles: { 'tactica/clavada': { title: 'La clavada', path: '/aprender/tactica/clavada' } },
      openings: { italiana: { lines: { '0': { attempts: 2, perfect: 0, streak: 0, lastPlayed: '' } } } },
      openingNames: { italiana: 'Italiana' },
    });
    expect(points.map((p) => p.id).sort()).toEqual(['apertura-italiana', 'leccion-tactica/clavada']);
  });

  it('ordena por gravedad y limita el número', () => {
    const themeStats = Object.fromEntries(['fork', 'pin', 'skewer', 'deflection', 'attraction', 'sacrifice', 'clearance'].map((t, i) => [t, { attempts: 10, successes: i % 5 }]));
    const points = detectWeakPoints({ ...empty, themeStats }, 3);
    expect(points).toHaveLength(3);
    expect(points[0]!.severity).toBeGreaterThanOrEqual(points[1]!.severity);
  });
});
