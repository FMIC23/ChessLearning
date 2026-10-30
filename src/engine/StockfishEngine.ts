import { parseBestMove, parseInfo, type UciInfo } from './uci';
import type { EngineLevel } from './levels';

/** Interfaz mínima de un Web Worker (permite inyectar uno falso en los tests). */
export interface WorkerLike {
  postMessage: (message: string) => void;
  terminate: () => void;
  onmessage: ((event: MessageEvent<string>) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
}

export interface AnalysisOptions {
  depth?: number;
  movetime?: number;
  multipv?: number;
}

export interface AnalysisResult {
  bestMove: string | null;
  /** Líneas principales (una por MultiPV) desde el punto de vista del bando que mueve. */
  lines: UciInfo[];
  depth: number;
}

export type StrengthSettings = Pick<EngineLevel, 'skill' | 'uciElo'> | 'full';

interface Job {
  fen: string;
  options: AnalysisOptions;
  strength: StrengthSettings;
  onInfo?: (lines: UciInfo[]) => void;
  resolve: (result: AnalysisResult) => void;
  reject: (error: Error) => void;
}

export function defaultEngineUrl(): string {
  return `${import.meta.env.BASE_URL}stockfish/stockfish-18-lite-single.js`;
}

/**
 * Cliente UCI de Stockfish ejecutado en un Web Worker.
 * Las peticiones se encolan: el motor solo analiza una posición a la vez.
 */
export class StockfishEngine {
  private worker: WorkerLike;
  private ready: Promise<void>;
  private queue: Job[] = [];
  private current: { job: Job; lines: Map<number, UciInfo>; depth: number; cancelled: boolean } | null = null;
  private listeners = new Set<(line: string) => void>();
  private lastStrength = '';
  private disposed = false;

  constructor(createWorker: () => WorkerLike = () => new Worker(defaultEngineUrl()) as unknown as WorkerLike) {
    this.worker = createWorker();
    this.worker.onmessage = (event) => this.handleLine(String(event.data));
    this.ready = new Promise((resolve, reject) => {
      this.worker.onerror = (event) => reject(new Error(event.message || 'No se pudo cargar el motor Stockfish'));
      const waitUciOk = (line: string) => {
        if (line === 'uciok') {
          this.listeners.delete(waitUciOk);
          this.send('setoption name Hash value 32');
          this.send('isready');
        }
      };
      const waitReady = (line: string) => {
        if (line === 'readyok') {
          this.listeners.delete(waitReady);
          resolve();
        }
      };
      this.listeners.add(waitUciOk);
      this.listeners.add(waitReady);
      this.send('uci');
    });
  }

  /** Espera a que el motor esté listo. */
  init(): Promise<void> {
    return this.ready;
  }

  private send(command: string) {
    if (!this.disposed) this.worker.postMessage(command);
  }

  private handleLine(line: string) {
    for (const listener of [...this.listeners]) listener(line);
    const current = this.current;
    if (!current) return;
    const info = parseInfo(line);
    if (info) {
      current.lines.set(info.multipv, info);
      current.depth = Math.max(current.depth, info.depth);
      current.job.onInfo?.(this.sortedLines(current.lines));
      return;
    }
    const best = parseBestMove(line);
    if (best) {
      this.current = null;
      const lines = this.sortedLines(current.lines);
      current.job.resolve({ bestMove: best.bestMove, lines, depth: current.depth });
      this.next();
    }
  }

  private sortedLines(lines: Map<number, UciInfo>): UciInfo[] {
    return [...lines.values()].sort((a, b) => a.multipv - b.multipv);
  }

  private applyStrength(strength: StrengthSettings) {
    const key = JSON.stringify(strength);
    if (key === this.lastStrength) return;
    this.lastStrength = key;
    if (strength === 'full') {
      this.send('setoption name UCI_LimitStrength value false');
      this.send('setoption name Skill Level value 20');
      return;
    }
    this.send(`setoption name Skill Level value ${strength.skill}`);
    if (strength.uciElo) {
      this.send('setoption name UCI_LimitStrength value true');
      this.send(`setoption name UCI_Elo value ${Math.max(1320, Math.min(3190, strength.uciElo))}`);
    } else {
      this.send('setoption name UCI_LimitStrength value false');
    }
  }

  private next() {
    if (this.current || this.disposed) return;
    const job = this.queue.shift();
    if (!job) return;
    this.current = { job, lines: new Map(), depth: 0, cancelled: false };
    this.applyStrength(job.strength);
    this.send(`setoption name MultiPV value ${job.options.multipv ?? 1}`);
    this.send(`position fen ${job.fen}`);
    const { depth, movetime } = job.options;
    if (movetime) this.send(`go movetime ${movetime}${depth ? ` depth ${depth}` : ''}`);
    else this.send(`go depth ${depth ?? 14}`);
  }

  /** Analiza una posición. `onInfo` recibe las líneas parciales mientras el motor piensa. */
  async analyze(
    fen: string,
    options: AnalysisOptions = {},
    strength: StrengthSettings = 'full',
    onInfo?: (lines: UciInfo[]) => void,
  ): Promise<AnalysisResult> {
    await this.ready;
    return new Promise((resolve, reject) => {
      this.queue.push({ fen, options, strength, onInfo, resolve, reject });
      this.next();
    });
  }

  /** Cancela todo: vacía la cola y detiene el análisis en curso (su promesa se resuelve igualmente). */
  cancelAll() {
    for (const job of this.queue) job.reject(new Error('cancelado'));
    this.queue = [];
    if (this.current && !this.current.cancelled) {
      this.current.cancelled = true;
      this.send('stop');
    }
  }

  /** Reinicia la tabla de transposición (nueva partida). */
  newGame() {
    this.send('ucinewgame');
  }

  terminate() {
    this.cancelAll();
    this.disposed = true;
    this.worker.terminate();
  }
}

let shared: StockfishEngine | null = null;

/** Instancia compartida (se crea al usarla por primera vez). */
export function getEngine(): StockfishEngine {
  shared ??= new StockfishEngine();
  return shared;
}
