import { describe, expect, it } from 'vitest';
import {
  applyMove,
  createGame,
  formatLine,
  getStatus,
  isValidFen,
  legalTargets,
  needsPromotion,
  parseUci,
  parseUserMove,
  sameMove,
  START_FEN,
  toSpanishSan,
  uciLineToSan,
} from './chess';

describe('utilidades de ajedrez', () => {
  it('interpreta UCI con y sin promoción', () => {
    expect(parseUci('e2e4')).toEqual({ from: 'e2', to: 'e4' });
    expect(parseUci('e7e8q')).toEqual({ from: 'e7', to: 'e8', promotion: 'q' });
  });

  it('valida FEN', () => {
    expect(isValidFen(START_FEN)).toBe(true);
    expect(isValidFen('esto no es un fen')).toBe(false);
  });

  it('aplica jugadas UCI y SAN y rechaza las ilegales', () => {
    expect(applyMove(START_FEN, 'e2e4')?.move.san).toBe('e4');
    expect(applyMove(START_FEN, 'Nf3')?.move.from).toBe('g1');
    expect(applyMove(START_FEN, 'e2e5')).toBeNull();
  });

  it('detecta promociones', () => {
    const fen = '8/4P3/8/8/8/8/k7/4K3 w - - 0 1';
    expect(needsPromotion(fen, 'e7', 'e8')).toBe(true);
    expect(needsPromotion(START_FEN, 'e2', 'e4')).toBe(false);
  });

  it('calcula destinos legales', () => {
    expect(legalTargets(START_FEN, 'g1').sort()).toEqual(['f3', 'h3']);
  });

  it('compara jugadas en distintos formatos', () => {
    expect(sameMove(START_FEN, 'g1f3', 'Nf3')).toBe(true);
    expect(sameMove(START_FEN, 'g1h3', 'Nf3')).toBe(false);
  });

  it('describe jaque mate y tablas en español', () => {
    const mate = createGame('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
    expect(getStatus(mate)).toMatchObject({ over: true, result: '0-1' });
    expect(getStatus(mate).reason).toContain('negras');
    const stalemate = createGame('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');
    expect(getStatus(stalemate).reason).toContain('ahogado');
  });

  it('traduce SAN a notación española', () => {
    expect(toSpanishSan('Nf3')).toBe('Cf3');
    expect(toSpanishSan('Qxe7+')).toBe('Dxe7+');
    expect(toSpanishSan('e8=Q#')).toBe('e8=D#');
    expect(toSpanishSan('O-O')).toBe('O-O');
    expect(toSpanishSan('Kxb2')).toBe('Rxb2');
  });

  it('entiende jugadas escritas en español o inglés', () => {
    expect(parseUserMove(createGame(), 'Cf3')?.san).toBe('Nf3');
    expect(parseUserMove(createGame(), 'Nc3')?.san).toBe('Nc3');
    expect(parseUserMove(createGame(), 'e4')?.san).toBe('e4');
    expect(parseUserMove(createGame(), 'Rxe1')).toBeNull();
    // "R" = rey en español
    const kingFen = '4k3/8/8/8/8/8/8/R3K3 w - - 0 1';
    expect(parseUserMove(createGame(kingFen), 'Rd2')?.san).toBe('Kd2');
    // si no es legal como rey, se prueba como torre (notación inglesa)
    expect(parseUserMove(createGame(kingFen), 'Ra8')?.san).toBe('Ra8+');
    expect(parseUserMove(createGame('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1'), '0-0')?.san).toBe('O-O');
  });

  it('formatea líneas con numeración', () => {
    const san = uciLineToSan(START_FEN, ['e2e4', 'e7e5', 'g1f3']);
    expect(formatLine(START_FEN, san)).toBe('1. e4 e5 2. Cf3');
    const blackFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    expect(formatLine(blackFen, ['c5', 'Nf3'])).toBe('1... c5 2. Cf3');
  });
});
