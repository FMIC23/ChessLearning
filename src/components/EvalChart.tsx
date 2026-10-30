import type { MoveClass } from '@/lib/analysis';
import { CLASS_INFO, winPercentFromScore } from '@/lib/analysis';
import type { UciScore } from '@/engine/uci';

interface EvalChartProps {
  /** Evaluación (desde las blancas) de cada posición, empezando por la inicial. */
  scores: UciScore[];
  /** Clasificación de cada jugada (índice = jugada). */
  classes?: MoveClass[];
  /** Índice de jugada seleccionada (-1 = posición inicial). */
  current: number;
  onSelect?: (moveIndex: number) => void;
}

const W = 600;
const H = 140;

/** Gráfica de la evaluación a lo largo de la partida (probabilidad de ganar de las blancas). */
export function EvalChart({ scores, classes = [], current, onSelect }: EvalChartProps) {
  if (scores.length < 2) return null;
  const n = scores.length - 1;
  const x = (i: number) => (i / n) * W;
  const y = (s: UciScore) => H - (winPercentFromScore(s) / 100) * H;
  const points = scores.map((s, i) => `${x(i).toFixed(1)},${y(s).toFixed(1)}`).join(' ');
  const area = `0,${H} ${points} ${W},${H}`;

  const select = (clientX: number, rect: DOMRect) => {
    const ratio = (clientX - rect.left) / rect.width;
    onSelect?.(Math.max(0, Math.min(n, Math.round(ratio * n))) - 1);
  };

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-32 w-full cursor-pointer rounded-lg bg-slate-700 sm:h-36"
        preserveAspectRatio="none"
        role="img"
        aria-label="Gráfica de evaluación de la partida. Zona clara: ventaja blanca; oscura: ventaja negra."
        onClick={(e) => select(e.clientX, e.currentTarget.getBoundingClientRect())}
      >
        <polygon points={area} fill="#f1f5f9" />
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
        {classes.map((c, i) => {
          if (c !== 'mistake' && c !== 'blunder' && c !== 'inaccuracy') return null;
          const s = scores[i + 1];
          if (!s) return null;
          return <circle key={i} cx={x(i + 1)} cy={y(s)} r={c === 'inaccuracy' ? 3 : 4.5} fill={CLASS_INFO[c].color} stroke="#fff" strokeWidth="1" />;
        })}
        <line x1={x(current + 1)} y1="0" x2={x(current + 1)} y2={H} stroke="#2f6fd6" strokeWidth="2" />
      </svg>
      <figcaption className="mt-1 flex justify-between text-xs text-slate-500">
        <span>Inicio</span>
        <span>
          <span className="inline-block h-2 w-2 rounded-full bg-amber-600" /> imprecisión ·{' '}
          <span className="inline-block h-2 w-2 rounded-full bg-orange-600" /> error ·{' '}
          <span className="inline-block h-2 w-2 rounded-full bg-red-600" /> error grave
        </span>
        <span>Final</span>
      </figcaption>
    </figure>
  );
}
