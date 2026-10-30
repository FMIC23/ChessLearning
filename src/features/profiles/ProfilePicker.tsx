import { useEffect, useRef } from 'react';
import { useProfiles } from '@/store/profiles';

/** Pantalla «¿Quién juega?» al abrir la app cuando hay varios perfiles. */
export function ProfilePicker() {
  const profiles = useProfiles((s) => s.profiles);
  const activeId = useProfiles((s) => s.activeId);
  const switchTo = useProfiles((s) => s.switchTo);
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    first.current?.focus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 dark:bg-slate-950" role="dialog" aria-modal="true" aria-labelledby="quien-juega">
      <p className="text-5xl" aria-hidden="true">
        ♞
      </p>
      <h1 id="quien-juega" className="mt-4 text-3xl font-bold">
        ¿Quién juega?
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Cada perfil tiene su propio progreso.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {profiles.map((p) => (
          <li key={p.id}>
            <button
              ref={p.id === activeId ? first : undefined}
              type="button"
              onClick={() => switchTo(p.id)}
              className="flex w-32 flex-col items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-4 hover:border-brand-500 focus-visible:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <span aria-hidden="true" className="text-5xl">
                {p.avatar}
              </span>
              <span className="w-full truncate font-semibold">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
