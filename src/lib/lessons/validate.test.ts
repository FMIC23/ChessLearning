import { describe, expect, it } from 'vitest';
import { validateExercise } from './validate';

describe('validación de ejercicios', () => {
  it('detecta FEN no válido', () => {
    expect(validateExercise({ type: 'moves', fen: 'xx', solution: ['e2e4'], prompt: 'a' })[0]).toMatch(/FEN/);
  });

  it('detecta jugadas ilegales y soluciones que no acaban en el alumno', () => {
    const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    expect(validateExercise({ type: 'moves', fen: start, solution: ['e2e5'], prompt: 'a' }).join()).toMatch(/ilegal/);
    expect(validateExercise({ type: 'moves', fen: start, solution: ['e2e4', 'e7e5'], prompt: 'a' }).join()).toMatch(/terminar/);
  });

  it('comprueba que el objetivo de mate se cumple', () => {
    const errors = validateExercise({ type: 'moves', fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', solution: ['a1a7'], goal: 'mate', prompt: 'a' });
    expect(errors.join()).toMatch(/mate/);
  });

  it('valida preguntas tipo test', () => {
    expect(validateExercise({ type: 'quiz', prompt: 'a', options: ['x', 'y'], answer: 2 }).join()).toMatch(/rango/);
    expect(validateExercise({ type: 'quiz', prompt: 'a', options: ['x', 'y'], answer: 1 })).toEqual([]);
  });

  it('exige posiciones legales en la práctica contra el motor', () => {
    expect(validateExercise({ type: 'play', prompt: 'a', fen: '8/8/8/8/8/8/8/3QK3 w - - 0 1', goal: 'mate' }).join()).toMatch(/legales/);
  });

  it('acepta posiciones didácticas sin reyes en casillas', () => {
    expect(validateExercise({ type: 'squares', prompt: 'a', fen: '8/8/8/8/3N4/8/8/8 w - - 0 1', targets: 'moves:d4' })).toEqual([]);
  });
});
