import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChessBoard } from '@/components/ChessBoard';
import { MoveList } from '@/components/MoveList';
import { Badge, Button, Card, Feedback, PageHeader } from '@/components/ui';
import { ENGINE_LEVELS, chooseMove, getLevel } from '@/engine/levels';
import { useEngine } from '@/engine/useEngine';
import { getStatus, parseUci, type GameResult } from '@/lib/chess';
import { buildPgn } from '@/lib/pgn';
import { useChessGame } from '@/lib/useChessGame';
import { useBoardKeyboardNavigation } from '@/lib/useBoardKeyboardNavigation';
import { useProgress, type SavedGame } from '@/store/progress';
import { useSettings } from '@/store/settings';

type Phase = 'setup' | 'playing' | 'over';

export function PlayPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [color, setColor] = useState<'w' | 'b'>('w');
  const [round, setRound] = useState(0);
  const playLevel = useSettings((s) => s.playLevel);
  const playColor = useSettings((s) => s.playColor);
  const setPlayOptions = useSettings((s) => s.setPlayOptions);

  const start = () => {
    const chosen = playColor === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : playColor;
    setColor(chosen);
    setRound((r) => r + 1);
    setPhase('playing');
  };

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Jugar contra el ordenador" subtitle="Elige el nivel del ordenador y tu color. Puedes deshacer jugadas y pedir pistas." />
        <Card className="space-y-6">
          <fieldset>
            <legend className="mb-2 font-semibold">Nivel del ordenador</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ENGINE_LEVELS.map((l) => (
                <label
                  key={l.level}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
                    playLevel === l.level ? 'border-brand-500 bg-brand-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="nivel"
                    className="mt-1 accent-brand-600"
                    checked={playLevel === l.level}
                    onChange={() => setPlayOptions({ playLevel: l.level })}
                  />
                  <span>
                    <span className="font-medium">
                      {l.level}. {l.name}
                    </span>{' '}
                    <span className="text-xs text-slate-500">(~{l.elo} Elo)</span>
                    <span className="block text-sm text-slate-600 dark:text-slate-400">{l.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-semibold">Tu color</legend>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['w', '♔ Blancas'],
                  ['b', '♚ Negras'],
                  ['random', '🎲 Al azar'],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-lg border px-4 py-2 ${
                    playColor === value ? 'border-brand-500 bg-brand-50 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <input type="radio" name="color" className="sr-only" checked={playColor === value} onChange={() => setPlayOptions({ playColor: value })} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <Button variant="primary" className="w-full py-3 text-base" onClick={start}>
            Empezar partida
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <GameView
      key={round}
      color={color}
      level={playLevel}
      onNewGame={() => setPhase('setup')}
      onRematch={() => setRound((r) => r + 1)}
    />
  );
}

function resultText(result: GameResult, color: 'w' | 'b'): { title: string; tone: 'success' | 'error' | 'info' } {
  if (result === '1/2-1/2') return { title: 'Tablas', tone: 'info' };
  const won = (result === '1-0' && color === 'w') || (result === '0-1' && color === 'b');
  return won ? { title: '¡Has ganado!', tone: 'success' } : { title: 'Has perdido', tone: 'error' };
}

function GameView({ color, level, onNewGame, onRematch }: { color: 'w' | 'b'; level: number; onNewGame: () => void; onRematch: () => void }) {
  const navigate = useNavigate();
  const { engine, status: engineStatus, error: engineError } = useEngine();
  const game = useChessGame();
  const levelInfo = getLevel(level);
  const [thinking, setThinking] = useState(false);
  const [hint, setHint] = useState<{ from: string; to: string } | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hints, setHints] = useState(0);
  const [undos, setUndos] = useState(0);
  const [resigned, setResigned] = useState(false);
  const [saved, setSaved] = useState<SavedGame | null>(null);
  const saveGame = useProgress((s) => s.saveGame);
  const token = useRef(0);

  useBoardKeyboardNavigation(game.viewIndex, game.history.length, game.goTo);

  const chess = useMemo(() => game.game(), [game]);
  const status = getStatus(chess);
  const turn = chess.turn();
  const over = status.over || resigned;
  const result: GameResult = resigned ? (color === 'w' ? '0-1' : '1-0') : status.result;
  const engineTurn = !over && turn !== color;

  // Turno del ordenador.
  const { currentFen } = game;
  const moveRef = useRef(game.move);
  useEffect(() => {
    moveRef.current = game.move;
  });
  useEffect(() => {
    if (!engine || !engineTurn) return;
    const myToken = ++token.current;
    setThinking(true);
    const started = Date.now();
    const options = levelInfo.movetime ? { movetime: levelInfo.movetime } : { depth: levelInfo.depth, multipv: levelInfo.multipv };
    engine
      .analyze(currentFen, options, { skill: levelInfo.skill, uciElo: levelInfo.uciElo })
      .then((analysis) => {
        if (myToken !== token.current) return;
        const choice = chooseMove(analysis.lines, levelInfo) ?? analysis.bestMove;
        const delay = Math.max(0, 450 - (Date.now() - started));
        setTimeout(() => {
          if (myToken !== token.current) return;
          if (choice) moveRef.current(parseUci(choice), true);
          setThinking(false);
        }, delay);
      })
      .catch(() => {
        if (myToken === token.current) setThinking(false);
      });
  }, [currentFen, engine, engineTurn, levelInfo]);

  // Guardar la partida al terminar.
  useEffect(() => {
    if (!over || saved) return;
    const playerName = 'Tú';
    const engineName = `Stockfish (nivel ${level}: ${levelInfo.name})`;
    const pgn = buildPgn(game.history, {
      Event: 'Partida contra el ordenador',
      Site: 'Escuela de Ajedrez',
      Date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      White: color === 'w' ? playerName : engineName,
      Black: color === 'b' ? playerName : engineName,
      Result: result,
    });
    setSaved(
      saveGame(
        {
          pgn,
          result,
          source: 'ordenador',
          white: color === 'w' ? playerName : engineName,
          black: color === 'b' ? playerName : engineName,
          playerColor: color,
          level,
          rated: hints === 0 && undos === 0 && game.history.length >= 4,
        },
        levelInfo.elo,
      ),
    );
  }, [color, game.history, hints, level, levelInfo, over, result, saveGame, saved, undos]);

  const onMove = useCallback(
    (m: { from: string; to: string; promotion?: string }) => {
      if (over || engineTurn || thinking) return false;
      setHint(null);
      return game.move(m) !== null;
    },
    [engineTurn, game, over, thinking],
  );

  const undo = () => {
    engine?.cancelAll();
    token.current++;
    setThinking(false);
    setHint(null);
    // Si le toca al alumno, se deshacen su última jugada y la respuesta del ordenador.
    const count = turn === color ? 2 : 1;
    if (game.history.length === 0) return;
    game.undo(Math.min(count, game.history.length));
    setUndos((u) => u + 1);
  };

  const askHint = async () => {
    if (!engine || engineTurn || over) return;
    setHintLoading(true);
    try {
      const analysis = await engine.analyze(game.currentFen, { depth: 14 }, 'full');
      if (analysis.bestMove) {
        const m = parseUci(analysis.bestMove);
        setHint({ from: m.from, to: m.to });
        setHints((h) => h + 1);
      }
    } finally {
      setHintLoading(false);
    }
  };

  const outcome = over ? resultText(result, color) : null;
  const reason = resigned ? 'Has abandonado.' : status.reason;

  return (
    <div>
      <PageHeader
        title="Partida contra el ordenador"
        subtitle={
          <>
            Nivel {level}: {levelInfo.name} (~{levelInfo.elo} Elo) · Juegas con {color === 'w' ? 'blancas' : 'negras'}
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
        <ChessBoard
          fen={game.fen}
          orientation={color === 'w' ? 'white' : 'black'}
          interactive={!over && !engineTurn && game.isViewingLatest}
          movableColor={color}
          onMove={onMove}
          lastMove={game.lastMove}
          arrows={hint ? [{ startSquare: hint.from, endSquare: hint.to, color: 'rgba(22,163,74,0.85)' }] : []}
          keyboardInput
          label="Tablero de la partida"
        />
        <div className="space-y-4">
          {engineStatus === 'loading' && <Feedback tone="info">Cargando el motor Stockfish…</Feedback>}
          {engineStatus === 'error' && <Feedback tone="error">No se pudo cargar el motor: {engineError}</Feedback>}
          {outcome ? (
            <Card className="text-center">
              <p className="text-2xl font-bold">{outcome.title}</p>
              <p className="text-slate-600 dark:text-slate-400">{reason}</p>
              {saved?.ratingChange ? (
                <p className="mt-2 text-sm">
                  Puntuación de partidas: {saved.ratingChange.before} → <strong>{saved.ratingChange.after}</strong>
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">Partida no puntuable (has usado deshacer o pistas, o fue muy corta).</p>
              )}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {saved && (
                  <Button variant="primary" onClick={() => navigate(`/analisis?partida=${saved.id}`)}>
                    Analizar la partida
                  </Button>
                )}
                <Button onClick={onRematch}>Revancha</Button>
                <Button variant="ghost" onClick={onNewGame}>
                  Cambiar opciones
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <p className="mb-3" aria-live="polite">
                {thinking ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" /> El ordenador está pensando…
                  </span>
                ) : engineTurn ? (
                  'Turno del ordenador'
                ) : (
                  <>
                    <strong>Tu turno</strong>
                    {status.inCheck && ' — ¡estás en jaque!'}
                  </>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={undo} disabled={game.history.length === 0}>
                  ↶ Deshacer
                </Button>
                <Button onClick={askHint} disabled={engineTurn || hintLoading || !engine}>
                  {hintLoading ? 'Pensando…' : '💡 Pista'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (window.confirm('¿Seguro que quieres abandonar la partida?')) {
                      engine?.cancelAll();
                      token.current++;
                      setResigned(true);
                    }
                  }}
                >
                  Abandonar
                </Button>
              </div>
              <div className="mt-3 flex gap-2 text-xs">
                {hints > 0 && <Badge tone="amber">Pistas: {hints}</Badge>}
                {undos > 0 && <Badge tone="amber">Deshacer: {undos}</Badge>}
              </div>
            </Card>
          )}
          <Card>
            <h2 className="mb-2 font-semibold">Jugadas</h2>
            <MoveList moves={game.history.map((m) => ({ san: m.san }))} currentIndex={game.viewIndex} onSelect={game.goTo} />
            {!game.isViewingLatest && (
              <Button className="mt-2" onClick={() => game.goTo(game.history.length - 1)}>
                Volver a la posición actual
              </Button>
            )}
          </Card>
          <p className="text-xs text-slate-500">
            Las partidas sin pistas ni deshacer cuentan para tu <Link to="/progreso" className="underline">puntuación</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
