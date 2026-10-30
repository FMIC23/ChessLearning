import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dayKey, type LessonRecord } from '@/lib/progress';

export const PROGRESS_STORAGE_KEY = 'ajedrez-progreso';
export const PROGRESS_VERSION = 1;

export interface ProgressData {
  lessons: Record<string, LessonRecord>;
  /** Días con actividad (AAAA-MM-DD). */
  activityDays: string[];
}

export interface ProgressState extends ProgressData {
  completeLesson: (lessonId: string, mistakes: number) => void;
  recordActivity: () => void;
  resetProgress: () => void;
}

export const initialProgress = (): ProgressData => ({
  lessons: {},
  activityDays: [],
});

function withActivity(days: string[]): string[] {
  const today = dayKey();
  return days.includes(today) ? days : [...days, today];
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialProgress(),
      completeLesson: (lessonId, mistakes) =>
        set((state) => {
          const previous = state.lessons[lessonId];
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                completedAt: new Date().toISOString(),
                mistakes: previous ? Math.min(previous.mistakes, mistakes) : mistakes,
                times: (previous?.times ?? 0) + 1,
              },
            },
            activityDays: withActivity(state.activityDays),
          };
        }),
      recordActivity: () => set((state) => ({ activityDays: withActivity(state.activityDays) })),
      resetProgress: () => set(initialProgress()),
    }),
    { name: PROGRESS_STORAGE_KEY, version: PROGRESS_VERSION },
  ),
);
