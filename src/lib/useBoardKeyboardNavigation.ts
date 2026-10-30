import { useEffect } from 'react';

/** Navegación por el historial con ← → Inicio Fin (ignorada mientras se escribe en un campo). */
export function useBoardKeyboardNavigation(viewIndex: number, length: number, goTo: (index: number) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (e.key === 'ArrowLeft') goTo(viewIndex - 1);
      else if (e.key === 'ArrowRight') goTo(viewIndex + 1);
      else if (e.key === 'Home') goTo(-1);
      else if (e.key === 'End') goTo(length - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, length, viewIndex]);
}
