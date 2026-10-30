import { describe, expect, it } from 'vitest';
import type { Puzzle } from '@/types/puzzle';
import { review } from '../srs';
import { normalizePuzzle, validatePuzzle } from './normalize';
import { countDue, selectNextPuzzle } from './selection';
import { themeLabel } from './themes';

const p = (id: string, rating: number, themes = ['fork']): Puzzle => ({
  id,
  rating,
  themes,
  fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
  solution: ['a1a8'],
  source: 'propio',
});

const now = Date.UTC(2024, 0, 10);

describe('normalización de problemas', () => {
  it('deja intactos los problemas propios', () => {
    const n = normalizePuzzle({ id: 'a', fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', moves: ['a1a8'], rating: 500, themes: ['mateIn1'] });
    expect(n).toMatchObject({ solution: ['a1a8'], source: 'propio' });
    expect(n.setup).toBeUndefined();
  });

  it('convierte el formato de Lichess (el rival mueve primero)', () => {
    const n = normalizePuzzle({
      id: 'l',
      fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 b - - 0 1',
      moves: ['h7h6', 'a1a8', 'g8h7', 'a8a7'],
      rating: 900,
      themes: ['short'],
      opponentFirst: true,
      source: 'lichess',
    });
    expect(n.fen.split(' ')[1]).toBe('w');
    expect(n.solution).toEqual(['a1a8', 'g8h7', 'a8a7']);
    expect(n.setup).toEqual({ fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 b - - 0 1', move: 'h7h6' });
  });

  it('valida soluciones', () => {
    expect(validatePuzzle({ id: 'x', fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', moves: ['a1a9'], rating: 500, themes: ['a'] }).join()).toMatch(
      /ilegal/,
    );
    expect(validatePuzzle({ id: 'x', fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', moves: ['a1a8', 'g8h8'], rating: 500, themes: ['a'] }).join()).toMatch(
      /impar/,
    );
  });
});

describe('selección de problemas', () => {
  const puzzles = [p('facil', 600), p('medio', 1000), p('dificil', 1600, ['pin'])];
  const first = () => 0;

  it('elige un problema nuevo cercano a la puntuación', () => {
    expect(selectNextPuzzle(puzzles, {}, 1000, now, { random: first })).toEqual({ puzzle: puzzles[1], reason: 'new' });
    expect(selectNextPuzzle(puzzles, {}, 1650, now, { random: first })?.puzzle.id).toBe('dificil');
  });

  it('prioriza los repasos pendientes (los fallados)', () => {
    const cards = { facil: review(undefined, 'fail', now - 3_600_000) };
    expect(selectNextPuzzle(puzzles, cards, 1000, now, { random: first })).toEqual({ puzzle: puzzles[0], reason: 'review' });
  });

  it('no repite un problema recién resuelto si no toca', () => {
    const cards = { medio: review(undefined, 'good', now) };
    expect(selectNextPuzzle(puzzles, cards, 1000, now, { random: first })?.puzzle.id).not.toBe('medio');
  });

  it('filtra por tema y evita el último problema', () => {
    expect(selectNextPuzzle(puzzles, {}, 600, now, { theme: 'pin' })?.puzzle.id).toBe('dificil');
    expect(selectNextPuzzle(puzzles, {}, 600, now, { excludeId: 'facil', random: first })?.puzzle.id).not.toBe('facil');
  });

  it('adelanta repasos si no quedan nuevos', () => {
    const cards = Object.fromEntries(puzzles.map((x, i) => [x.id, { ...review(undefined, 'good', now), due: now + (i + 1) * 1000 }]));
    expect(selectNextPuzzle(puzzles, cards, 1000, now)).toEqual({ puzzle: puzzles[0], reason: 'ahead' });
    expect(countDue(cards, now + 1500)).toBe(1);
  });

  it('traduce los temas', () => {
    expect(themeLabel('fork')).toBe('Horquilla');
    expect(themeLabel('desconocido')).toBe('desconocido');
  });
});
