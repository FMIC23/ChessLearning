import { useEffect, useRef } from 'react';
import { defaultPieces } from 'react-chessboard';

interface PromotionDialogProps {
  color: 'w' | 'b';
  onSelect: (piece: 'q' | 'r' | 'b' | 'n') => void;
  onCancel: () => void;
}

const OPTIONS: { piece: 'q' | 'r' | 'b' | 'n'; label: string }[] = [
  { piece: 'q', label: 'Dama' },
  { piece: 'r', label: 'Torre' },
  { piece: 'b', label: 'Alfil' },
  { piece: 'n', label: 'Caballo' },
];

export function PromotionDialog({ color, onSelect, onCancel }: PromotionDialogProps) {
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Elige la pieza de promoción"
    >
      <div className="rounded-xl bg-white p-4 shadow-xl dark:bg-slate-800">
        <p className="mb-3 text-center font-semibold">Promocionar a…</p>
        <div className="flex gap-2">
          {OPTIONS.map(({ piece, label }, i) => {
            const key = `${color}${piece.toUpperCase()}`;
            const render = defaultPieces[key];
            return (
              <button
                key={piece}
                ref={i === 0 ? firstButton : undefined}
                type="button"
                onClick={() => onSelect(piece)}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
                aria-label={label}
                title={label}
              >
                <span className="h-12 w-12">{render?.()}</span>
              </button>
            );
          })}
        </div>
        <button type="button" onClick={onCancel} className="mt-3 w-full text-sm text-slate-500 underline">
          Cancelar
        </button>
      </div>
    </div>
  );
}
