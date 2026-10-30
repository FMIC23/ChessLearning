import { useState } from 'react';
import type { QuizExercise } from '@/types/lesson';
import { ChessBoard } from '@/components/ChessBoard';
import { toBoardArrows } from '@/lib/board/arrows';
import { Feedback } from '@/components/ui';
import { Markdown } from '@/components/Markdown';
import type { ExerciseViewProps } from './types';

export function QuizExerciseView({ exercise, onSolved, solved }: ExerciseViewProps<QuizExercise>) {
  const [chosen, setChosen] = useState<number[]>(solved ? [exercise.answer] : []);
  const [done, setDone] = useState(solved);

  const choose = (index: number) => {
    if (done || chosen.includes(index)) return;
    const next = [...chosen, index];
    setChosen(next);
    if (index === exercise.answer) {
      setDone(true);
      onSolved(next.length - 1);
    }
  };

  const lastWrong = chosen.length > 0 && chosen[chosen.length - 1] !== exercise.answer;

  return (
    <div className={exercise.fen ? 'grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]' : ''}>
      {exercise.fen && (
        <ChessBoard fen={exercise.fen} orientation={exercise.orientation ?? 'white'} arrows={toBoardArrows(exercise.arrows)} />
      )}
      <fieldset className="space-y-3">
        <legend className="mb-2">
          <Markdown text={exercise.prompt} />
        </legend>
        <div className="grid gap-2">
          {exercise.options.map((option, i) => {
            const picked = chosen.includes(i);
            const correct = i === exercise.answer;
            const tone = picked
              ? correct
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                : 'border-red-400 bg-red-50 line-through dark:bg-red-950/40'
              : 'border-slate-300 hover:border-brand-500 hover:bg-brand-50 dark:border-slate-600 dark:hover:bg-slate-800';
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={done && !picked}
                aria-pressed={picked}
                className={`rounded-lg border px-3 py-2 text-left transition-colors disabled:opacity-60 ${tone}`}
              >
                <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
                {option}
              </button>
            );
          })}
        </div>
        {lastWrong && !done && <Feedback tone="error">No es correcto. Prueba otra opción.</Feedback>}
        {done && <Feedback tone="success">¡Correcto!</Feedback>}
        {done && exercise.explanation && <Markdown text={exercise.explanation} />}
      </fieldset>
    </div>
  );
}
