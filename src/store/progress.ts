import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dayKey, type LessonRecord } from '@/lib/progress';
import { review, type ReviewGrade, type SrsCard } from '@/lib/srs';
import { INITIAL_RATING, updateRating } from '@/lib/elo';

export const PROGRESS_STORAGE_KEY = 'ajedrez-progreso';
export const PROGRESS_VERSION = 1;

export interface ThemeStat {
  attempts: number;
  successes: number;
}

export interface RatingPoint {
  date: string;
  rating: number;
  source: 'problema' | 'partida';
}

export interface PuzzleAttempt {
  id: string;
  date: string;
  success: boolean;
  rating: number;
}

export interface ProgressData {
  lessons: Record<string, LessonRecord>;
  /** Días con actividad (AAAA-MM-DD). */
  activityDays: string[];
  puzzleCards: Record<string, SrsCard>;
  puzzleRating: number;
  puzzleCount: number;
  themeStats: Record<string, ThemeStat>;
  puzzleHistory: PuzzleAttempt[];
  ratingHistory: RatingPoint[];
}

export interface PuzzleResult {
  puzzleId: string;
  puzzleRating: number;
  themes: string[];
  grade: ReviewGrade;
  /** Puntuación para el Elo: 1 acierto limpio, 0.5 con pista, 0 fallo. */
  score: number;
}

export interface ProgressState extends ProgressData {
  completeLesson: (lessonId: string, mistakes: number) => void;
  recordActivity: () => void;
  recordPuzzle: (result: PuzzleResult, now?: number) => { before: number; after: number };
  resetProgress: () => void;
}

export const initialProgress = (): ProgressData => ({
  lessons: {},
  activityDays: [],
  puzzleCards: {},
  puzzleRating: INITIAL_RATING,
  puzzleCount: 0,
  themeStats: {},
  puzzleHistory: [],
  ratingHistory: [],
});

const MAX_HISTORY = 500;

function withActivity(days: string[]): string[] {
  const today = dayKey();
  return days.includes(today) ? days : [...days, today];
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
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
      recordPuzzle: (result, now = Date.now()) => {
        const state = get();
        const before = state.puzzleRating;
        const after = updateRating(before, result.puzzleRating, result.score, state.puzzleCount);
        const success = result.grade !== 'fail';
        const themeStats = { ...state.themeStats };
        for (const theme of result.themes) {
          const prev = themeStats[theme] ?? { attempts: 0, successes: 0 };
          themeStats[theme] = { attempts: prev.attempts + 1, successes: prev.successes + (success ? 1 : 0) };
        }
        const date = new Date(now).toISOString();
        set({
          puzzleCards: { ...state.puzzleCards, [result.puzzleId]: review(state.puzzleCards[result.puzzleId], result.grade, now) },
          puzzleRating: after,
          puzzleCount: state.puzzleCount + 1,
          themeStats,
          puzzleHistory: [...state.puzzleHistory, { id: result.puzzleId, date, success, rating: after }].slice(-MAX_HISTORY),
          ratingHistory: [...state.ratingHistory, { date, rating: after, source: 'problema' as const }].slice(-MAX_HISTORY),
          activityDays: withActivity(state.activityDays),
        });
        return { before, after };
      },
      resetProgress: () => set(initialProgress()),
    }),
    { name: PROGRESS_STORAGE_KEY, version: PROGRESS_VERSION },
  ),
);
