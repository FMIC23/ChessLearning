import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '@/content/lessons';
import { OPENINGS } from '@/content/openings';
import { Badge, Button, Card, Feedback, PageHeader, ProgressBar } from '@/components/ui';
import { BackupError, createBackup, parseBackup } from '@/lib/backup';
import { combinedRating, ratingCategory } from '@/lib/elo';
import { currentStreak, levelProgress, longestStreak } from '@/lib/progress';
import { detectWeakPoints } from '@/lib/weakness';
import { META_THEMES, themeLabel } from '@/lib/puzzles/themes';
import { initialProgress, useProgress, type ProgressData } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { useActiveProfile } from '@/store/profiles';
import { ActivityCalendar } from './ActivityCalendar';
import { RatingChart } from './RatingChart';

function pickData(state: ProgressData): ProgressData {
  const keys = Object.keys(initialProgress()) as (keyof ProgressData)[];
  return Object.fromEntries(keys.map((k) => [k, state[k]])) as unknown as ProgressData;
}

export function ProgressPage() {
  const state = useProgress();
  const profile = useActiveProfile();
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const totalLessons = LEVELS.reduce((n, l) => n + l.lessons.length, 0);
  const doneLessons = Object.keys(state.lessons).length;
  const rating = combinedRating(state);
  const solved = state.puzzleHistory.filter((p) => p.success).length;

  const weakPoints = useMemo(() => {
    const lessonTitles = Object.fromEntries(
      LEVELS.flatMap((l) => l.lessons.map((lesson) => [lesson.id, { title: lesson.title, path: `/aprender/${l.id}/${lesson.slug}` }])),
    );
    const games = state.games
      .filter((g) => g.analysis && g.playerColor)
      .map((g) => ({ phaseErrors: g.analysis!.phaseErrors, blunders: g.analysis!.counts[g.playerColor!]?.blunder ?? 0 }));
    return detectWeakPoints({
      themeStats: state.themeStats,
      games,
      lessons: state.lessons,
      lessonTitles,
      openings: state.openings,
      openingNames: Object.fromEntries(OPENINGS.map((o) => [o.id, o.name])),
    });
  }, [state.games, state.lessons, state.openings, state.themeStats]);

  const exportProgress = () => {
    const { theme, showCoordinates, showLegalMoves, unlockAll, playLevel, playColor } = useSettings.getState();
    const backup = createBackup(pickData(useProgress.getState()), { theme, showCoordinates, showLegalMoves, unlockAll, playLevel, playColor });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const slug = profile.name.normalize('NFD').replace(/[^\w-]+/g, '-').toLowerCase();
    a.download = `progreso-ajedrez-${slug}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ tone: 'success', text: 'Progreso exportado.' });
  };

  const importProgress = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const backup = parseBackup(await file.text(), initialProgress());
      if (!window.confirm('Se sustituirá tu progreso actual por el del archivo. ¿Continuar?')) return;
      useProgress.getState().replaceProgress(backup.progress);
      if (backup.settings) useSettings.setState(backup.settings);
      setMessage({ tone: 'success', text: `Progreso importado (copia del ${new Date(backup.exportedAt).toLocaleDateString('es-ES')}).` });
    } catch (error) {
      setMessage({ tone: 'error', text: error instanceof BackupError ? error.message : 'No se pudo importar el archivo.' });
    }
  };

  return (
    <div>
      <PageHeader title={`Progreso de ${profile.name}`} subtitle="Todo se guarda en este navegador. Exporta una copia para no perderlo o para llevarlo a otro dispositivo." />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Elo estimado" value={rating} detail={ratingCategory(rating)} highlight />
        <StatCard label="Puntuación táctica" value={state.puzzleRating} detail={`${state.puzzleCount} problemas`} />
        <StatCard label="Puntuación en partidas" value={state.gameRating} detail={`${state.gameCount} partidas puntuables`} />
        <StatCard label="Racha actual" value={`${currentStreak(state.activityDays)} 🔥`} detail={`Récord: ${longestStreak(state.activityDays)} días`} />
        <StatCard label="Lecciones" value={`${doneLessons}/${totalLessons}`} detail="completadas" />
        <StatCard label="Problemas resueltos" value={solved} detail={`de ${state.puzzleHistory.length} intentos`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Puntos débiles</h2>
          {weakPoints.length === 0 ? (
            <p className="text-sm text-slate-500">
              Todavía no hay datos suficientes. Resuelve problemas y analiza tus partidas para que la app detecte qué te conviene
              practicar.
            </p>
          ) : (
            <ul className="space-y-3">
              {weakPoints.map((w) => (
                <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div>
                    <p className="font-medium">{w.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{w.detail}</p>
                  </div>
                  <Link to={w.link} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700">
                    {w.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Evolución de la puntuación</h2>
          <RatingChart history={state.ratingHistory} />
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Ruta de aprendizaje</h2>
          <ul className="space-y-3">
            {LEVELS.map((level) => {
              const p = levelProgress(level, state.lessons);
              return (
                <li key={level.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <Link to={`/aprender/${level.id}`} className="hover:underline">
                      {level.icon} Nivel {level.number} · {level.title}
                    </Link>
                    <span className="text-slate-500">
                      {p.done}/{p.total}
                    </span>
                  </div>
                  <ProgressBar value={p.ratio} label={`Progreso del nivel ${level.number}`} />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Actividad</h2>
          <ActivityCalendar days={state.activityDays} />
          <h3 className="mt-5 mb-2 font-semibold">Temas tácticos</h3>
          <ThemeTable stats={state.themeStats} />
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Copia de seguridad</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={exportProgress}>
              ⬇ Exportar progreso (JSON)
            </Button>
            <Button onClick={() => fileInput.current?.click()}>⬆ Importar progreso</Button>
            <input ref={fileInput} type="file" accept="application/json,.json" className="sr-only" onChange={importProgress} aria-label="Archivo de progreso" />
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm('¿Borrar todo tu progreso? Esta acción no se puede deshacer.')) {
                  useProgress.getState().resetProgress();
                  setMessage({ tone: 'success', text: 'Progreso borrado.' });
                }
              }}
            >
              Borrar progreso
            </Button>
          </div>
          {message && (
            <div className="mt-3">
              <Feedback tone={message.tone}>{message.text}</Feedback>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail, highlight }: { label: string; value: string | number; detail?: string; highlight?: boolean }) {
  return (
    <Card className={`p-3 ${highlight ? 'border-brand-500 bg-brand-50 dark:bg-slate-900' : ''}`}>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {detail && <p className="text-xs text-slate-500">{detail}</p>}
    </Card>
  );
}


function ThemeTable({ stats }: { stats: Record<string, { attempts: number; successes: number }> }) {
  const rows = Object.entries(stats)
    .filter(([t, s]) => !META_THEMES.has(t) && s.attempts > 0)
    .sort((a, b) => b[1].attempts - a[1].attempts)
    .slice(0, 10);
  if (rows.length === 0) return <p className="text-sm text-slate-500">Aún no has resuelto problemas.</p>;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-500">
          <th className="py-1 font-medium">Tema</th>
          <th className="py-1 font-medium">Intentos</th>
          <th className="py-1 font-medium">Acierto</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([theme, s]) => {
          const rate = Math.round((s.successes / s.attempts) * 100);
          return (
            <tr key={theme} className="border-t border-slate-100 dark:border-slate-800">
              <td className="py-1">{themeLabel(theme)}</td>
              <td className="py-1">{s.attempts}</td>
              <td className="py-1">
                <Badge tone={rate >= 70 ? 'green' : rate >= 50 ? 'amber' : 'red'}>{rate} %</Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
