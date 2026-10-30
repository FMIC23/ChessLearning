import { useState } from 'react';
import { ChessBoard } from '@/components/ChessBoard';
import { MoveList } from '@/components/MoveList';
import { Button, Card, Feedback, PageHeader } from '@/components/ui';
import { createGame, getStatus, isValidFen, START_FEN } from '@/lib/chess';
import { useChessGame } from '@/lib/useChessGame';
import { useBoardKeyboardNavigation } from '@/lib/useBoardKeyboardNavigation';

export function FreeBoardPage() {
  const game = useChessGame();
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [fenInput, setFenInput] = useState('');
  const [fenError, setFenError] = useState<string | null>(null);
  const status = getStatus(createGame(game.currentFen));
  const startGame = createGame(game.startFen);

  useBoardKeyboardNavigation(game.viewIndex, game.history.length, game.goTo);

  const loadFen = () => {
    const fen = fenInput.trim();
    if (!isValidFen(fen)) {
      setFenError('El FEN no es válido.');
      return;
    }
    setFenError(null);
    game.reset(fen);
  };

  return (
    <div>
      <PageHeader
        title="Tablero libre"
        subtitle="Mueve las piezas de ambos bandos. Arrastra, haz clic en origen y destino o escribe la jugada."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
        <div>
          <ChessBoard
            fen={game.fen}
            orientation={orientation}
            interactive
            movableColor="both"
            lastMove={game.lastMove}
            keyboardInput
            onMove={(m) => game.move(m) !== null}
          />
        </div>
        <div className="space-y-4">
          <Card>
            <div className="mb-3 flex flex-wrap gap-2">
              <Button onClick={() => game.goTo(-1)} aria-label="Ir al principio">⏮</Button>
              <Button onClick={() => game.goTo(game.viewIndex - 1)} aria-label="Jugada anterior">◀</Button>
              <Button onClick={() => game.goTo(game.viewIndex + 1)} aria-label="Jugada siguiente">▶</Button>
              <Button onClick={() => game.goTo(game.history.length - 1)} aria-label="Ir al final">⏭</Button>
              <Button onClick={() => game.undo()} disabled={game.history.length === 0}>Deshacer</Button>
              <Button onClick={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}>Girar tablero</Button>
              <Button variant="danger" onClick={() => game.reset(START_FEN)}>Reiniciar</Button>
            </div>
            <p className="mb-2 text-sm" aria-live="polite">
              {status.over ? (
                <strong>{status.reason}</strong>
              ) : (
                <>
                  Juegan las <strong>{status.turn === 'w' ? 'blancas' : 'negras'}</strong>
                  {status.inCheck && ' — ¡jaque!'}
                </>
              )}
            </p>
            <MoveList
              moves={game.history.map((m) => ({ san: m.san }))}
              currentIndex={game.viewIndex}
              onSelect={game.goTo}
              startMoveNumber={startGame.moveNumber()}
              startsWithBlack={startGame.turn() === 'b'}
            />
            <p className="mt-2 text-xs text-slate-500">Consejo: usa las flechas ← → del teclado para navegar por las jugadas.</p>
          </Card>
          <Card>
            <h2 className="mb-2 font-semibold">Posición (FEN)</h2>
            <code className="block break-all rounded bg-slate-100 p-2 text-xs dark:bg-slate-800">{game.fen}</code>
            <form
              className="mt-3 flex flex-wrap gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                loadFen();
              }}
            >
              <label htmlFor="fen-input" className="sr-only">Cargar FEN</label>
              <input
                id="fen-input"
                value={fenInput}
                onChange={(e) => setFenInput(e.target.value)}
                placeholder="Pega un FEN para cargar la posición"
                className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900"
              />
              <Button type="submit">Cargar</Button>
            </form>
            {fenError && <div className="mt-2"><Feedback tone="error">{fenError}</Feedback></div>}
          </Card>
        </div>
      </div>
    </div>
  );
}
