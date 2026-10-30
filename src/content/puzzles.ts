import type { Puzzle, PuzzleData } from '@/types/puzzle';
import { normalizePuzzle } from '@/lib/puzzles/normalize';

// Los problemas se cargan bajo demanda (en un chunk aparte) para no engordar la carga inicial.
const puzzleFiles = import.meta.glob<PuzzleData[]>('../../content/puzzles/*.json', { import: 'default' });

let cache: Promise<Puzzle[]> | null = null;

export function loadPuzzles(): Promise<Puzzle[]> {
  cache ??= Promise.all(Object.values(puzzleFiles).map((load) => load())).then((files) => {
    const seen = new Set<string>();
    const puzzles: Puzzle[] = [];
    for (const data of files.flat()) {
      if (seen.has(data.id)) continue;
      seen.add(data.id);
      try {
        puzzles.push(normalizePuzzle(data));
      } catch (error) {
        console.warn((error as Error).message);
      }
    }
    return puzzles.sort((a, b) => a.rating - b.rating);
  });
  return cache;
}
