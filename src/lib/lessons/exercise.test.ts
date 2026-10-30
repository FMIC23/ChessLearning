import { describe, expect, it } from 'vitest';
import type { MovesExercise } from '@/types/lesson';
import { evaluateMoveAttempt, lastUserPly, pieceTargets, resolveTargets, studentColor } from './exercise';

const backRank: MovesExercise = {
  type: 'moves',
  fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
  solution: ['a1a8'],
  goal: 'mate',
  prompt: 'Mate',
  wrong: { a1a7: 'Así no.' },
};

// Mate en 2 con respuesta forzada: 1. Dh7+?? no; usamos una línea sencilla de dos torres.
const twoRooks: MovesExercise = {
  type: 'moves',
  fen: '6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1',
  solution: ['a2a7', 'g8h8', 'b1b8'],
  goal: 'mate',
  prompt: 'Mate en 2',
};

describe('ejercicios de jugadas', () => {
  it('acepta la jugada correcta y termina', () => {
    const r = evaluateMoveAttempt(backRank, 0, backRank.fen, { from: 'a1', to: 'a8' });
    expect(r).toMatchObject({ legal: true, correct: true, done: true, san: 'Ra8#' });
  });

  it('rechaza una jugada legal incorrecta con mensaje específico', () => {
    const r = evaluateMoveAttempt(backRank, 0, backRank.fen, 'a1a7');
    expect(r).toMatchObject({ legal: true, correct: false, done: false, message: 'Así no.' });
  });

  it('marca como ilegal una jugada imposible', () => {
    expect(evaluateMoveAttempt(backRank, 0, backRank.fen, 'a1h8').legal).toBe(false);
  });

  it('devuelve la respuesta del rival en ejercicios de varias jugadas', () => {
    const r = evaluateMoveAttempt(twoRooks, 0, twoRooks.fen, 'a2a7');
    expect(r).toMatchObject({ correct: true, done: false, reply: 'g8h8', nextPly: 2 });
    const r2 = evaluateMoveAttempt(twoRooks, 2, '7k/R7/8/8/8/8/8/1R4K1 w - - 2 2', 'b1b8');
    expect(r2).toMatchObject({ correct: true, done: true });
  });

  it('con objetivo de mate acepta cualquier mate en la última jugada', () => {
    const ex: MovesExercise = { ...twoRooks, solution: ['a2a7', 'g8h8', 'a7a8'] };
    // Tb8# también es mate aunque la solución indique Ta8#
    const r = evaluateMoveAttempt(ex, 2, '7k/R7/8/8/8/8/8/1R4K1 w - - 2 2', 'b1b8');
    expect(r.correct).toBe(true);
  });

  it('acepta alternativas en la primera jugada', () => {
    const ex: MovesExercise = { type: 'moves', fen: '4k3/8/8/8/8/8/5PPP/R5K1 w - - 0 1', solution: ['a1a8'], accept: ['a1e1'], prompt: 'Jaque' };
    expect(evaluateMoveAttempt(ex, 0, ex.fen, 'a1e1').correct).toBe(true);
    expect(evaluateMoveAttempt(ex, 0, ex.fen, 'a1a7').correct).toBe(false);
  });

  it('calcula la última jugada del alumno y su color', () => {
    expect(lastUserPly(twoRooks)).toBe(2);
    expect(lastUserPly({ solution: ['a', 'b'] })).toBe(0);
    expect(studentColor('8/8/8/8/8/8/8/8 b - - 0 1')).toBe('black');
  });
});

describe('ejercicios de casillas', () => {
  it('calcula los destinos de una pieza aunque no sea su turno', () => {
    expect(pieceTargets('8/8/8/8/8/8/8/n7 w - - 0 1', 'a1')).toEqual(['b3', 'c2']);
    expect(pieceTargets('8/8/8/8/3R4/8/8/8 w - - 0 1', 'd4')).toHaveLength(14);
  });

  it('resuelve objetivos explícitos o calculados', () => {
    expect(resolveTargets({ type: 'squares', prompt: '', targets: ['e4', 'd4'] })).toEqual(['d4', 'e4']);
    expect(resolveTargets({ type: 'squares', prompt: '', fen: '8/8/8/8/8/8/4P3/8 w - - 0 1', targets: 'moves:e2' })).toEqual([
      'e3',
      'e4',
    ]);
  });
});
