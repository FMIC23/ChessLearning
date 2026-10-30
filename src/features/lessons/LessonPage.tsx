import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findLesson, LEVELS } from '@/content/lessons';
import { Markdown } from '@/components/Markdown';
import { BoardDiagram } from '@/components/BoardDiagram';
import { Button, Card, ProgressBar } from '@/components/ui';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { isLevelUnlocked } from '@/lib/progress';
import { NotFoundPage } from '@/app/NotFoundPage';
import { ExerciseView } from './exercises/ExerciseView';
import type { Lesson, Level } from '@/types/lesson';

export function LessonPage() {
  const { levelId = '', slug = '' } = useParams();
  const found = findLesson(levelId, slug);
  if (!found) return <NotFoundPage />;
  // La clave reinicia el estado al cambiar de lección.
  return <LessonContent key={found.lesson.id} level={found.level} lesson={found.lesson} />;
}

function LessonContent({ level, lesson }: { level: Level; lesson: Lesson }) {
  const lessons = useProgress((s) => s.lessons);
  const completeLesson = useProgress((s) => s.completeLesson);
  const unlockAll = useSettings((s) => s.unlockAll);
  const alreadyDone = Boolean(lessons[lesson.id]);
  const [solved, setSolved] = useState<Record<number, number>>({});
  const [revealAll, setRevealAll] = useState(false);
  const [finished, setFinished] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const levelIndex = LEVELS.findIndex((l) => l.id === level.id);
  const unlocked = isLevelUnlocked(LEVELS, levelIndex, lessons, unlockAll);

  const solvedCount = Object.keys(solved).length;
  // Se muestran los pasos hasta el primer ejercicio sin resolver (incluido).
  const firstPending = lesson.steps.findIndex((s) => s.kind === 'exercise' && !(s.index in solved));
  const visibleSteps = revealAll || firstPending === -1 ? lesson.steps : lesson.steps.slice(0, firstPending + 1);
  const allSolved = solvedCount === lesson.exerciseCount;

  useEffect(() => {
    if (allSolved && !finished) {
      const mistakes = Object.values(solved).reduce((a, b) => a + b, 0);
      completeLesson(lesson.id, mistakes);
      setFinished(true);
    }
  }, [allSolved, completeLesson, finished, lesson.id, solved]);

  useEffect(() => {
    if (finished) endRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
  }, [finished]);

  const position = level.lessons.findIndex((l) => l.id === lesson.id);
  const nextInLevel = level.lessons[position + 1];
  const nextLevel = LEVELS[levelIndex + 1];
  const nextLink = nextInLevel
    ? { to: `/aprender/${level.id}/${nextInLevel.slug}`, label: `Siguiente: ${nextInLevel.title}` }
    : nextLevel
      ? { to: `/aprender/${nextLevel.id}`, label: `Ir al nivel ${nextLevel.number}: ${nextLevel.title}` }
      : { to: '/aprender', label: 'Volver a la ruta' };

  if (!unlocked) {
    return (
      <Card>
        🔒 Esta lección pertenece a un nivel bloqueado. <Link to="/aprender" className="underline">Volver a la ruta</Link>
      </Card>
    );
  }

  return (
    <article className="mx-auto max-w-5xl">
      <nav aria-label="Migas de pan" className="mb-2 flex flex-wrap gap-1 text-sm">
        <Link to="/aprender" className="text-brand-600 underline dark:text-brand-100">Ruta</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/aprender/${level.id}`} className="text-brand-600 underline dark:text-brand-100">
          Nivel {level.number} · {level.title}
        </Link>
      </nav>
      <header className="mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
        {lesson.summary && <p className="mt-1 text-slate-600 dark:text-slate-400">{lesson.summary}</p>}
        {lesson.exerciseCount > 0 && (
          <div className="mt-3 flex items-center gap-3">
            <ProgressBar value={solvedCount / lesson.exerciseCount} label="Ejercicios resueltos" />
            <span className="shrink-0 text-sm text-slate-500">
              {solvedCount}/{lesson.exerciseCount}
            </span>
          </div>
        )}
      </header>

      <div className="space-y-6">
        {visibleSteps.map((step, i) => {
          if (step.kind === 'text') return <Markdown key={i} text={step.markdown} />;
          if (step.kind === 'board') return <BoardDiagram key={i} diagram={step.diagram} />;
          return (
            <Card key={i} className="border-brand-500/30">
              <p className="mb-3 text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-100">
                Ejercicio {step.index + 1} de {lesson.exerciseCount}
              </p>
              <ExerciseView
                exercise={step.exercise}
                solved={step.index in solved}
                onSolved={(mistakes) => setSolved((s) => ({ ...s, [step.index]: mistakes }))}
              />
            </Card>
          );
        })}
      </div>

      {!allSolved && alreadyDone && !revealAll && (
        <div className="mt-6">
          <Button onClick={() => setRevealAll(true)}>Ya completaste esta lección: mostrar todo el contenido</Button>
        </div>
      )}

      {(allSolved || (alreadyDone && revealAll)) && (
        <div ref={endRef}>
          <Card className="mt-8 text-center">
            <p className="text-4xl" aria-hidden="true">🏆</p>
            <h2 className="mt-2 text-xl font-bold">{allSolved ? '¡Lección completada!' : 'Lección repasada'}</h2>
            {allSolved && (
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Errores cometidos: {Object.values(solved).reduce((a, b) => a + b, 0)}
              </p>
            )}
            <Link
              to={nextLink.to}
              className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
            >
              {nextLink.label}
            </Link>
          </Card>
        </div>
      )}
    </article>
  );
}
