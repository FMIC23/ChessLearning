import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface SettingsState {
  theme: ThemePreference;
  showCoordinates: boolean;
  showLegalMoves: boolean;
  unlockAll: boolean;
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
      setTheme: (theme) => set({ theme }),
      setShowCoordinates: (showCoordinates) => set({ showCoordinates }),
      setShowLegalMoves: (showLegalMoves) => set({ showLegalMoves }),
      setUnlockAll: (unlockAll) => set({ unlockAll }),
    }),
    { name: 'ajedrez-ajustes', version: 1 },
  ),
);

/** Aplica la clase `dark` al <html> según la preferencia y el sistema. */
export function applyTheme(theme: ThemePreference): void {
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const dark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', dark);
}
