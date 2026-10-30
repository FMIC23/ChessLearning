import { Link, useParams } from 'react-router-dom';
import { LEVELS } from '@/content/lessons';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { isLevelUnlocked, levelProgress } from '@/lib/progress';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { NotFoundPage } from '@/app/NotFoundPage';

export function LevelPage() {
  const { levelId } = useParams();
  const lessons = useProgress((s) => s.lessons);
  const unlockAll = useSettings((s) => s.unlockAll);
  const index = LEVELS.findIndex((l) => l.id === levelId);
  const level = LEVELS[index];
  if (!level) return <NotFoundPage />;
  const unlocked = isLevelUnlocked(LEVELS, index, lessons, unlockAll);
  const progress = levelProgress(level, lessons);

  return (
    <div>
      <nav aria-label="Migas de pan" className="mb-2 text-sm">
        <Link to="/aprender" className="text-brand-600 underline dark:text-brand-100">
          Ruta de aprendizaje
        </Link>
      </nav>
      <PageHeader title={`${level.icon} Nivel ${level.number} · ${level.title}`} subtitle={level.description} />
      <div className="mb-6 flex items-center gap-3">
        <ProgressBar value={progress.ratio} label="Progreso del nivel" />
        <span className="shrink-0 text-sm text-slate-500">
          {progress.done} de {progress.total} lecciones
        </span>
      </div>
      {!unlocked && (
        <Card className="mb-4">
          🔒 Este nivel aún está bloqueado. Completa el nivel anterior o activa «Desbloquear todos los niveles» en Ajustes
          si ya tienes experiencia.
        </Card>
      )}
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {level.lessons.map((lesson, i) => {
          const record = lessons[lesson.id];
          const body = (
            <Card className="h-full transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-500">Lección {i + 1}</span>
                {record ? <Badge tone="green">✓ Hecha</Badge> : <Badge>{lesson.minutes} min</Badge>}
              </div>
              <h2 className="mt-1 font-semibold">{lesson.title}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{lesson.summary}</p>
              <p className="mt-2 text-xs text-slate-500">
                {lesson.exerciseCount} ejercicio{lesson.exerciseCount === 1 ? '' : 's'}
              </p>
            </Card>
          );
          return (
            <li key={lesson.id}>
              {unlocked ? (
                <Link to={`/aprender/${level.id}/${lesson.slug}`} className="block h-full rounded-2xl">
                  {body}
                </Link>
              ) : (
                <div className="opacity-60">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
