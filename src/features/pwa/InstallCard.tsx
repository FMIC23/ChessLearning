import { Button, Card } from '@/components/ui';
import { useInstallPrompt } from './useInstallPrompt';

/** Tarjeta para instalar la app en el móvil o el ordenador. */
export function InstallCard() {
  const { state, install } = useInstallPrompt();
  if (state === 'installed') return null;
  return (
    <Card className="flex flex-wrap items-center gap-3">
      <span className="text-3xl" aria-hidden="true">
        📲
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">Instala la app</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {state === 'ios'
            ? 'En iPhone o iPad: pulsa el botón Compartir de Safari y elige «Añadir a pantalla de inicio».'
            : state === 'available'
              ? 'Tenla en tu pantalla de inicio y úsala también sin conexión.'
              : 'En el menú de tu navegador, elige «Instalar aplicación» o «Añadir a pantalla de inicio». Funciona también sin conexión.'}
        </p>
      </div>
      {state === 'available' && (
        <Button variant="primary" onClick={() => void install()}>
          Instalar
        </Button>
      )}
    </Card>
  );
}
