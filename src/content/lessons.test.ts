import { describe, expect, it } from 'vitest';
import { validateLevels } from '@/lib/lessons/validate';
import { LEVELS } from './lessons';

describe('contenido didáctico', () => {
  it('carga los siete niveles en orden', () => {
    expect(LEVELS.map((l) => l.number)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('el nivel 0 está completo', () => {
    expect(LEVELS[0]?.lessons.length).toBeGreaterThanOrEqual(15);
  });

  it('todas las lecciones son válidas (FEN, soluciones legales, respuestas)', () => {
    const errors = validateLevels(LEVELS).filter((e) => !e.includes('no tiene lecciones'));
    expect(errors).toEqual([]);
  });
});
