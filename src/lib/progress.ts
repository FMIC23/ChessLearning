import type { Level } from '@/types/lesson';

export interface LessonRecord {
  completedAt: string;
  mistakes: number;
  /** Veces que se ha completado. */
  times: number;
}

/** Porcentaje de lecciones de un nivel necesario para desbloquear el siguiente. */
export const UNLOCK_THRESHOLD = 0.8;

export function levelProgress(level: Level, lessons: Record<string, LessonRecord>) {
  const total = level.lessons.length;
  const done = level.lessons.filter((l) => lessons[l.id]).length;
  return { done, total, ratio: total === 0 ? 0 : done / total };
}

/** Un nivel está desbloqueado si es el primero o si el anterior está completado al menos en un 80 %. */
export function isLevelUnlocked(
  levels: Level[],
  index: number,
  lessons: Record<string, LessonRecord>,
  unlockAll = false,
): boolean {
  if (unlockAll || index <= 0) return true;
  const previous = levels[index - 1];
  if (!previous) return false;
  return isLevelUnlocked(levels, index - 1, lessons) && levelProgress(previous, lessons).ratio >= UNLOCK_THRESHOLD;
}

/** Siguiente lección recomendada: la primera sin completar en un nivel desbloqueado. */
export function nextLesson(levels: Level[], lessons: Record<string, LessonRecord>, unlockAll = false) {
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    if (!level || !isLevelUnlocked(levels, i, lessons, unlockAll)) break;
    const lesson = level.lessons.find((l) => !lessons[l.id]);
    if (lesson) return { level, lesson };
  }
  return null;
}

/** Clave de día local (AAAA-MM-DD). */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/**
 * Racha actual de días consecutivos con actividad. Cuenta hasta hoy, o hasta ayer si hoy
 * todavía no se ha practicado (la racha no se pierde hasta que acaba el día).
 */
export function currentStreak(activityDays: string[], today: Date = new Date()): number {
  const days = new Set(activityDays);
  let cursor = days.has(dayKey(today)) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Racha más larga registrada. */
export function longestStreak(activityDays: string[]): number {
  const sorted = [...new Set(activityDays)].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const key of sorted) {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
    run = prev && dayKey(addDays(prev, 1)) === key ? run + 1 : 1;
    best = Math.max(best, run);
    prev = date;
  }
  return best;
}
