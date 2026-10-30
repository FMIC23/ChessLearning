import { useEffect, useRef } from 'react';
import { toSpanishSan } from '@/lib/chess';

export interface MoveListEntry {
  san: string;
  /** Marca opcional (p. ej. "??", "?", "!?") y su color. */
  annotation?: { symbol: string; className: string; label: string };
}

interface MoveListProps {
  moves: MoveListEntry[];
  currentIndex: number;
  onSelect?: (index: number) => void;
  /** Número de la primera jugada y si empieza el negro. */
  startMoveNumber?: number;
  startsWithBlack?: boolean;
}

export function MoveList({ moves, currentIndex, onSelect, startMoveNumber = 1, startsWithBlack = false }: MoveListProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [currentIndex]);

  const rows: { number: number; white?: number; black?: number }[] = [];
  let number = startMoveNumber;
  let i = 0;
  if (startsWithBlack && moves.length > 0) {
    rows.push({ number, black: 0 });
    number++;
    i = 1;
  }
  for (; i < moves.length; i += 2) {
    rows.push({ number, white: i, black: i + 1 < moves.length ? i + 1 : undefined });
    number++;
  }

  const cell = (index: number | undefined) => {
    if (index === undefined) return <span />;
    const entry = moves[index];
    if (!entry) return <span />;
    const active = index === currentIndex;
    return (
      <button
        type="button"
        ref={active ? activeRef : undefined}
        onClick={() => onSelect?.(index)}
        aria-current={active ? 'true' : undefined}
        className={`rounded px-1.5 py-0.5 text-left font-mono text-sm ${
          active ? 'bg-brand-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        {toSpanishSan(entry.san)}
        {entry.annotation && (
          <span className={`ml-0.5 font-bold ${active ? '' : entry.annotation.className}`} title={entry.annotation.label}>
            {entry.annotation.symbol}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700" aria-label="Lista de jugadas">
      {rows.length === 0 ? (
        <p className="p-3 text-sm text-slate-500">Aún no hay jugadas.</p>
      ) : (
        <ol className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <li key={row.number} className="grid grid-cols-[2.5rem_1fr_1fr] items-center gap-1 px-2 py-0.5">
              <span className="text-xs text-slate-500">{row.number}.</span>
              {row.white === undefined ? <span className="text-slate-400">…</span> : cell(row.white)}
              {cell(row.black)}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
