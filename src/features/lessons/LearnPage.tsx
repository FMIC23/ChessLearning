import { Link } from 'react-router-dom';
import { LEVELS } from '@/content/lessons';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { isLevelUnlocked, levelProgress, nextLesson, UNLOCK_THRESHOLD } from '@/lib/progress';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';

export function LearnPage() {
  const lessons = useProgress((s) => s.lessons);
  const unlockAll = useSettings((s) => s.unlockAll);
  const next = nextLesson(LEVELS, lessons, unlockAll);

  return (
    <div>
      <PageHeader
        title="Ruta de aprendizaje"
        subtitle={`Siete niveles, de no saber mover las piezas a jugar como un experto. Completa el ${Math.round(UNLOCK_THRESHOLD * 100)} % de un nivel para desbloquear el siguiente.`}
      />
      {next && (
        <Card className="mb-6 flex flex-wrap items-center justify-between gap-3 border-brand-500/40">
          <div>
            <p className="text-sm text-slate-500">Siguiente lección</p>
            <p className="text-lg font-semibold">
              {next.level.title} · {next.lesson.title}
            </p>
          </div>
          <Link
            to={`/aprender/${next.level.id}/${next.lesson.slug}`}
            className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
          >
            Continuar
          </Link>
        </Card>
      )}
      <ol className="grid gap-4 md:grid-cols-2">
        {LEVELS.map((level, index) => {
          const unlocked = isLevelUnlocked(LEVELS, index, lessons, unlockAll);
          const progress = levelProgress(level, lessons);
          const content = (
            <Card className={`h-full transition-shadow ${unlocked ? 'hover:shadow-md' : 'opacity-60'}`}>
              <div className="flex items-start gap-3">
                <span className="text-4xl" aria-hidden="true">{level.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">
                      Nivel {level.number} · {level.title}
                    </h2>
                    {!unlocked && <Badge>🔒 Bloqueado</Badge>}
                    {progress.ratio === 1 && <Badge tone="green">✓ Completado</Badge>}
                  </div>
                  <p className="text-sm text-slate-500">{level.subtitle}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{level.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <ProgressBar value={progress.ratio} label={`Progreso del nivel ${level.number}`} />
                    <span className="shrink-0 text-xs text-slate-500">
                      {progress.done}/{progress.total}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
          return (
            <li key={level.id}>
              {unlocked ? (
                <Link to={`/aprender/${level.id}`} className="block h-full rounded-2xl">
                  {content}
                </Link>
              ) : (
                <div aria-disabled="true">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
