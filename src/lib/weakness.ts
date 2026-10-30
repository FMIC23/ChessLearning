import type { LessonRecord } from './progress';
import type { OpeningStat } from './openings/trainer';
import { META_THEMES, themeLabel } from './puzzles/themes';

export interface WeakPoint {
  id: string;
  title: string;
  detail: string;
  /** Ruta de la app donde practicar. */
  link: string;
  linkLabel: string;
  /** 0–1: cuanto mayor, más urgente. */
  severity: number;
}

export interface WeaknessInput {
  themeStats: Record<string, { attempts: number; successes: number }>;
  /** Resúmenes de las partidas analizadas del alumno (más recientes primero). */
  games: { phaseErrors: Record<string, number>; blunders: number }[];
  lessons: Record<string, LessonRecord>;
  lessonTitles: Record<string, { title: string; path: string }>;
  openings: Record<string, OpeningStat>;
  openingNames: Record<string, string>;
}

const MIN_ATTEMPTS = 3;

const PHASE_LINKS: Record<string, { link: string; label: string; name: string }> = {
  apertura: { link: '/aperturas', label: 'Entrenar aperturas', name: 'la apertura' },
  'medio juego': { link: '/aprender/estrategia', label: 'Estudiar estrategia', name: 'el medio juego' },
  final: { link: '/aprender/finales', label: 'Estudiar finales', name: 'el final' },
};

/** Detecta los puntos débiles a partir de problemas, partidas, lecciones y aperturas. */
export function detectWeakPoints(input: WeaknessInput, limit = 6): WeakPoint[] {
  const points: WeakPoint[] = [];

  // 1. Temas tácticos con bajo porcentaje de acierto.
  for (const [theme, stat] of Object.entries(input.themeStats)) {
    if (META_THEMES.has(theme) || stat.attempts < MIN_ATTEMPTS) continue;
    const rate = stat.successes / stat.attempts;
    if (rate < 0.6) {
      points.push({
        id: `tema-${theme}`,
        title: `Táctica: ${themeLabel(theme)}`,
        detail: `Aciertas el ${Math.round(rate * 100)} % (${stat.successes} de ${stat.attempts}).`,
        link: `/tactica?tema=${encodeURIComponent(theme)}`,
        linkLabel: 'Practicar este tema',
        severity: (0.6 - rate) / 0.6 * Math.min(1, stat.attempts / 10) + 0.3,
      });
    }
  }

  // 2. Fases de la partida donde se acumulan los errores (últimas 10 partidas analizadas).
  const recent = input.games.slice(0, 10);
  if (recent.length >= 2) {
    const totals: Record<string, number> = {};
    for (const g of recent) for (const [phase, n] of Object.entries(g.phaseErrors)) totals[phase] = (totals[phase] ?? 0) + n;
    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    for (const [phase, n] of Object.entries(totals)) {
      const info = PHASE_LINKS[phase];
      if (!info || sum === 0) continue;
      const share = n / sum;
      if (n >= 3 && share >= 0.4) {
        points.push({
          id: `fase-${phase}`,
          title: `Errores en ${info.name}`,
          detail: `El ${Math.round(share * 100)} % de tus errores e imprecisiones en las últimas partidas.`,
          link: info.link,
          linkLabel: info.label,
          severity: 0.4 + share * 0.5,
        });
      }
    }
    const blunders = recent.reduce((a, g) => a + g.blunders, 0) / recent.length;
    if (blunders >= 1) {
      points.push({
        id: 'errores-graves',
        title: 'Errores graves frecuentes',
        detail: `Cometes ${blunders.toFixed(1)} errores graves por partida. Antes de mover, revisa jaques, capturas y amenazas.`,
        link: '/tactica?tema=hangingPiece',
        linkLabel: 'Practicar piezas colgadas',
        severity: Math.min(1, 0.5 + blunders * 0.15),
      });
    }
  }

  // 3. Lecciones completadas con muchos errores.
  for (const [id, record] of Object.entries(input.lessons)) {
    const info = input.lessonTitles[id];
    if (!info || record.mistakes < 3) continue;
    points.push({
      id: `leccion-${id}`,
      title: `Repasa: ${info.title}`,
      detail: `La completaste con ${record.mistakes} errores.`,
      link: info.path,
      linkLabel: 'Repasar la lección',
      severity: Math.min(0.6, 0.2 + record.mistakes * 0.05),
    });
  }

  // 4. Aperturas con líneas falladas recientemente.
  for (const [id, stat] of Object.entries(input.openings)) {
    const failing = Object.values(stat.lines).filter((l) => l.attempts > 0 && l.streak === 0).length;
    if (failing === 0) continue;
    points.push({
      id: `apertura-${id}`,
      title: `Apertura: ${input.openingNames[id] ?? id}`,
      detail: `${failing} línea${failing === 1 ? '' : 's'} sin dominar.`,
      link: `/aperturas/${id}?modo=test`,
      linkLabel: 'Repasar en modo test',
      severity: Math.min(0.55, 0.25 + failing * 0.08),
    });
  }

  return points.sort((a, b) => b.severity - a.severity).slice(0, limit);
}
