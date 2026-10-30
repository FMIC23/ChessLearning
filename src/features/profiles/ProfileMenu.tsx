import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useActiveProfile, useProfiles } from '@/store/profiles';

/** Botón de la cabecera con el perfil activo y un menú para cambiar de perfil. */
export function ProfileMenu() {
  const active = useActiveProfile();
  const profiles = useProfiles((s) => s.profiles);
  const switchTo = useProfiles((s) => s.switchTo);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Perfil: ${active.name}. Cambiar de perfil`}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        <span aria-hidden="true" className="text-xl">
          {active.avatar}
        </span>
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{active.name}</span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Perfiles"
          className="absolute right-0 z-40 mt-1 w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              role="menuitemradio"
              aria-checked={p.id === active.id}
              onClick={() => {
                setOpen(false);
                switchTo(p.id);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true" className="text-lg">
                {p.avatar}
              </span>
              <span className="flex-1 truncate">{p.name}</span>
              {p.id === active.id && <span aria-hidden="true">✓</span>}
            </button>
          ))}
          <hr className="my-1 border-slate-200 dark:border-slate-700" />
          <Link
            role="menuitem"
            to="/perfiles"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ➕ Añadir o gestionar perfiles
          </Link>
          <Link
            role="menuitem"
            to="/ajustes"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ⚙️ Ajustes
          </Link>
          <Link
            role="menuitem"
            to="/tablero"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ♟️ Tablero libre (para dos jugadores)
          </Link>
        </div>
      )}
    </div>
  );
}
