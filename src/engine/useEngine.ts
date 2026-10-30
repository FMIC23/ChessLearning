import { useEffect, useState } from 'react';
import { getEngine, type StockfishEngine } from './StockfishEngine';

export type EngineStatus = 'loading' | 'ready' | 'error';

/** Obtiene el motor compartido y su estado de carga. */
export function useEngine(): { engine: StockfishEngine | null; status: EngineStatus; error: string | null } {
  const [engine, setEngine] = useState<StockfishEngine | null>(null);
  const [status, setStatus] = useState<EngineStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    let instance: StockfishEngine;
    try {
      instance = getEngine();
    } catch (e) {
      setStatus('error');
      setError((e as Error).message);
      return;
    }
    instance
      .init()
      .then(() => {
        if (!alive) return;
        setEngine(instance);
        setStatus('ready');
      })
      .catch((e: Error) => {
        if (!alive) return;
        setStatus('error');
        setError(e.message);
      });
    return () => {
      alive = false;
      instance.cancelAll();
    };
  }, []);

  return { engine, status, error };
}
