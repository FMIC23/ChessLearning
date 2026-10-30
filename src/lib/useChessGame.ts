import { useCallback, useMemo, useState } from 'react';
import { Chess, type Move } from 'chess.js';
import { START_FEN, tryMove, type MoveInput } from './chess';

export interface ChessGameState {
  /** FEN de la posición mostrada (puede ser una anterior si se navega por el historial). */
  fen: string;
  /** FEN de la posición actual (última jugada). */
  currentFen: string;
  startFen: string;
  history: Move[];
  /** Índice de la jugada mostrada: -1 = posición inicial. */
  viewIndex: number;
  isViewingLatest: boolean;
  lastMove: { from: string; to: string } | null;
  move: (move: string | MoveInput) => Move | null;
  undo: (count?: number) => void;
  reset: (fen?: string) => void;
  goTo: (index: number) => void;
  pgn: () => string;
  game: () => Chess;
}

function rebuild(startFen: string, moves: Move[]): Chess {
  const game = new Chess(startFen);
  for (const m of moves) game.move(m.san);
  return game;
}

/** Hook que gestiona una partida con historial navegable y deshacer. */
export function useChessGame(initialFen: string = START_FEN): ChessGameState {
  const [startFen, setStartFen] = useState(initialFen);
  const [history, setHistory] = useState<Move[]>([]);
  const [viewIndex, setViewIndex] = useState(-1);

  const fens = useMemo(() => {
    const list = [startFen];
    for (const m of history) list.push(m.after);
    return list;
  }, [history, startFen]);

  const currentFen = fens[fens.length - 1] ?? startFen;
  const fen = fens[viewIndex + 1] ?? currentFen;
  const shownMove = viewIndex >= 0 ? history[viewIndex] : undefined;

  const move = useCallback(
    (input: string | MoveInput) => {
      // Si se está viendo una posición antigua, se juega desde ahí y se descarta lo posterior.
      const base = history.slice(0, viewIndex + 1);
      const game = rebuild(startFen, base);
      const result = tryMove(game, input);
      if (!result) return null;
      const next = [...base, result];
      setHistory(next);
      setViewIndex(next.length - 1);
      return result;
    },
    [history, startFen, viewIndex],
  );

  const undo = useCallback(
    (count = 1) => {
      const next = history.slice(0, Math.max(0, history.length - count));
      setHistory(next);
      setViewIndex(next.length - 1);
    },
    [history],
  );

  const reset = useCallback((fen: string = START_FEN) => {
    setStartFen(fen);
    setHistory([]);
    setViewIndex(-1);
  }, []);

  const goTo = useCallback(
    (index: number) => setViewIndex(Math.max(-1, Math.min(history.length - 1, index))),
    [history.length],
  );

  const game = useCallback(() => rebuild(startFen, history), [history, startFen]);
  const pgn = useCallback(() => game().pgn(), [game]);

  return {
    fen,
    currentFen,
    startFen,
    history,
    viewIndex,
    isViewingLatest: viewIndex === history.length - 1,
    lastMove: shownMove ? { from: shownMove.from, to: shownMove.to } : null,
    move,
    undo,
    reset,
    goTo,
    pgn,
    game,
  };
}
