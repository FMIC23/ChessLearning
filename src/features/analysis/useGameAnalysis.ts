import { useEffect, useState } from 'react';
import type { StockfishEngine } from '@/engine/StockfishEngine';
import { toWhitePov } from '@/engine/uci';
import { analyzeGame, type GameAnalysis, type PositionEval } from '@/lib/analysis';
import { createGame } from '@/lib/chess';
import type { ParsedGame } from '@/lib/pgn';

const cache = new Map<string, GameAnalysis>();

/** Evaluación de una posición terminal sin necesidad del motor. */
export function terminalEval(fen: string): PositionEval | null {
  const game = createGame(fen);
  if (game.isCheckmate()) {
    // Si le toca mover a las blancas y es mate, han perdido las blancas.
    return { fen, score: { type: 'mate', value: game.turn() === 'w' ? -1 : 1 }, bestMove: null, pv: [] };
  }
  if (game.isStalemate() || game.isInsufficientMaterial()) {
    return { fen, score: { type: 'cp', value: 0 }, bestMove: null, pv: [] };
  }
  return null;
}

/** Analiza todas las posiciones de una partida con el motor, informando del progreso. */
export function useGameAnalysis(game: ParsedGame | null, engine: StockfishEngine | null, depth: number, key: string) {
  const cacheKey = `${key}@${depth}`;
  const [analysis, setAnalysis] = useState<GameAnalysis | null>(() => cache.get(cacheKey) ?? null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [prevKey, setPrevKey] = useState(cacheKey);
  if (prevKey !== cacheKey) {
    setPrevKey(cacheKey);
    setAnalysis(cache.get(cacheKey) ?? null);
    setProgress(0);
    setError(null);
  }

  useEffect(() => {
    if (!game || !engine || cache.has(cacheKey)) return;
    let cancelled = false;
    const fens = [game.startFen, ...game.moves.map((m) => m.fenAfter)];
    (async () => {
      const evals: PositionEval[] = [];
      engine.newGame();
      for (const [i, fen] of fens.entries()) {
        if (cancelled) return;
        const terminal = terminalEval(fen);
        if (terminal) {
          evals.push(terminal);
        } else {
          const result = await engine.analyze(fen, { depth }, 'full');
          const line = result.lines[0];
          const turn = fen.split(' ')[1] === 'b' ? 'b' : 'w';
          evals.push({
            fen,
            score: line ? toWhitePov(line.score, turn) : { type: 'cp', value: 0 },
            bestMove: result.bestMove,
            pv: line?.pv ?? [],
          });
        }
        if (!cancelled) setProgress((i + 1) / fens.length);
      }
      if (cancelled) return;
      const result = analyzeGame(game.moves, evals);
      cache.set(cacheKey, result);
      setAnalysis(result);
    })().catch((e: Error) => {
      if (!cancelled && e.message !== 'cancelado') setError(e.message);
    });
    return () => {
      cancelled = true;
      engine.cancelAll();
    };
  }, [cacheKey, depth, engine, game]);

  return { analysis, progress, error };
}
