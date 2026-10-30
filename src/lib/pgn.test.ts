import { describe, expect, it } from 'vitest';
import { buildPgn, parsePgn, PgnError } from './pgn';

const PGN = `[Event "Torneo del club"]
[White "Ana"]
[Black "Luis"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Nd4 4. Nxe5 Qg5 5. Nxf7 Qxg2 6. Rf1 Qxe4+ 7. Be2 Nf3# 1-0`;

describe('PGN', () => {
  it('lee cabeceras y jugadas', () => {
    const game = parsePgn(PGN);
    expect(game.headers.White).toBe('Ana');
    expect(game.result).toBe('1-0');
    expect(game.moves).toHaveLength(14);
    expect(game.moves[0]).toMatchObject({ san: 'e4', uci: 'e2e4', color: 'w' });
    expect(game.moves[13]?.san).toBe('Nf3#');
  });

  it('acepta partidas sin cabeceras y con comentarios', () => {
    const game = parsePgn('1. d4 {Apertura de peón dama} d5 2. c4 *');
    expect(game.moves.map((m) => m.san)).toEqual(['d4', 'd5', 'c4']);
  });

  it('informa de errores en español', () => {
    expect(() => parsePgn('')).toThrow(PgnError);
    expect(() => parsePgn('1. e4 e5 2. Ke3 Ke6 3. Qh8')).toThrow(/No se pudo leer/);
  });

  it('genera un PGN que se puede volver a leer', () => {
    const pgn = buildPgn([{ san: 'e4' }, { san: 'e5' }, { san: 'Qh5' }], { White: 'Tú', Black: 'Stockfish', Result: '*' });
    expect(pgn).toContain('[White "Tú"]');
    expect(parsePgn(pgn).moves.map((m) => m.san)).toEqual(['e4', 'e5', 'Qh5']);
  });
});
