// Envoltorio mínimo de Stockfish para Node (se usa en los scripts de validación de contenido).
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

interface RawEngine {
  listener?: (line: string) => void;
  sendCommand: (cmd: string) => void;
}

export interface EngineResult {
  bestMove: string;
  /** Evaluación desde el punto de vista del bando que mueve. */
  score: { type: 'cp' | 'mate'; value: number };
  pv: string[];
}

export class NodeEngine {
  private engine: RawEngine | null = null;
  private queue: Promise<unknown> = Promise.resolve();

  async init(): Promise<void> {
    const initEngine = require('stockfish') as (flavor: string) => Promise<RawEngine>;
    this.engine = await initEngine('lite-single');
    await this.command('uci', (l) => l === 'uciok');
    await this.command('isready', (l) => l === 'readyok');
  }

  private command(cmd: string, done: (line: string) => boolean, onLine?: (line: string) => void): Promise<void> {
    const engine = this.engine;
    if (!engine) throw new Error('Motor no inicializado');
    return new Promise((resolve) => {
      engine.listener = (line: string) => {
        onLine?.(line);
        if (done(line)) resolve();
      };
      engine.sendCommand(cmd);
    });
  }

  private send(cmd: string): void {
    this.engine?.sendCommand(cmd);
  }

  analyse(fen: string, depth = 14, multipv = 1): Promise<EngineResult[]> {
    const job = this.queue.then(async () => {
      const lines = new Map<number, EngineResult>();
      // Estos comandos no producen salida: se sincroniza con isready/readyok.
      this.send(`setoption name MultiPV value ${multipv}`);
      this.send('ucinewgame');
      this.send(`position fen ${fen}`);
      await this.command('isready', (l) => l === 'readyok');
      let best = '';
      await this.command(
        `go depth ${depth}`,
        (l) => l.startsWith('bestmove'),
        (line) => {
          if (line.startsWith('bestmove')) best = line.split(' ')[1] ?? '';
          const m = /multipv (\d+) score (cp|mate) (-?\d+).* pv (.+)$/.exec(line);
          if (m && line.includes(' depth ')) {
            const pv = (m[4] ?? '').split(' ');
            lines.set(Number(m[1]), {
              bestMove: pv[0] ?? '',
              score: { type: m[2] as 'cp' | 'mate', value: Number(m[3]) },
              pv,
            });
          }
        },
      );
      const results = [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, r]) => r);
      if (results.length === 0 && best) results.push({ bestMove: best, score: { type: 'cp', value: 0 }, pv: [best] });
      return results;
    });
    this.queue = job.catch(() => undefined);
    return job;
  }

  quit(): void {
    this.engine?.sendCommand('quit');
  }
}

/** Puntuación en centipeones aproximados (los mates cuentan como ±10000). */
export function scoreToCp(score: EngineResult['score']): number {
  if (score.type === 'mate') return score.value > 0 ? 10000 - score.value : -10000 - score.value;
  return score.value;
}
