import { Chess, type Move } from 'chess.js';
import { START_FEN, toUci } from './chess';
import type { MoveInfo } from './analysis';

export interface PgnHeaders {
  [key: string]: string;
}

/** Construye un PGN con cabeceras a partir de las jugadas. */
export function buildPgn(moves: Pick<Move, 'san'>[], headers: PgnHeaders, startFen: string = START_FEN): string {
  const game = new Chess(startFen);
  if (startFen !== START_FEN) {
    game.setHeader('SetUp', '1');
    game.setHeader('FEN', startFen);
  }
  for (const [key, value] of Object.entries(headers)) game.setHeader(key, value);
  for (const m of moves) game.move(m.san);
  return game.pgn();
}

export interface ParsedGame {
  headers: PgnHeaders;
  startFen: string;
  moves: MoveInfo[];
  result: string;
}

export class PgnError extends Error {}

/** Interpreta un PGN (una sola partida). Lanza PgnError con un mensaje claro si no es válido. */
export function parsePgn(pgn: string): ParsedGame {
  const text = pgn.trim();
  if (!text) throw new PgnError('El PGN está vacío.');
  const game = new Chess();
  try {
    game.loadPgn(text);
  } catch (error) {
    throw new PgnError(`No se pudo leer el PGN: ${(error as Error).message}`);
  }
  const headers = game.getHeaders() as PgnHeaders;
  const history = game.history({ verbose: true });
  if (history.length === 0) throw new PgnError('El PGN no contiene jugadas.');
  const startFen = headers.FEN ?? history[0]?.before ?? START_FEN;
  return {
    headers,
    startFen,
    result: headers.Result ?? '*',
    moves: history.map((m) => ({ san: m.san, uci: toUci(m), color: m.color, fenBefore: m.before, fenAfter: m.after })),
  };
}
