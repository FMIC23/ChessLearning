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

export type GameResultCode = '1-0' | '0-1' | '1/2-1/2' | '*';

export interface AnalysisSummary {
  analyzedAt: string;
  accuracy: { w: number; b: number };
  counts: { w: Record<string, number>; b: Record<string, number> };
  /** Errores e imprecisiones del alumno por fase de la partida. */
  phaseErrors: Record<string, number>;
}

export interface SavedGame {
  id: string;
  date: string;
  pgn: string;
  result: GameResultCode;
  source: 'ordenador' | 'importada';
  white: string;
  black: string;
  /** Bando del alumno (en partidas importadas, el que elija al analizar). */
  playerColor?: 'w' | 'b';
  level?: number;
  rated?: boolean;
  ratingChange?: { before: number; after: number };
  analysis?: AnalysisSummary;
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
  games: SavedGame[];
  gameRating: number;
  gameCount: number;
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
  /** Guarda una partida. Si es puntuable, actualiza la puntuación de partidas. */
  saveGame: (game: Omit<SavedGame, 'id' | 'date'>, opponentElo?: number) => SavedGame;
  saveAnalysis: (gameId: string, analysis: AnalysisSummary, playerColor?: 'w' | 'b') => void;
  deleteGame: (gameId: string) => void;
  /** Sustituye todo el progreso (importación). */
  replaceProgress: (data: ProgressData) => void;
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
  games: [],
  gameRating: INITIAL_RATING,
  gameCount: 0,
});

const MAX_GAMES = 100;

function gameScore(result: GameResultCode, color: 'w' | 'b'): number | null {
  if (result === '1/2-1/2') return 0.5;
  if (result === '1-0') return color === 'w' ? 1 : 0;
  if (result === '0-1') return color === 'b' ? 1 : 0;
  return null;
}

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
      saveGame: (game, opponentElo) => {
        const state = get();
        const date = new Date().toISOString();
        const saved: SavedGame = { ...game, id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, date };
        const score = game.playerColor ? gameScore(game.result, game.playerColor) : null;
        const patch: Partial<ProgressData> = { activityDays: withActivity(state.activityDays) };
        if (game.rated && score !== null && opponentElo !== undefined) {
          const before = state.gameRating;
          const after = updateRating(before, opponentElo, score, state.gameCount);
          saved.ratingChange = { before, after };
          patch.gameRating = after;
          patch.gameCount = state.gameCount + 1;
          patch.ratingHistory = [...state.ratingHistory, { date, rating: after, source: 'partida' as const }].slice(-MAX_HISTORY);
        }
        patch.games = [saved, ...state.games].slice(0, MAX_GAMES);
        set(patch);
        return saved;
      },
      saveAnalysis: (gameId, analysis, playerColor) =>
        set((state) => ({
          games: state.games.map((g) => (g.id === gameId ? { ...g, analysis, playerColor: playerColor ?? g.playerColor } : g)),
        })),
      deleteGame: (gameId) => set((state) => ({ games: state.games.filter((g) => g.id !== gameId) })),
      replaceProgress: (data) => set({ ...initialProgress(), ...data }),
      resetProgress: () => set(initialProgress()),
    }),
    { name: PROGRESS_STORAGE_KEY, version: PROGRESS_VERSION },
  ),
);
