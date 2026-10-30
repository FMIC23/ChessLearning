import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { judgePlay } from './playGoal';

describe('práctica contra el motor', () => {
  it('detecta el mate del alumno', () => {
    const game = new Chess('6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1');
    const move = game.move('Ra8#');
    expect(judgePlay({ goal: 'mate' }, game, 'w', 1, move).state).toBe('success');
  });

  it('el ahogado es un fallo si el objetivo es dar mate', () => {
    const game = new Chess('7k/8/6K1/8/8/8/8/5Q2 w - - 0 1');
    const move = game.move('Qf7');
    const v = judgePlay({ goal: 'mate' }, game, 'w', 1, move);
    expect(v).toMatchObject({ state: 'fail' });
    expect(v.state === 'fail' && v.message).toMatch(/ahogado/);
  });

  it('detecta la coronación', () => {
    const game = new Chess('8/4P3/8/8/8/k7/8/4K3 w - - 0 1');
    const move = game.move('e8=Q');
    expect(judgePlay({ goal: 'promote' }, game, 'w', 1, move).state).toBe('success');
  });

  it('falla al superar el máximo de jugadas', () => {
    const game = new Chess('8/8/8/4k3/8/8/8/3QK3 w - - 0 1');
    expect(judgePlay({ goal: 'mate', maxMoves: 10 }, game, 'w', 10, null).state).toBe('fail');
    expect(judgePlay({ goal: 'mate', maxMoves: 10 }, game, 'w', 5, null).state).toBe('continue');
  });

  it('en defensa, aguantar las jugadas indicadas es un éxito', () => {
    const game = new Chess('8/8/8/4k3/8/8/8/3QK3 w - - 0 1');
    expect(judgePlay({ goal: 'draw', maxMoves: 10 }, game, 'w', 10, null, 0).state).toBe('success');
    expect(judgePlay({ goal: 'draw', maxMoves: 10 }, game, 'w', 4, null, -900).state).toBe('fail');
  });

  it('ventaja decisiva', () => {
    const game = new Chess();
    expect(judgePlay({ goal: 'win' }, game, 'w', 3, null, 700).state).toBe('success');
  });
});
