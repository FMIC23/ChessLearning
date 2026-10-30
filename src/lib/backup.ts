import type { ProgressData } from '../store/progress';

export const BACKUP_APP = 'escuela-de-ajedrez';
export const BACKUP_VERSION = 1;

export interface Backup {
  app: typeof BACKUP_APP;
  version: number;
  exportedAt: string;
  progress: ProgressData;
  settings?: Record<string, unknown>;
}

export function createBackup(progress: ProgressData, settings?: Record<string, unknown>): Backup {
  return { app: BACKUP_APP, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), progress, settings };
}

export class BackupError extends Error {}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Valida un archivo de copia de seguridad y devuelve los datos de progreso normalizados. */
export function parseBackup(text: string, defaults: ProgressData): Backup {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new BackupError('El archivo no es un JSON válido.');
  }
  if (!isObject(data) || data.app !== BACKUP_APP) throw new BackupError('El archivo no es una copia de seguridad de Escuela de Ajedrez.');
  if (typeof data.version !== 'number' || data.version > BACKUP_VERSION) {
    throw new BackupError('La copia de seguridad es de una versión más reciente de la aplicación.');
  }
  if (!isObject(data.progress)) throw new BackupError('La copia de seguridad no contiene datos de progreso.');
  const p = data.progress;
  const progress: ProgressData = { ...defaults };
  const objectKeys = ['lessons', 'puzzleCards', 'themeStats', 'openings'] as const;
  const arrayKeys = ['activityDays', 'puzzleHistory', 'ratingHistory', 'games'] as const;
  const numberKeys = ['puzzleRating', 'puzzleCount', 'gameRating', 'gameCount'] as const;
  for (const key of objectKeys) {
    if (p[key] !== undefined && !isObject(p[key])) throw new BackupError(`Campo no válido: ${key}`);
    if (p[key] !== undefined) (progress as unknown as Record<string, unknown>)[key] = p[key];
  }
  for (const key of arrayKeys) {
    if (p[key] !== undefined && !Array.isArray(p[key])) throw new BackupError(`Campo no válido: ${key}`);
    if (p[key] !== undefined) (progress as unknown as Record<string, unknown>)[key] = p[key];
  }
  for (const key of numberKeys) {
    if (p[key] !== undefined && typeof p[key] !== 'number') throw new BackupError(`Campo no válido: ${key}`);
    if (p[key] !== undefined) (progress as unknown as Record<string, unknown>)[key] = p[key];
  }
  return { app: BACKUP_APP, version: data.version, exportedAt: String(data.exportedAt ?? ''), progress, settings: isObject(data.settings) ? data.settings : undefined };
}
