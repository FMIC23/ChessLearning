import type { RatingPoint } from '@/store/progress';

const W = 600;
const H = 180;
const PAD = 28;

/** Evolución de la puntuación (problemas y partidas). */
export function RatingChart({ history }: { history: RatingPoint[] }) {
  if (history.length < 2) {
    return <p className="text-sm text-slate-500">Resuelve problemas o juega partidas para ver tu evolución.</p>;
  }
  const series = (source: RatingPoint['source']) => history.map((p, i) => ({ ...p, i })).filter((p) => p.source === source);
  const values = history.map((p) => p.rating);
  const min = Math.floor((Math.min(...values) - 50) / 100) * 100;
  const max = Math.ceil((Math.max(...values) + 50) / 100) * 100;
  const x = (i: number) => PAD + (i / (history.length - 1)) * (W - PAD - 8);
  const y = (r: number) => H - 20 - ((r - min) / (max - min)) * (H - 30);
  const path = (pts: { i: number; rating: number }[]) => pts.map((p, k) => `${k ? 'L' : 'M'}${x(p.i).toFixed(1)},${y(p.rating).toFixed(1)}`).join(' ');
  const ticks = [min, Math.round((min + max) / 2), max];
  const puzzles = series('problema');
  const games = series('partida');
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Evolución de la puntuación: de ${values[0]} a ${values[values.length - 1]}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD} x2={W} y1={y(t)} y2={y(t)} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
            <text x={0} y={y(t) + 4} fontSize="11" className="fill-slate-500">
              {t}
            </text>
          </g>
        ))}
        {puzzles.length > 1 && <path d={path(puzzles)} fill="none" stroke="#2f6fd6" strokeWidth="2.5" strokeLinejoin="round" />}
        {games.length > 1 && <path d={path(games)} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" />}
        {games.length === 1 && <circle cx={x(games[0]!.i)} cy={y(games[0]!.rating)} r="4" fill="#16a34a" />}
      </svg>
      <figcaption className="flex gap-4 text-xs text-slate-500">
        <span>
          <span className="mr-1 inline-block h-2 w-4 rounded bg-[#2f6fd6]" />
          Problemas
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-4 rounded bg-[#16a34a]" />
          Partidas
        </span>
      </figcaption>
    </figure>
  );
}
