import { useEffect, useMemo, useState } from 'react';
import { ChessBoard } from '@/components/ChessBoard';
import { EvalBar } from '@/components/EvalBar';
import { EvalChart } from '@/components/EvalChart';
import { MoveList } from '@/components/MoveList';
import { Badge, Button, Card, Feedback, PageHeader, ProgressBar } from '@/components/ui';
import { useEngine } from '@/engine/useEngine';
import { formatScore } from '@/engine/uci';
import { CLASS_INFO, type AnalyzedMove, type GameAnalysis, type MoveClass, type SideSummary } from '@/lib/analysis';
import { createGame, formatLine, parseUci, toSpanishSan, uciLineToSan } from '@/lib/chess';
import { parsePgn } from '@/lib/pgn';
import { useBoardKeyboardNavigation } from '@/lib/useBoardKeyboardNavigation';
import { useProgress, type SavedGame } from '@/store/progress';
import { useGameAnalysis } from './useGameAnalysis';

const DEPTHS = [
  { value: 10, label: 'Rápido' },
  { value: 14, label: 'Normal' },
  { value: 18, label: 'Profundo' },
];

export function AnalysisView({ game }: { game: SavedGame }) {
  const parsed = useMemo(() => parsePgn(game.pgn), [game.pgn]);
  const { engine, status, error: engineError } = useEngine();
  const [depth, setDepth] = useState(14);
  const { analysis, progress, error } = useGameAnalysis(parsed, engine, depth, game.id);
  const [index, setIndex] = useState(parsed.moves.length - 1);
  const [showBest, setShowBest] = useState(true);
  const saveAnalysis = useProgress((s) => s.saveAnalysis);
  const [orientation, setOrientation] = useState<'white' | 'black'>(game.playerColor === 'b' ? 'black' : 'white');

  useBoardKeyboardNavigation(index, parsed.moves.length, (i) => setIndex(Math.max(-1, Math.min(parsed.moves.length - 1, i))));

  // Guarda el resumen del análisis para el panel de progreso (puntos débiles).
  useEffect(() => {
    if (!analysis) return;
    const player = game.playerColor;
    saveAnalysis(game.id, {
      analyzedAt: new Date().toISOString(),
      accuracy: { w: analysis.white.accuracy, b: analysis.black.accuracy },
      counts: { w: analysis.white.counts, b: analysis.black.counts },
      phaseErrors: player ? (player === 'w' ? analysis.white : analysis.black).phaseErrors : {},
    });
  }, [analysis, game.id, game.playerColor, saveAnalysis]);

  const fen = index >= 0 ? (parsed.moves[index]?.fenAfter ?? parsed.startFen) : parsed.startFen;
  const current: AnalyzedMove | undefined = analysis && index >= 0 ? analysis.moves[index] : undefined;
  const scoreHere = analysis ? analysis.evals[index + 1]?.score ?? null : null;
  const nextMove = analysis ? analysis.moves[index + 1] : undefined;
  // Flecha con la mejor jugada en la posición mostrada (si la siguiente jugada de la partida fue un error).
  const bestHere = analysis?.evals[index + 1]?.bestMove;
  const arrows = [];
  if (showBest && bestHere) {
    const m = parseUci(bestHere);
    arrows.push({ startSquare: m.from, endSquare: m.to, color: 'rgba(22,163,74,0.8)' });
  }
  const lastMove = index >= 0 && parsed.moves[index] ? parseUci(parsed.moves[index].uci) : null;
  const startGame = createGame(parsed.startFen);

  const moveEntries = parsed.moves.map((m, i) => {
    const c = analysis?.moves[i]?.classification;
    const info = c && c !== 'good' && c !== 'book' ? CLASS_INFO[c] : undefined;
    return { san: m.san, annotation: info && info.symbol ? { symbol: info.symbol, className: info.className, label: info.label } : undefined };
  });

  return (
    <div>
      <PageHeader
        title={`${game.white} – ${game.black}`}
        subtitle={`${parsed.headers.Event && parsed.headers.Event !== '?' ? `${parsed.headers.Event} · ` : ''}Resultado: ${game.result}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="profundidad" className="text-sm text-slate-600 dark:text-slate-400">
              Análisis
            </label>
            <select
              id="profundidad"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900"
            >
              {DEPTHS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label} (profundidad {d.value})
                </option>
              ))}
            </select>
            <Button onClick={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}>Girar</Button>
          </div>
        }
      />
      {status === 'error' && <Feedback tone="error">No se pudo cargar el motor: {engineError}</Feedback>}
      {error && <Feedback tone="error">Error durante el análisis: {error}</Feedback>}
      {!analysis && status !== 'error' && (
        <Card className="mb-4">
          <p className="mb-2 text-sm">
            {status === 'loading' ? 'Cargando Stockfish…' : `Analizando la partida con Stockfish… ${Math.round(progress * 100)} %`}
          </p>
          <ProgressBar value={progress} label="Progreso del análisis" />
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,600px)_1fr]">
        <div className="space-y-3">
          <div className="flex gap-2">
            <EvalBar score={scoreHere} orientation={orientation} />
            <div className="min-w-0 flex-1">
              <ChessBoard fen={fen} orientation={orientation} lastMove={lastMove} arrows={arrows} label="Tablero de análisis" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIndex(-1)} aria-label="Ir al principio">⏮</Button>
            <Button onClick={() => setIndex((i) => Math.max(-1, i - 1))} aria-label="Jugada anterior">◀</Button>
            <Button onClick={() => setIndex((i) => Math.min(parsed.moves.length - 1, i + 1))} aria-label="Jugada siguiente">▶</Button>
            <Button onClick={() => setIndex(parsed.moves.length - 1)} aria-label="Ir al final">⏭</Button>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showBest} onChange={(e) => setShowBest(e.target.checked)} className="accent-brand-600" />
              Mostrar mejor jugada
            </label>
          </div>
          {analysis && (
            <EvalChart
              scores={analysis.evals.map((e) => e.score)}
              classes={analysis.moves.map((m) => m.classification)}
              current={index}
              onSelect={setIndex}
            />
          )}
        </div>

        <div className="space-y-4">
          {analysis && <MoveComment move={current} next={nextMove} />}
          <Card>
            <MoveList
              moves={moveEntries}
              currentIndex={index}
              onSelect={setIndex}
              startMoveNumber={startGame.moveNumber()}
              startsWithBlack={startGame.turn() === 'b'}
            />
          </Card>
          {analysis && <Summary analysis={analysis} game={game} onSelect={setIndex} />}
        </div>
      </div>
    </div>
  );
}

function MoveComment({ move, next }: { move?: AnalyzedMove; next?: AnalyzedMove }) {
  if (!move) {
    return (
      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Posición inicial. {next ? 'Usa ◀ ▶ o las flechas del teclado para recorrer la partida.' : ''}
        </p>
      </Card>
    );
  }
  const info = CLASS_INFO[move.classification];
  const moveNo = `${Math.ceil(move.ply / 2)}${move.color === 'w' ? '.' : '...'}`;
  const bad = move.classification === 'inaccuracy' || move.classification === 'mistake' || move.classification === 'blunder';
  const bestSan = move.bestMove ? uciLineToSan(move.fenBefore, [move.bestMove])[0] : undefined;
  return (
    <Card>
      <p className="font-semibold">
        {moveNo} {toSpanishSan(move.san)}{' '}
        <span className={info.className}>
          {info.symbol} {info.label}
        </span>
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">Evaluación tras la jugada: {formatScore(move.scoreAfter)}</p>
      {bad && bestSan && (
        <p className="mt-2 text-sm">
          Era mejor <strong>{toSpanishSan(bestSan)}</strong>
          {move.bestLine.length > 1 && <>: {formatLine(move.fenBefore, uciLineToSan(move.fenBefore, move.bestLine.slice(0, 6)))}</>}
        </p>
      )}
    </Card>
  );
}

const SHOWN: MoveClass[] = ['blunder', 'mistake', 'inaccuracy', 'best'];

function SideCard({ title, summary, highlight }: { title: string; summary: SideSummary; highlight: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${highlight ? 'border-brand-500' : 'border-slate-200 dark:border-slate-700'}`}>
      <p className="font-semibold">{title}</p>
      <p className="text-3xl font-bold">{summary.accuracy.toFixed(0)} %</p>
      <p className="text-xs text-slate-500">precisión · pérdida media {summary.acpl} cp</p>
      <ul className="mt-2 space-y-0.5 text-sm">
        {SHOWN.map((c) => (
          <li key={c} className="flex justify-between">
            <span className={CLASS_INFO[c].className}>
              {CLASS_INFO[c].symbol} {CLASS_INFO[c].label}
            </span>
            <span className="font-mono">{summary.counts[c]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Summary({ analysis, game, onSelect }: { analysis: GameAnalysis; game: SavedGame; onSelect: (i: number) => void }) {
  const player = game.playerColor;
  const key = analysis.moves.filter(
    (m) => (m.classification === 'mistake' || m.classification === 'blunder') && (!player || m.color === player),
  );
  const own = player ? (player === 'w' ? analysis.white : analysis.black) : null;
  const worstPhase = own
    ? (Object.entries(own.phaseErrors).sort((a, b) => b[1] - a[1])[0] as [string, number] | undefined)
    : undefined;

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Resumen</h2>
      <div className="grid grid-cols-2 gap-3">
        <SideCard title={`♔ ${game.white}`} summary={analysis.white} highlight={player === 'w'} />
        <SideCard title={`♚ ${game.black}`} summary={analysis.black} highlight={player === 'b'} />
      </div>
      {own && (
        <p className="mt-3 text-sm">
          {own.counts.blunder + own.counts.mistake === 0
            ? '¡Partida muy limpia! No has cometido errores importantes.'
            : `Has cometido ${own.counts.blunder} error${own.counts.blunder === 1 ? '' : 'es'} grave${own.counts.blunder === 1 ? '' : 's'}, ${own.counts.mistake} error${own.counts.mistake === 1 ? '' : 'es'} y ${own.counts.inaccuracy} imprecisi${own.counts.inaccuracy === 1 ? 'ón' : 'ones'}.`}
          {worstPhase && worstPhase[1] > 0 && ` La mayoría, en ${worstPhase[0] === 'final' ? 'el final' : worstPhase[0] === 'apertura' ? 'la apertura' : 'el medio juego'}.`}
        </p>
      )}
      <h3 className="mt-4 mb-2 font-semibold">Momentos clave {player ? '(tus errores)' : ''}</h3>
      {key.length === 0 ? (
        <p className="text-sm text-slate-500">No hay errores ni errores graves.</p>
      ) : (
        <ul className="space-y-1">
          {key.map((m) => {
            const best = m.bestMove ? uciLineToSan(m.fenBefore, [m.bestMove])[0] : undefined;
            return (
              <li key={m.ply}>
                <button
                  type="button"
                  className="w-full rounded-lg px-2 py-1 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => onSelect(m.ply - 2)}
                >
                  <Badge tone={m.classification === 'blunder' ? 'red' : 'amber'}>{CLASS_INFO[m.classification].label}</Badge>{' '}
                  {Math.ceil(m.ply / 2)}
                  {m.color === 'w' ? '.' : '...'} {toSpanishSan(m.san)}
                  {best && (
                    <span className="text-slate-500">
                      {' '}
                      → mejor {toSpanishSan(best)}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-slate-500">Al pulsar un momento clave verás la posición anterior al error con la mejor jugada marcada.</p>
    </Card>
  );
}
