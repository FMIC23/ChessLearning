import { Link } from 'react-router-dom';
import { openingsByGroup } from '@/content/openings';
import { Badge, Card, PageHeader, ProgressBar } from '@/components/ui';
import { openingMastery } from '@/lib/openings/trainer';
import { useProgress } from '@/store/progress';

export function OpeningsPage() {
  const stats = useProgress((s) => s.openings);
  const groups = openingsByGroup();
  return (
    <div>
      <PageHeader
        title="Entrenador de aperturas"
        subtitle="Un repertorio completo y explicado. Estúdialo con comentarios y ponte a prueba: la app juega las jugadas del rival y tú las tuyas."
      />
      {groups.length === 0 && <Card>Aún no hay aperturas.</Card>}
      <div className="space-y-8">
        {groups.map(([group, openings]) => (
          <section key={group}>
            <h2 className="mb-3 text-xl font-semibold">{group}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {openings.map((o) => {
                const m = openingMastery(o, stats[o.id]);
                return (
                  <li key={o.id}>
                    <Link to={`/aperturas/${o.id}`} className="block h-full rounded-2xl">
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold">{o.name}</h3>
                          {o.eco && <Badge>{o.eco}</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{o.summary}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <ProgressBar value={m.total ? m.mastered / m.total : 0} label={`Líneas dominadas de ${o.name}`} />
                          <span className="shrink-0 text-xs text-slate-500">
                            {m.mastered}/{m.total} líneas
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
