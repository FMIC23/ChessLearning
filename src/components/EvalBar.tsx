import type { UciScore } from '@/engine/uci';
import { formatScore } from '@/engine/uci';
import { winPercentFromScore } from '@/lib/analysis';

/** Barra vertical de evaluación (blancas abajo por defecto). */
export function EvalBar({ score, orientation = 'white' }: { score: UciScore | null; orientation?: 'white' | 'black' }) {
  const white = score ? winPercentFromScore(score) : 50;
  const label = score ? formatScore(score) : '…';
  const whiteOnBottom = orientation === 'white';
  return (
    <div
      className="relative w-4 shrink-0 overflow-hidden rounded bg-slate-800 sm:w-6"
      role="meter"
      aria-label={`Evaluación: ${label}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(white)}
    >
      <div
        className={`absolute left-0 w-full bg-slate-100 transition-all duration-500 ${whiteOnBottom ? 'bottom-0' : 'top-0'}`}
        style={{ height: `${white}%` }}
      />
      <span
        className={`absolute left-1/2 -translate-x-1/2 text-[9px] font-bold [writing-mode:vertical-rl] sm:text-[10px] ${
          white >= 50 ? (whiteOnBottom ? 'bottom-1 text-slate-800' : 'top-1 text-slate-800') : whiteOnBottom ? 'top-1 text-slate-100' : 'bottom-1 text-slate-100'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
