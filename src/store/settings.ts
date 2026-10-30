import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { profileStorage } from './profileStorage';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface SettingsState {
  theme: ThemePreference;
  showCoordinates: boolean;
  showLegalMoves: boolean;
  unlockAll: boolean;
  /** Últimas opciones usadas al jugar contra el ordenador. */
  playLevel: number;
  playColor: 'w' | 'b' | 'random';
  setPlayOptions: (options: { playLevel?: number; playColor?: 'w' | 'b' | 'random' }) => void;
  setTheme: (theme: ThemePreference) => void;
  setShowCoordinates: (value: boolean) => void;
  setShowLegalMoves: (value: boolean) => void;
  setUnlockAll: (value: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      showCoordinates: true,
      showLegalMoves: true,
      unlockAll: false,
      playLevel: 2,
      playColor: 'w',
      setPlayOptions: (options) => set(options),
      setTheme: (theme) => set({ theme }),
      setShowCoordinates: (showCoordinates) => set({ showCoordinates }),
      setShowLegalMoves: (showLegalMoves) => set({ showLegalMoves }),
      setUnlockAll: (unlockAll) => set({ unlockAll }),
    }),
    { name: 'ajedrez-ajustes', version: 1, storage: profileStorage },
  ),
);

/** Aplica la clase `dark` al <html> según la preferencia y el sistema. */
export function applyTheme(theme: ThemePreference): void {
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const dark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', dark);
}
