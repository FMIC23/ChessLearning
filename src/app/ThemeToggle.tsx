import { useSettings, type ThemePreference } from '@/store/settings';

const NEXT: Record<ThemePreference, ThemePreference> = { system: 'light', light: 'dark', dark: 'system' };
const LABEL: Record<ThemePreference, string> = { system: 'Tema del sistema', light: 'Tema claro', dark: 'Tema oscuro' };
const ICON: Record<ThemePreference, string> = { system: '🖥️', light: '☀️', dark: '🌙' };

export function ThemeToggle() {
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  return (
    <button
      type="button"
      onClick={() => setTheme(NEXT[theme])}
      className="rounded-lg p-2 text-lg hover:bg-slate-200 dark:hover:bg-slate-800"
      aria-label={`${LABEL[theme]}. Pulsa para cambiar.`}
      title={LABEL[theme]}
    >
      <span aria-hidden="true">{ICON[theme]}</span>
    </button>
  );
}
