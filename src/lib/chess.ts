import { Chess, validateFen, type Move, type Square, type PieceSymbol, type Color } from 'chess.js';

export type { Move, Square, PieceSymbol, Color };

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export interface MoveInput {
  from: string;
  to: string;
  promotion?: string;
}

/** Convierte una jugada en formato UCI (p. ej. "e7e8q") a objeto. */
export function parseUci(uci: string): MoveInput {
  const from = uci.slice(0, 2);
  const to = uci.slice(2, 4);
  const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined;
  return promotion ? { from, to, promotion } : { from, to };
}

export function toUci(move: Pick<Move, 'from' | 'to' | 'promotion'>): string {
  return `${move.from}${move.to}${move.promotion ?? ''}`;
}

/**
 * Crea una partida desde un FEN; lanza un error con mensaje claro si no es válido.
 * Se admiten posiciones didácticas sin reyes (p. ej. una torre sola para enseñar su movimiento).
 */
export function createGame(fen: string = START_FEN): Chess {
  const check = validateFen(fen);
  if (check.ok) return new Chess(fen);
  if (/king/i.test(check.error ?? '') && !/too many/i.test(check.error ?? '')) {
    return new Chess(fen, { skipValidation: true });
  }
  throw new Error(`FEN no válido: ${fen} (${check.error ?? 'error desconocido'})`);
}

/** Valida un FEN. Con `allowMissingKings` se aceptan posiciones didácticas sin reyes. */
export function isValidFen(fen: string, { allowMissingKings = false } = {}): boolean {
  if (allowMissingKings) {
    try {
      createGame(fen);
      return true;
    } catch {
      return false;
    }
  }
  return validateFen(fen).ok;
}

/** Intenta hacer una jugada (UCI, SAN u objeto). Devuelve null si es ilegal, sin lanzar errores. */
export function tryMove(game: Chess, move: string | MoveInput): Move | null {
  try {
    if (typeof move === 'string') {
      const looksUci = /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(move);
      return game.move(looksUci ? parseUci(move) : move);
    }
    return game.move(move);
  } catch {
    return null;
  }
}

/** Aplica una jugada a un FEN y devuelve el nuevo FEN (o null si es ilegal). */
export function applyMove(fen: string, move: string | MoveInput): { fen: string; move: Move } | null {
  const game = createGame(fen);
  const result = tryMove(game, move);
  return result ? { fen: game.fen(), move: result } : null;
}

/** Comprueba si una jugada de peón llega a la última fila y necesita promoción. */
export function needsPromotion(fen: string, from: string, to: string): boolean {
  const game = createGame(fen);
  const moves = game.moves({ square: from as Square, verbose: true });
  return moves.some((m) => m.to === to && m.promotion !== undefined);
}

/** Casillas destino legales para la pieza de una casilla. */
export function legalTargets(fen: string, square: string): string[] {
  const game = createGame(fen);
  return game.moves({ square: square as Square, verbose: true }).map((m) => m.to);
}

/** Compara jugadas ignorando la diferencia entre UCI/SAN: ambas deben producir la misma jugada. */
export function sameMove(fen: string, a: string | MoveInput, b: string | MoveInput): boolean {
  const ma = applyMove(fen, a);
  const mb = applyMove(fen, b);
  return !!ma && !!mb && toUci(ma.move) === toUci(mb.move);
}

export type GameResult = '1-0' | '0-1' | '1/2-1/2' | '*';

export interface GameStatus {
  over: boolean;
  result: GameResult;
  reason: string | null;
  inCheck: boolean;
  turn: Color;
}

/** Estado de la partida con el motivo explicado en español. */
export function getStatus(game: Chess): GameStatus {
  const turn = game.turn();
  const inCheck = game.inCheck();
  if (game.isCheckmate()) {
    return {
      over: true,
      result: turn === 'w' ? '0-1' : '1-0',
      reason: `Jaque mate. Ganan las ${turn === 'w' ? 'negras' : 'blancas'}.`,
      inCheck,
      turn,
    };
  }
  let reason: string | null = null;
  if (game.isStalemate()) reason = 'Tablas por rey ahogado.';
  else if (game.isInsufficientMaterial()) reason = 'Tablas por material insuficiente.';
  else if (game.isThreefoldRepetition()) reason = 'Tablas por triple repetición.';
  else if (game.isDrawByFiftyMoves()) reason = 'Tablas por la regla de los 50 movimientos.';
  if (reason) return { over: true, result: '1/2-1/2', reason, inCheck, turn };
  return { over: false, result: '*', reason: null, inCheck, turn };
}

/** Casilla del rey del bando indicado. */
export function findKing(game: Chess, color: Color): string | null {
  for (const row of game.board()) {
    for (const piece of row) {
      if (piece && piece.type === 'k' && piece.color === color) return piece.square;
    }
  }
  return null;
}

/** Convierte una lista de jugadas UCI en SAN partiendo de un FEN. */
export function uciLineToSan(fen: string, line: string[]): string[] {
  const game = createGame(fen);
  const san: string[] = [];
  for (const uci of line) {
    const move = tryMove(game, uci);
    if (!move) break;
    san.push(move.san);
  }
  return san;
}

/** Formatea una lista de SAN con números de jugada ("1. e4 e5 2. Cf3"). */
export function formatLine(fen: string, sanMoves: string[]): string {
  const game = createGame(fen);
  let moveNumber = game.moveNumber();
  let white = game.turn() === 'w';
  const parts: string[] = [];
  sanMoves.forEach((san, i) => {
    if (white) parts.push(`${moveNumber}. ${toSpanishSan(san)}`);
    else parts.push(i === 0 ? `${moveNumber}... ${toSpanishSan(san)}` : toSpanishSan(san));
    if (!white) moveNumber++;
    white = !white;
  });
  return parts.join(' ');
}

const SPANISH_PIECES: Record<string, string> = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };

/** Traduce notación SAN inglesa a la española (R, D, T, A, C). El enroque y los peones no cambian. */
export function toSpanishSan(san: string): string {
  return san.replace(/[KQRBN]/g, (letter) => SPANISH_PIECES[letter] ?? letter);
}

const ENGLISH_PIECES: Record<string, string> = { R: 'K', D: 'Q', T: 'R', A: 'B', C: 'N' };

/**
 * Interpreta una jugada escrita por el usuario en notación española o inglesa.
 * Ambigüedad: "R" es rey en español y torre en inglés; se prueba primero la lectura española.
 */
export function parseUserMove(game: Chess, text: string): Move | null {
  const clean = text.trim().replace(/0/g, 'O').replace(/[!?+#]/g, '');
  if (!clean) return null;
  const candidates = [clean];
  if (/^[RDTAC]/.test(clean) || /=[RDTAC]$/.test(clean)) {
    candidates.unshift(clean.replace(/[RDTAC]/g, (l) => ENGLISH_PIECES[l] ?? l));
  }
  for (const candidate of candidates) {
    const probe = new Chess(game.fen());
    const move = tryMove(probe, candidate);
    if (move) return tryMove(game, move.san);
  }
  return null;
}

export const PIECE_NAMES: Record<PieceSymbol, string> = {
  p: 'peón',
  n: 'caballo',
  b: 'alfil',
  r: 'torre',
  q: 'dama',
  k: 'rey',
};
