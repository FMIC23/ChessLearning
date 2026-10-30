import { dayKey } from '@/lib/progress';

/** Calendario de actividad de las últimas semanas (estilo «contribuciones»). */
export function ActivityCalendar({ days, weeks = 16 }: { days: string[]; weeks?: number }) {
  const active = new Set(days);
  const today = new Date();
  const start = new Date(today);
  // Empieza en lunes, hace `weeks` semanas.
  start.setDate(today.getDate() - ((today.getDay() + 6) % 7) - (weeks - 1) * 7);
  const columns: Date[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      col.push(date);
    }
    columns.push(col);
  }
  const count = columns.flat().filter((d) => active.has(dayKey(d))).length;
  return (
    <figure>
      <div className="flex gap-1 overflow-x-auto" role="img" aria-label={`Has practicado ${count} días en las últimas ${weeks} semanas`}>
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            {col.map((date) => {
              const key = dayKey(date);
              const future = date > today;
              return (
                <span
                  key={key}
                  title={`${date.toLocaleDateString('es-ES')}${active.has(key) ? ': practicado' : ''}`}
                  className={`h-3 w-3 rounded-sm ${
                    future ? 'bg-transparent' : active.has(key) ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <figcaption className="mt-1 text-xs text-slate-500">
        {count} días con práctica en las últimas {weeks} semanas
      </figcaption>
    </figure>
  );
}
