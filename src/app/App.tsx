import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { applyTheme, useSettings } from '@/store/settings';
import { Layout } from './Layout';
import { HomePage } from '@/features/home/HomePage';
import { FreeBoardPage } from '@/features/board/FreeBoardPage';
import { NotFoundPage } from './NotFoundPage';

export function App() {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme('system');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tablero" element={<FreeBoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
