import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui';

/** Avisos del service worker: app lista sin conexión y nueva versión disponible. */
export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto flex max-w-md flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:left-auto dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="flex-1 text-sm">
        {needRefresh
          ? 'Hay una nueva versión de la Escuela de Ajedrez.'
          : '✅ La app ya funciona sin conexión.'}
      </p>
      {needRefresh && (
        <Button variant="primary" onClick={() => void updateServiceWorker(true)}>
          Actualizar
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => {
          setOfflineReady(false);
          setNeedRefresh(false);
        }}
      >
        Cerrar
      </Button>
    </div>
  );
}
