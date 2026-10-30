import { describe, expect, it } from 'vitest';
import { formatScore, parseBestMove, parseInfo, scoreToCp, toWhitePov } from './uci';
import { chooseMove, ENGINE_LEVELS, getLevel } from './levels';
import { StockfishEngine, type WorkerLike } from './StockfishEngine';

describe('protocolo UCI', () => {
  it('interpreta líneas info', () => {
    const info = parseInfo('info depth 12 seldepth 18 multipv 2 score cp -34 nodes 12345 nps 100 time 5 pv e7e5 g1f3 b8c6');
    expect(info).toEqual({ depth: 12, multipv: 2, score: { type: 'cp', value: -34 }, pv: ['e7e5', 'g1f3', 'b8c6'], nodes: 12345 });
    expect(parseInfo('info depth 3 score mate 2 pv h5f7')?.score).toEqual({ type: 'mate', value: 2 });
    expect(parseInfo('info depth 3 score cp 10 lowerbound pv e2e4')).toBeNull();
    expect(parseInfo('info string NNUE evaluation')).toBeNull();
  });

  it('interpreta bestmove', () => {
    expect(parseBestMove('bestmove e2e4 ponder e7e5')).toEqual({ bestMove: 'e2e4' });
    expect(parseBestMove('bestmove (none)')).toEqual({ bestMove: null });
    expect(parseBestMove('info x')).toBeNull();
  });

  it('convierte y formatea puntuaciones', () => {
    expect(toWhitePov({ type: 'cp', value: 50 }, 'b')).toEqual({ type: 'cp', value: -50 });
    expect(scoreToCp({ type: 'mate', value: 3 })).toBe(9997);
    expect(scoreToCp({ type: 'mate', value: -2 })).toBe(-9998);
    expect(formatScore({ type: 'cp', value: 125 })).toBe('+1.25');
    expect(formatScore({ type: 'cp', value: -40 })).toBe('−0.40');
    expect(formatScore({ type: 'mate', value: -2 })).toBe('−M2');
  });
});

describe('niveles del ordenador', () => {
  const lines = [
    { depth: 3, multipv: 1, score: { type: 'cp' as const, value: 100 }, pv: ['a'] },
    { depth: 3, multipv: 2, score: { type: 'cp' as const, value: 90 }, pv: ['b'] },
    { depth: 3, multipv: 3, score: { type: 'cp' as const, value: -500 }, pv: ['c'] },
  ];

  it('hay 8 niveles ordenados por fuerza', () => {
    expect(ENGINE_LEVELS).toHaveLength(8);
    const elos = ENGINE_LEVELS.map((l) => l.elo);
    expect([...elos].sort((a, b) => a - b)).toEqual(elos);
  });

  it('los niveles fuertes siempre juegan la mejor jugada', () => {
    expect(chooseMove(lines, getLevel(8), () => 0.99)).toBe('a');
  });

  it('los niveles débiles a veces juegan al azar', () => {
    const level = getLevel(1);
    // random < blunderChance -> jugada aleatoria (índice según el siguiente random)
    const seq = [0.1, 0.9];
    expect(chooseMove(lines, level, () => seq.shift() ?? 0)).toBe('c');
  });

  it('la elección ponderada evita las jugadas muy malas', () => {
    const level = getLevel(4);
    const picks = new Map<string, number>();
    let seed = 1;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 500; i++) {
      const m = chooseMove(lines, level, random)!;
      picks.set(m, (picks.get(m) ?? 0) + 1);
    }
    expect((picks.get('a') ?? 0) + (picks.get('b') ?? 0)).toBeGreaterThan(450);
  });
});

/** Worker falso que responde como Stockfish. */
class FakeWorker implements WorkerLike {
  onmessage: ((event: MessageEvent<string>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  sent: string[] = [];
  postMessage(message: string) {
    this.sent.push(message);
    const reply = (line: string) => queueMicrotask(() => this.onmessage?.({ data: line } as MessageEvent<string>));
    if (message === 'uci') reply('uciok');
    if (message === 'isready') reply('readyok');
    if (message.startsWith('go')) {
      reply('info depth 10 multipv 1 score cp 25 pv e2e4 e7e5');
      reply('bestmove e2e4 ponder e7e5');
    }
  }
  terminate() {}
}

describe('StockfishEngine', () => {
  it('inicializa, analiza y devuelve la mejor jugada', async () => {
    const worker = new FakeWorker();
    const engine = new StockfishEngine(() => worker);
    await engine.init();
    const updates: number[] = [];
    const result = await engine.analyze('startpos-fen', { depth: 10 }, 'full', (l) => updates.push(l.length));
    expect(result.bestMove).toBe('e2e4');
    expect(result.lines[0]?.score).toEqual({ type: 'cp', value: 25 });
    expect(updates).toEqual([1]);
    expect(worker.sent).toContain('go depth 10');
    expect(worker.sent).toContain('setoption name UCI_LimitStrength value false');
  });

  it('encola análisis y aplica la fuerza limitada', async () => {
    const worker = new FakeWorker();
    const engine = new StockfishEngine(() => worker);
    const [a, b] = await Promise.all([
      engine.analyze('fen1', { movetime: 300 }, { skill: 10, uciElo: 1400 }),
      engine.analyze('fen2', { depth: 2, multipv: 4 }, { skill: 2 }),
    ]);
    expect(a.bestMove).toBe('e2e4');
    expect(b.bestMove).toBe('e2e4');
    expect(worker.sent).toContain('setoption name UCI_Elo value 1400');
    expect(worker.sent).toContain('go movetime 300');
    expect(worker.sent).toContain('setoption name MultiPV value 4');
    expect(worker.sent.indexOf('position fen fen1')).toBeLessThan(worker.sent.indexOf('position fen fen2'));
  });
});
