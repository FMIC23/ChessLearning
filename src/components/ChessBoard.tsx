import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Chessboard, type Arrow } from 'react-chessboard';
import { createGame, findKing, needsPromotion, PIECE_NAMES, pieceMoves, type MoveInput } from '@/lib/chess';
import { useSettings } from '@/store/settings';
import { PromotionDialog } from './PromotionDialog';
import { MoveTextInput } from './MoveTextInput';

export type BoardArrow = Arrow;

export interface ChessBoardProps {
  fen: string;
  orientation?: 'white' | 'black';
  /** Permite mover piezas. */
  interactive?: boolean;
  /** Bando que el usuario puede mover ('both' para análisis libre). */
  movableColor?: 'w' | 'b' | 'both';
  /** Se llama con la jugada propuesta. Debe devolver true si se acepta. */
  onMove?: (move: MoveInput) => boolean;
  lastMove?: { from: string; to: string } | null;
  arrows?: BoardArrow[];
  /** Colores extra por casilla (p. ej. resaltar objetivos). */
  highlights?: Record<string, string>;
  /** Clic en una casilla (para ejercicios de selección de casillas). */
  onSquareClick?: (square: string) => void;
  /** Muestra un campo para escribir jugadas con el teclado. */
  keyboardInput?: boolean;
  /** Identificador (debe ser único en la página); por defecto se genera uno. */
  id?: string;
  label?: string;
}

const LAST_MOVE = 'rgba(255, 213, 79, 0.55)';
const SELECTED = 'rgba(47, 111, 214, 0.45)';
/** Sombra gris para las casillas a las que puede ir la pieza y roja para las capturas. */
const MOVE_SHADE = 'radial-gradient(circle, rgba(30,41,59,0.55) 18%, rgba(71,85,105,0.38) 20%)';
const CAPTURE_SHADE = 'rgba(220, 38, 38, 0.55)';
const PEEK_MOVE_SHADE = 'radial-gradient(circle, rgba(30,41,59,0.35) 16%, rgba(100,116,139,0.22) 18%)';
const PEEK_CAPTURE_SHADE = 'rgba(220, 38, 38, 0.3)';
const PEEK_SELECTED = 'rgba(148, 163, 184, 0.55)';

