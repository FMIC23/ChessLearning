import { describe, expect, it } from 'vitest';
import type { Puzzle } from '@/types/puzzle';
import { buildVisualizationTask, checkVisualizationAnswer, nullMoveFen, pickRandom, visualizationCandidates } from './anticipation';

const twoRooks: Puzzle = {
  id: 'escalera',
  fen: '6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1',
  solution: ['a2a7', 'g8h8', 'b1b8'],
  rating: 600,
  themes: ['mateIn2'],
  source: 'propio',
};

describe('anticipación', () => {
  it('cambia el turno sin mover (null move)', () => {
    expect(nullMoveFen('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')).toBe(
      'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
    );
    // En jaque no se puede «pasar»
    expect(nullMoveFen('6k1/5ppp/8/8/8/8/5PPP/r5K1 w - - 0 1')).toBeNull();
  });

  it('prepara la tarea de visualización con las jugadas a imaginar', () => {
    const task = buildVisualizationTask(twoRooks)!;
    expect(task.hiddenSan).toEqual(['Ra7', 'Kh8']);
    expect(task.startFen).toBe(twoRooks.fen);
    expect(task.finalFen.startsWith('7k/R7/')).toBe(true);
    expect(task.answerPly).toBe(2);
  });

  it('acepta cualquier mate como respuesta en los problemas de mate', () => {
    const task = buildVisualizationTask(twoRooks)!;
    expect(checkVisualizationAnswer(task, 'b1b8')).toEqual({ legal: true, correct: true });
    expect(checkVisualizationAnswer(task, 'Rb8')).toEqual({ legal: true, correct: true });
    expect(checkVisualizationAnswer(task, 'a7a6')).toEqual({ legal: true, correct: false });
    // Jugada que solo sería legal en la posición inicial, no en la imaginada
    expect(checkVisualizationAnswer(task, 'a2a3').legal).toBe(false);
  });

  it('filtra por número de jugadas a imaginar', () => {
    const long = { ...twoRooks, id: 'largo', solution: ['a', 'b', 'c', 'd', 'e'] };
    expect(visualizationCandidates([twoRooks, long], 1).map((p) => p.id)).toEqual(['escalera']);
    expect(visualizationCandidates([twoRooks, long], 2).map((p) => p.id)).toEqual(['largo']);
  });

  it('evita repetir los recientes', () => {
    const items = [{ id: 'a' }, { id: 'b' }];
    expect(pickRandom(items, ['a'], () => 0)?.id).toBe('b');
    expect(pickRandom(items, ['a', 'b'], () => 0)?.id).toBe('a');
    expect(pickRandom([], [], () => 0)).toBeNull();
  });
});
