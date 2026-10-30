import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { applyTheme, useSettings } from '@/store/settings';
import { Layout } from './Layout';
import { HomePage } from '@/features/home/HomePage';
import { NotFoundPage } from './NotFoundPage';

// Las páginas se cargan bajo demanda para que la carga inicial sea ligera.
const named = <K extends string>(loader: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  lazy(() => loader().then((m) => ({ default: m[name] })));

const LearnPage = named(() => import('@/features/lessons/LearnPage'), 'LearnPage');
const LevelPage = named(() => import('@/features/lessons/LevelPage'), 'LevelPage');
const LessonPage = named(() => import('@/features/lessons/LessonPage'), 'LessonPage');
const TacticsPage = named(() => import('@/features/tactics/TacticsPage'), 'TacticsPage');
const OpeningsPage = named(() => import('@/features/openings/OpeningsPage'), 'OpeningsPage');
const OpeningPage = named(() => import('@/features/openings/OpeningPage'), 'OpeningPage');
const PlayPage = named(() => import('@/features/play/PlayPage'), 'PlayPage');
const AnalysisPage = named(() => import('@/features/analysis/AnalysisPage'), 'AnalysisPage');
const ProgressPage = named(() => import('@/features/progress/ProgressPage'), 'ProgressPage');
const FreeBoardPage = named(() => import('@/features/board/FreeBoardPage'), 'FreeBoardPage');
const SettingsPage = named(() => import('@/features/settings/SettingsPage'), 'SettingsPage');

function Loading() {
  return (
    <p className="py-10 text-center text-slate-500" role="status">
      Cargando…
    </p>
  );
}

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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="aprender" element={<LearnPage />} />
            <Route path="aprender/:levelId" element={<LevelPage />} />
            <Route path="aprender/:levelId/:slug" element={<LessonPage />} />
            <Route path="tactica" element={<TacticsPage />} />
            <Route path="aperturas" element={<OpeningsPage />} />
            <Route path="aperturas/:openingId" element={<OpeningPage />} />
            <Route path="jugar" element={<PlayPage />} />
            <Route path="analisis" element={<AnalysisPage />} />
            <Route path="progreso" element={<ProgressPage />} />
            <Route path="tablero" element={<FreeBoardPage />} />
            <Route path="ajustes" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
