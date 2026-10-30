import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Puzzle } from '@/types/puzzle';
import { loadPuzzles } from '@/content/puzzles';
import { Card, Feedback, PageHeader } from '@/components/ui';
import { useProgress } from '@/store/progress';
import { VisualizationTrainer } from './VisualizationTrainer';
import { ThreatTrainer } from './ThreatTrainer';

const TABS = [
  { id: 'visualizacion', label: '🧠 Visualización' },
  { id: 'amenazas', label: '⚠️ ¿Qué amenaza el rival?' },
] as const;

export function AnticipationPage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('modo') === 'amenazas' ? 'amenazas' : 'visualizacion';
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stats = useProgress((s) => s.anticipation);

  useEffect(() => {
    loadPuzzles()
      .then(setPuzzles)
      .catch((e: Error) => setError(e.message));
  }, []);

  const rate = (s: { attempts: number; successes: number } | undefined) =>
    s && s.attempts ? `${Math.round((s.successes / s.attempts) * 100)} % (${s.successes}/${s.attempts})` : '—';

  return (
    <div>
      <PageHeader
        title="Anticipación"
        subtitle="Entrena lo que distingue a los jugadores fuertes: calcular sin mover las piezas y ver venir las ideas del rival."
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-3">
          <p className="text-xs text-slate-500">Visualización</p>
          <p className="text-lg font-bold">{rate(stats?.visualization)}</p>
        </Card>
        <Card className="p-3">
          <p className="text-xs text-slate-500">Amenazas detectadas</p>
          <p className="text-lg font-bold">{rate(stats?.threats)}</p>
        </Card>
        <Card className="p-3">
          <p className="text-xs text-slate-500">Jugadas del ordenador adivinadas</p>
          <p className="text-lg font-bold">{rate(stats?.predictions)}</p>
        </Card>
      </div>
      <div role="tablist" aria-label="Modalidad" className="mb-6 flex flex-wrap gap-1 rounded-lg bg-slate-200 p-1 sm:inline-flex dark:bg-slate-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setParams(t.id === 'visualizacion' ? {} : { modo: t.id })}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === t.id ? 'bg-white shadow dark:bg-slate-600' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {error && <Feedback tone="error">No se pudieron cargar las posiciones: {error}</Feedback>}
      {!puzzles && !error && <p>Cargando posiciones…</p>}
      {puzzles && (tab === 'visualizacion' ? <VisualizationTrainer puzzles={puzzles} /> : <ThreatTrainer puzzles={puzzles} />)}
      <p className="mt-6 text-sm text-slate-500">
        Consejo: en tus partidas contra el ordenador, activa «Adivina la jugada del ordenador» y usa el botón «¿Qué amenaza?» para
        practicar la anticipación en partida real.
      </p>
    </div>
  );
}
