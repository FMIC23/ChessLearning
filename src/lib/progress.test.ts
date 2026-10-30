import { describe, expect, it } from 'vitest';
import type { Level } from '@/types/lesson';
import { currentStreak, dayKey, isLevelUnlocked, levelProgress, longestStreak, nextLesson, type LessonRecord } from './progress';

function lesson(id: string) {
  return { id, slug: id, levelId: '', order: 0, title: id, summary: '', minutes: 1, tags: [], steps: [], exerciseCount: 0 };
}

function level(id: string, number: number, lessonIds: string[]): Level {
  return { id, number, title: id, subtitle: '', description: '', icon: '', lessons: lessonIds.map(lesson) };
}

const levels = [level('a', 0, ['a1', 'a2', 'a3', 'a4', 'a5']), level('b', 1, ['b1', 'b2']), level('c', 2, ['c1'])];
const done = (ids: string[]): Record<string, LessonRecord> =>
  Object.fromEntries(ids.map((id) => [id, { completedAt: '2024-01-01', mistakes: 0, times: 1 }]));

describe('progreso de lecciones', () => {
  it('calcula el progreso de un nivel', () => {
    expect(levelProgress(levels[0]!, done(['a1', 'a2']))).toEqual({ done: 2, total: 5, ratio: 0.4 });
  });

  it('desbloquea niveles al 80 % del anterior', () => {
    expect(isLevelUnlocked(levels, 0, {})).toBe(true);
    expect(isLevelUnlocked(levels, 1, done(['a1', 'a2', 'a3']))).toBe(false);
    expect(isLevelUnlocked(levels, 1, done(['a1', 'a2', 'a3', 'a4']))).toBe(true);
    // el nivel 2 exige también que el 1 esté desbloqueado
    expect(isLevelUnlocked(levels, 2, done(['b1', 'b2']))).toBe(false);
    expect(isLevelUnlocked(levels, 2, done(['a1', 'a2', 'a3', 'a4', 'b1', 'b2']))).toBe(true);
    expect(isLevelUnlocked(levels, 2, {}, true)).toBe(true);
  });

  it('recomienda la siguiente lección pendiente', () => {
    expect(nextLesson(levels, {})?.lesson.id).toBe('a1');
    expect(nextLesson(levels, done(['a1', 'a2', 'a3', 'a4']))?.lesson.id).toBe('a5');
    expect(nextLesson(levels, done(['a1', 'a2', 'a3', 'a4', 'a5']))?.lesson.id).toBe('b1');
    expect(nextLesson(levels, done(['a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'c1']))).toBeNull();
  });
});

describe('rachas', () => {
  const today = new Date(2024, 4, 10);
  const days = (offsets: number[]) =>
    offsets.map((o) => {
      const d = new Date(today);
      d.setDate(d.getDate() - o);
      return dayKey(d);
    });

  it('cuenta días consecutivos hasta hoy', () => {
    expect(currentStreak(days([0, 1, 2]), today)).toBe(3);
  });

  it('no rompe la racha si hoy aún no se ha practicado', () => {
    expect(currentStreak(days([1, 2]), today)).toBe(2);
  });

  it('se rompe tras un día sin actividad', () => {
    expect(currentStreak(days([2, 3]), today)).toBe(0);
    expect(currentStreak([], today)).toBe(0);
  });

  it('calcula la racha más larga', () => {
    expect(longestStreak(days([0, 1, 5, 6, 7, 8, 20]))).toBe(4);
    expect(longestStreak(['2024-02-28', '2024-02-29', '2024-03-01'])).toBe(3);
  });

  it('formatea la clave del día', () => {
    expect(dayKey(new Date(2024, 0, 5))).toBe('2024-01-05');
  });
});
