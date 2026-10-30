import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from './navigation';
import { ThemeToggle } from './ThemeToggle';

function navClass({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-600 text-white'
      : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  // Cierra el menú móvil al navegar.
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold" aria-label="Escuela de Ajedrez, inicio">
            <span aria-hidden="true" className="text-2xl">♞</span>
            <span>Escuela de Ajedrez</span>
          </NavLink>
          <nav aria-label="Principal" className="ml-auto hidden lg:block">
            <ul className="flex gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className={navClass}>
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-lg p-2 lg:hidden hover:bg-slate-200 dark:hover:bg-slate-800"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" className="text-xl">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="menu-movil" aria-label="Principal (móvil)" className="border-t border-slate-200 px-4 py-2 lg:hidden dark:border-slate-800">
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className={navClass}>
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <main id="contenido" className="mx-auto max-w-7xl px-4 py-6" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-slate-500">
        Escuela de Ajedrez · Código abierto (MIT) · Motor de análisis: Stockfish (GPLv3)
      </footer>
    </div>
  );
}
