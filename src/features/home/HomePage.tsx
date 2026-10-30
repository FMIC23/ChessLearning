import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { InstallCard } from '@/features/pwa/InstallCard';
import { LEVELS } from '@/content/lessons';
import { combinedRating, ratingCategory } from '@/lib/elo';
import { currentStreak, nextLesson } from '@/lib/progress';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';

const SECTIONS = [
  { to: '/aprender', icon: '📚', title: 'Ruta de aprendizaje', text: '7 niveles con lecciones cortas y ejercicios interactivos, desde cómo se mueven las piezas.' },
  { to: '/tactica', icon: '⚔️', title: 'Táctica', text: 'Problemas a tu medida con pistas, solución paso a paso y repetición espaciada.' },
  { to: '/aperturas', icon: '📖', title: 'Aperturas', text: 'Un repertorio explicado con ideas. Estúdialo y ponte a prueba en modo test.' },
  { to: '/jugar', icon: '🤖', title: 'Jugar', text: 'Partidas contra Stockfish con 8 niveles, de muy débil a nivel de maestro.' },
  { to: '/analisis', icon: '📈', title: 'Análisis', text: 'Analiza tus partidas o importa un PGN: errores, mejores jugadas y gráfica.' },
  { to: '/progreso', icon: '📊', title: 'Progreso', text: 'Tu Elo estimado, racha, puntos débiles y copia de seguridad del progreso.' },
];

export function HomePage() {
  const progress = useProgress();
  const unlockAll = useSettings((s) => s.unlockAll);
  const next = nextLesson(LEVELS, progress.lessons, unlockAll);
  const started = Object.keys(progress.lessons).length > 0 || progress.puzzleCount > 0;
  const rating = combinedRating(progress);
  const streak = currentStreak(progress.activityDays);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white sm:p-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Aprende ajedrez desde cero hasta experto</h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          Un camino guiado con lecciones interactivas, problemas tácticos, aperturas, finales y partidas contra el ordenador. Sin registro:
          tu progreso se guarda en este navegador.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={next ? `/aprender/${next.level.id}/${next.lesson.slug}` : '/aprender'}
            className="rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50"
          >
            {started ? 'Continuar aprendiendo' : 'Empezar desde cero'}
          </Link>
          <Link to="/tactica" className="rounded-lg border border-white/60 px-4 py-2 font-semibold text-white hover:bg-white/10">
            Resolver problemas
          </Link>
        </div>
        {started && (
          <dl className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <dt className="text-brand-100">Elo estimado</dt>
              <dd className="text-2xl font-bold">
                {rating} <span className="text-sm font-normal text-brand-100">{ratingCategory(rating)}</span>
              </dd>
            </div>
            <div>
              <dt className="text-brand-100">Racha</dt>
              <dd className="text-2xl font-bold">{streak} 🔥</dd>
            </div>
            <div>
              <dt className="text-brand-100">Lecciones</dt>
              <dd className="text-2xl font-bold">{Object.keys(progress.lessons).length}</dd>
            </div>
          </dl>
        )}
      </section>

      {next && (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Tu siguiente lección · Nivel {next.level.number}</p>
            <p className="text-lg font-semibold">{next.lesson.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{next.lesson.summary}</p>
          </div>
          <Link
            to={`/aprender/${next.level.id}/${next.lesson.slug}`}
            className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
          >
            Empezar
          </Link>
        </Card>
      )}

      <InstallCard />

      <section aria-labelledby="secciones">
        <h2 id="secciones" className="mb-3 text-xl font-semibold">
          Todo lo que puedes hacer
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="block h-full rounded-2xl">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <p className="text-3xl" aria-hidden="true">
                    {s.icon}
                  </p>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.text}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
