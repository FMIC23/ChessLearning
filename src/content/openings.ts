import type { Opening, OpeningData } from '@/types/opening';
import { parseOpening } from '@/lib/openings/tree';

const openingFiles = import.meta.glob<OpeningData>('../../content/openings/*.json', { eager: true, import: 'default' });

export const OPENINGS: Opening[] = Object.entries(openingFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([path, data]) => {
    try {
      return [parseOpening(data)];
    } catch (error) {
      console.error(`Apertura no válida (${path}):`, (error as Error).message);
      return [];
    }
  });

export const OPENING_GROUP_ORDER = [
  'Con blancas: 1.e4',
  'Con blancas: 1.d4',
  'Con negras: contra 1.e4',
  'Con negras: contra 1.d4',
  'Con negras: otras aperturas',
];

export function findOpening(id: string): Opening | undefined {
  return OPENINGS.find((o) => o.id === id);
}

export function openingsByGroup(): [string, Opening[]][] {
  const groups = new Map<string, Opening[]>();
  for (const o of OPENINGS) groups.set(o.group, [...(groups.get(o.group) ?? []), o]);
  const rank = (g: string) => (OPENING_GROUP_ORDER.indexOf(g) === -1 ? 99 : OPENING_GROUP_ORDER.indexOf(g));
  return [...groups.entries()].sort((a, b) => rank(a[0]) - rank(b[0]));
}
