import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { LEVELS } from '@/content/lessons';
import { nextLesson } from '@/lib/progress';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';

export function HomePage() {
  const lessons = useProgress((s) => s.lessons);
  const unlockAll = useSettings((s) => s.unlockAll);
  const next = nextLesson(LEVELS, lessons, unlockAll);
  const started = Object.keys(lessons).length > 0;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white sm:p-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Aprende ajedrez desde cero hasta experto</h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          Un camino guiado con lecciones interactivas, problemas tácticos, aperturas, finales y partidas contra el ordenador.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={next ? `/aprender/${next.level.id}/${next.lesson.slug}` : '/aprender'}
            className="rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50"
          >
            {started ? 'Continuar aprendiendo' : 'Empezar desde cero'}
          </Link>
          <Link to="/aprender" className="rounded-lg border border-white/60 px-4 py-2 font-semibold text-white hover:bg-white/10">
            Ver la ruta completa
          </Link>
        </div>
      </section>
      {next && (
        <Card>
          <p className="text-sm text-slate-500">Tu siguiente lección</p>
          <p className="text-lg font-semibold">
            Nivel {next.level.number} · {next.lesson.title}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{next.lesson.summary}</p>
        </Card>
      )}
    </div>
  );
}
