import { useId, useState, type FormEvent } from 'react';
import { createGame, parseUserMove, type MoveInput } from '@/lib/chess';

interface MoveTextInputProps {
  fen: string;
  disabled?: boolean;
  onMove: (move: MoveInput) => boolean;
}

/** Permite introducir jugadas por teclado (notación española o inglesa: "Cf3", "Nf3", "e4", "O-O"). */
export function MoveTextInput({ fen, disabled, onMove }: MoveTextInputProps) {
  const id = useId();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const game = createGame(fen);
    const move = parseUserMove(game, text);
    if (!move) {
      setError(`«${text}» no es una jugada legal en esta posición.`);
      return;
    }
    // Si la jugada es legal pero el ejercicio la rechaza, la propia página explica el motivo.
    onMove({ from: move.from, to: move.to, promotion: move.promotion });
    setText('');
    setError(null);
  };

  return (
    <form onSubmit={submit} className="mt-2 flex flex-wrap items-center gap-2 text-sm">
      <label htmlFor={id} className="text-slate-600 dark:text-slate-400">
        Jugada con teclado:
      </label>
      <input
        id={id}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        placeholder="p. ej. e4, Cf3, O-O"
        autoComplete="off"
        className="w-36 rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-md bg-slate-200 px-3 py-1 font-medium hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        Mover
      </button>
      {error && (
        <span id={`${id}-error`} role="alert" className="w-full text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
    </form>
  );
}
