import { useMemo, useState } from 'react';
import type { SquaresExercise } from '@/types/lesson';
import { ChessBoard } from '@/components/ChessBoard';
import { Button, Feedback } from '@/components/ui';
import { Markdown } from '@/components/Markdown';
import { EMPTY_FEN, resolveTargets } from '@/lib/lessons/exercise';
import type { ExerciseViewProps } from './types';

const FOUND = 'rgba(22, 163, 74, 0.6)';
const WRONG = 'rgba(220, 38, 38, 0.6)';
const MARK = 'rgba(47, 111, 214, 0.45)';

export function SquaresExerciseView({ exercise, onSolved, solved }: ExerciseViewProps<SquaresExercise>) {
  const targets = useMemo(() => resolveTargets(exercise), [exercise]);
  const mode = exercise.mode ?? (targets.length === 1 ? 'one' : 'all');
  const [found, setFound] = useState<string[]>(solved ? targets : []);
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(solved);

  const handleClick = (square: string) => {
    if (done) return;
    if (targets.includes(square)) {
      setWrong(null);
      if (found.includes(square)) return;
      const next = [...found, square];
      setFound(next);
      if (mode === 'one' || next.length === targets.length) {
        setDone(true);
        onSolved(mistakes);
      }
    } else {
      setWrong(square);
      setMistakes((m) => m + 1);
    }
  };

  const highlights: Record<string, string> = {};
  for (const sq of exercise.highlights ?? []) highlights[sq] = MARK;
  if (revealed) for (const sq of targets) highlights[sq] = 'rgba(22, 163, 74, 0.3)';
  for (const sq of found) highlights[sq] = FOUND;
  if (wrong) highlights[wrong] = WRONG;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]">
      <div>
        <ChessBoard
          fen={exercise.fen ?? EMPTY_FEN}
          orientation={exercise.orientation ?? 'white'}
          highlights={highlights}
          onSquareClick={handleClick}
          label="Tablero: haz clic en las casillas"
        />
        <SquareKeyboardPicker onPick={handleClick} disabled={done} />
      </div>
      <div className="space-y-3">
        <Markdown text={exercise.prompt} />
        {mode === 'all' && (
          <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
            Encontradas: {found.length} de {targets.length}
          </p>
        )}
        {wrong && !done && <Feedback tone="error">La casilla {wrong} no es correcta.</Feedback>}
        {done && <Feedback tone="success">¡Correcto!</Feedback>}
        {done && exercise.explanation && <Markdown text={exercise.explanation} />}
        {!done && exercise.hint && <p className="text-sm text-slate-500">💡 {exercise.hint}</p>}
        {!done && (
          <Button
            onClick={() => {
              setRevealed(true);
              setMistakes((m) => m + 1);
            }}
            disabled={revealed}
          >
            Mostrar casillas
          </Button>
        )}
      </div>
    </div>
  );
}

/** Alternativa accesible al clic: escribir la casilla (p. ej. «e4»). */
function SquareKeyboardPicker({ onPick, disabled }: { onPick: (square: string) => void; disabled: boolean }) {
  const [value, setValue] = useState('');
  return (
    <form
      className="mt-2 flex items-center gap-2 text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        const sq = value.trim().toLowerCase();
        if (/^[a-h][1-8]$/.test(sq)) onPick(sq);
        setValue('');
      }}
    >
      <label className="text-slate-600 dark:text-slate-400">
        Casilla con teclado:{' '}
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          maxLength={2}
          placeholder="e4"
          className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
        />
      </label>
      <Button type="submit" disabled={disabled}>
        Marcar
      </Button>
    </form>
  );
}
