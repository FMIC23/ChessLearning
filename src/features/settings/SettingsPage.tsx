import { useId, type ReactNode } from 'react';
import { Card, PageHeader } from '@/components/ui';
import { useSettings, type ThemePreference } from '@/store/settings';

function Toggle({ checked, onChange, children, description }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; description?: string }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <label htmlFor={id} className="font-medium">{children}</label>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 accent-brand-600" />
    </div>
  );
}

export function SettingsPage() {
  const s = useSettings();
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Ajustes" />
      <Card className="divide-y divide-slate-200 dark:divide-slate-800">
        <div className="flex items-center justify-between gap-4 py-3">
          <label htmlFor="tema" className="font-medium">Tema</label>
          <select
            id="tema"
            value={s.theme}
            onChange={(e) => s.setTheme(e.target.value as ThemePreference)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
          >
            <option value="system">Según el sistema</option>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
        <Toggle checked={s.showCoordinates} onChange={s.setShowCoordinates}>Mostrar coordenadas en el tablero</Toggle>
        <Toggle checked={s.showLegalMoves} onChange={s.setShowLegalMoves} description="Al seleccionar una pieza se marcan sus casillas de destino.">
          Mostrar jugadas legales
        </Toggle>
        <Toggle checked={s.unlockAll} onChange={s.setUnlockAll} description="Para jugadores con experiencia que quieren saltar directamente a niveles avanzados.">
          Desbloquear todos los niveles
        </Toggle>
      </Card>
    </div>
  );
}