export function ChessBoard({
  fen,
  orientation = 'white',
  interactive = false,
  movableColor = 'both',
  onMove,
  lastMove,
  arrows,
  highlights,
  onSquareClick,
  keyboardInput = false,
  id,
  label = 'Tablero de ajedrez',
}: ChessBoardProps) {
  const generatedId = useId();
  // El id se usa en selectores CSS: solo letras, números y guiones.
  const boardId = (id ?? `tablero-${generatedId}`).replace(/[^a-zA-Z0-9-]/g, '');
  const showCoordinates = useSettings((s) => s.showCoordinates);
  const showLegalMoves = useSettings((s) => s.showLegalMoves);
  const [selected, setSelected] = useState<string | null>(null);
  /** Pieza que se está inspeccionando sin poder moverla (p. ej. una pieza rival). */
  const [peek, setPeek] = useState<string | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: string; to: string } | null>(null);
  // Si cambia la posición, se descarta la selección (patrón "ajustar estado al cambiar props").
  const [prevFen, setPrevFen] = useState(fen);
  if (prevFen !== fen) {
    setPrevFen(fen);
    setSelected(null);
    setPeek(null);
    setPendingPromotion(null);
  }

  const game = useMemo(() => createGame(fen), [fen]);
  const container = useRef<HTMLDivElement>(null);

  // Las piezas arrastrables de react-chessboard no tienen nombre accesible: se lo añadimos.
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const prefix = `${boardId}-square-`;
    root.querySelectorAll<HTMLElement>('[aria-roledescription="draggable"]').forEach((el) => {
      const square = el.closest<HTMLElement>(`[id^="${prefix}"]`)?.id.slice(prefix.length);
      const piece = square ? game.get(square as never) : undefined;
      if (square && piece) {
        const feminine = piece.type === 'q' || piece.type === 'r';
        const color = piece.color === 'w' ? (feminine ? 'blanca' : 'blanco') : feminine ? 'negra' : 'negro';
        el.setAttribute('aria-label', `${PIECE_NAMES[piece.type]} ${color} en ${square}`);
      } else {
        el.setAttribute('aria-label', 'Pieza');
      }
    });
  });
  const turn = game.turn();

  const canMoveColor = useCallback(
    (color: string) => interactive && (movableColor === 'both' || movableColor === color) && color === turn,
    [interactive, movableColor, turn],
  );

  const attemptMove = useCallback(
    (from: string, to: string): boolean => {
      if (!onMove) return false;
      if (needsPromotion(fen, from, to)) {
        setPendingPromotion({ from, to });
        return false;
      }
      const accepted = onMove({ from, to });
      setSelected(null);
      return accepted;
    },
    [fen, onMove],
  );

  const selectedMoves = useMemo(() => (selected ? pieceMoves(fen, selected) : []), [fen, selected]);
  const targets = useMemo(() => selectedMoves.map((m) => m.to), [selectedMoves]);
  const peekMoves = useMemo(() => (peek ? pieceMoves(fen, peek) : []), [fen, peek]);

  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: LAST_MOVE };
      styles[lastMove.to] = { backgroundColor: LAST_MOVE };
    }
    if (highlights) {
      for (const [square, color] of Object.entries(highlights)) styles[square] = { backgroundColor: color };
    }
    if (game.inCheck()) {
      const king = findKing(game, game.turn());
      if (king) {
        styles[king] = {
          ...styles[king],
          background: 'radial-gradient(circle, rgba(239,68,68,0.95) 0%, rgba(239,68,68,0.5) 45%, transparent 75%)',
        };
      }
    }
    if (selected) styles[selected] = { ...styles[selected], backgroundColor: SELECTED };
    if (peek) styles[peek] = { ...styles[peek], backgroundColor: PEEK_SELECTED };
    if (showLegalMoves) {
      const paint = (moves: typeof selectedMoves, move: string, capture: string) => {
        for (const m of moves) styles[m.to] = { ...styles[m.to], background: m.capture ? capture : move };
      };
      paint(peekMoves, PEEK_MOVE_SHADE, PEEK_CAPTURE_SHADE);
      paint(selectedMoves, MOVE_SHADE, CAPTURE_SHADE);
    }
    return styles;
  }, [game, highlights, lastMove, peek, peekMoves, selected, selectedMoves, showLegalMoves]);

  const handleSquareClick = useCallback(
    ({ square, piece }: { square: string; piece: { pieceType: string } | null }) => {
      onSquareClick?.(square);
      if (!interactive) return;
      if (selected && targets.includes(square)) {
        attemptMove(selected, square);
        return;
      }
      if (piece && canMoveColor(piece.pieceType[0] ?? '')) {
        setSelected(square === selected ? null : square);
        setPeek(null);
      } else if (piece) {
        // Pieza que no se puede mover ahora (normalmente del rival): se muestra su alcance.
        setSelected(null);
        setPeek(square === peek ? null : square);
      } else {
        setSelected(null);
        setPeek(null);
      }
    },
    [attemptMove, canMoveColor, interactive, onSquareClick, peek, selected, targets],
  );

  const options = {
    id: boardId,
    position: fen,
    boardOrientation: orientation,
    showNotation: showCoordinates,
    allowDragging: interactive,
    allowDrawingArrows: true,
    arrows: arrows ?? [],
    squareStyles,
    darkSquareStyle: { backgroundColor: 'var(--color-board-dark)' },
    lightSquareStyle: { backgroundColor: 'var(--color-board-light)' },
    animationDurationInMs: 200,
    canDragPiece: ({ piece }: { piece: { pieceType: string } }) => canMoveColor(piece.pieceType[0] ?? ''),
    onPieceDrag: ({ square }: { square: string | null }) => {
      if (square) {
        setSelected(square);
        setPeek(null);
      }
    },
    onPieceDrop: ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
      if (!targetSquare || sourceSquare === targetSquare) return false;
      return attemptMove(sourceSquare, targetSquare);
    },
    onSquareClick: handleSquareClick,
  };

  return (
    <div className="w-full">
      <div ref={container} className="relative w-full select-none" role="group" aria-label={`${label}. Posición FEN: ${fen}`}>
        <Chessboard options={options} />
        {pendingPromotion && (
          <PromotionDialog
            color={turn}
            onCancel={() => setPendingPromotion(null)}
            onSelect={(piece) => {
              const move = { ...pendingPromotion, promotion: piece };
              setPendingPromotion(null);
              setSelected(null);
              onMove?.(move);
            }}
          />
        )}
      </div>
      {keyboardInput && interactive && onMove && (
        <MoveTextInput
          fen={fen}
          disabled={!canMoveColor(turn)}
          onMove={(move) => onMove(move)}
        />
      )}
    </div>
  );
}
