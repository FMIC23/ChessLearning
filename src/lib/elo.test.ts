import { describe, expect, it } from 'vitest';
import { combinedRating, expectedScore, INITIAL_RATING, kFactor, ratingCategory, updateRating } from './elo';

describe('Elo', () => {
  it('la probabilidad esperada es 0,5 entre iguales y simétrica', () => {
    expect(expectedScore(1500, 1500)).toBeCloseTo(0.5);
    expect(expectedScore(1600, 1400) + expectedScore(1400, 1600)).toBeCloseTo(1);
    expect(expectedScore(1900, 1500)).toBeCloseTo(0.909, 2);
  });

  it('sube al ganar y baja al perder, más cuanto más inesperado', () => {
    expect(updateRating(1000, 1000, 1, 0)).toBe(1020);
    expect(updateRating(1000, 1000, 0, 0)).toBe(980);
    expect(updateRating(1000, 1400, 1, 0) - 1000).toBeGreaterThan(30);
    expect(updateRating(1000, 600, 1, 0) - 1000).toBeLessThan(5);
  });

  it('el factor K baja con la experiencia', () => {
    expect(kFactor(0)).toBe(40);
    expect(kFactor(30)).toBe(24);
    expect(kFactor(100)).toBe(16);
  });

  it('no baja de un mínimo', () => {
    expect(updateRating(100, 100, 0, 0)).toBe(100);
  });

  it('combina problemas y partidas', () => {
    expect(combinedRating({ puzzleRating: 1200, puzzleCount: 0, gameRating: 900, gameCount: 0 })).toBe(INITIAL_RATING);
    expect(combinedRating({ puzzleRating: 1200, puzzleCount: 10, gameRating: 900, gameCount: 0 })).toBe(1200);
    expect(combinedRating({ puzzleRating: 1200, puzzleCount: 0, gameRating: 900, gameCount: 3 })).toBe(900);
    const mixed = combinedRating({ puzzleRating: 1200, puzzleCount: 50, gameRating: 1000, gameCount: 20 });
    expect(mixed).toBeGreaterThan(1000);
    expect(mixed).toBeLessThan(1100);
  });

  it('asigna categorías orientativas', () => {
    expect(ratingCategory(600)).toBe('Principiante');
    expect(ratingCategory(1500)).toBe('Jugador de club');
    expect(ratingCategory(2100)).toBe('Experto');
  });
});
