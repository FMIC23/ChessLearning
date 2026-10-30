import { describe, expect, it } from 'vitest';
import { Chess } from 'chess.js';
import { analyzeGame, classifyLoss, gamePhase, moveAccuracy, winPercent, type MoveInfo, type PositionEval } from './analysis';
import { START_FEN } from './chess';

describe('métricas de análisis', () => {
  it('la probabilidad de ganar es 50 % con igualdad y simétrica', () => {
    expect(winPercent(0)).toBeCloseTo(50);
    expect(winPercent(300) + winPercent(-300)).toBeCloseTo(100);
    expect(winPercent(5000)).toBe(winPercent(1000));
  });

  it('clasifica las pérdidas como en Lichess', () => {
    expect(classifyLoss(2)).toBe('good');
    expect(classifyLoss(6)).toBe('inaccuracy');
    expect(classifyLoss(12)).toBe('mistake');
    expect(classifyLoss(40)).toBe('blunder');
  });

  it('la precisión baja con la pérdida', () => {
    expect(moveAccuracy(0)).toBeCloseTo(100, 0);
    expect(moveAccuracy(10)).toBeLessThan(70);
    expect(moveAccuracy(80)).toBeLessThan(1);
  });

  it('detecta la fase de la partida', () => {
    expect(gamePhase(START_FEN, 4)).toBe('apertura');
    expect(gamePhase(START_FEN, 30)).toBe('medio juego');
    expect(gamePhase('8/5k2/8/8/8/8/3K1R2/8 w - - 0 50', 90)).toBe('final');
  });
});

describe('analyzeGame', () => {
  // 1. e4 e5 2. Dh5 Cc6 3. Ac4 Cf6?? 4. Dxf7#
  const sans = ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'Nf6', 'Qxf7#'];
  const game = new Chess();
  const moves: MoveInfo[] = sans.map((san) => {
    const before = game.fen();
    const m = game.move(san);
    return { san: m.san, uci: m.from + m.to, color: m.color, fenBefore: before, fenAfter: game.fen() };
  });
  const cp = [30, 30, 30, -60, -60, -60, 10000];
  const best = ['e2e4', 'e7e5', 'd1h5', 'b8c6', 'f1c4', 'g7g6', 'h5f7', null];
  const evals: PositionEval[] = cp.map((value, i) => ({ fen: moves[i]!.fenBefore, score: { type: 'cp', value }, bestMove: best[i] ?? null, pv: [] }));
  evals.push({ fen: game.fen(), score: { type: 'mate', value: 0 }, bestMove: null, pv: [] });
  // tras el mate, las blancas tienen mate a favor: se expresa como mate positivo desde las blancas
  evals[7] = { ...evals[7]!, score: { type: 'mate', value: 1 } };

  const analysis = analyzeGame(moves, evals);

  it('marca el error grave de las negras y las mejores jugadas', () => {
    const blunder = analysis.moves[5]!;
    expect(blunder.san).toBe('Nf6');
    expect(blunder.classification).toBe('blunder');
    expect(blunder.bestMove).toBe('g7g6');
    expect(analysis.moves[6]!.classification).toBe('best');
    expect(analysis.black.counts.blunder).toBe(1);
    expect(analysis.black.phaseErrors.apertura).toBe(1);
  });

  it('calcula precisión y pérdida media por bando', () => {
    expect(analysis.white.accuracy).toBeGreaterThan(analysis.black.accuracy);
    expect(analysis.black.acpl).toBeGreaterThan(100);
  });

  it('marca la teoría en las primeras jugadas', () => {
    const withBook = analyzeGame(moves, evals, 2);
    expect(withBook.moves[1]!.classification).toBe('book');
    expect(withBook.moves[2]!.classification).toBe('best');
  });
});
