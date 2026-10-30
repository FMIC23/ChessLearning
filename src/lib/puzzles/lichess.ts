import type { PuzzleData } from '../../types/puzzle';

/**
 * Fila del CSV de la base de problemas de Lichess (https://database.lichess.org/#puzzles):
 * PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
 */
export interface LichessRow {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  ratingDeviation: number;
  popularity: number;
  plays: number;
  themes: string[];
  url: string;
}

export function parseLichessRow(line: string): LichessRow | null {
  const cols = line.split(',');
  if (cols.length < 9 || cols[0] === 'PuzzleId') return null;
  const [id, fen, moves, rating, deviation, popularity, plays, themes, url] = cols;
  if (!id || !fen || !moves) return null;
  return {
    id,
    fen,
    moves: moves.split(' ').filter(Boolean),
    rating: Number(rating),
    ratingDeviation: Number(deviation),
    popularity: Number(popularity),
    plays: Number(plays),
    themes: (themes ?? '').split(' ').filter(Boolean),
    url: url ?? '',
  };
}

export function lichessRowToPuzzle(row: LichessRow): PuzzleData {
  return {
    id: `lichess-${row.id}`,
    fen: row.fen,
    moves: row.moves,
    rating: row.rating,
    themes: row.themes,
    opponentFirst: true,
    source: 'lichess',
    url: row.url,
  };
}

export interface ImportFilter {
  min: number;
  max: number;
  minPopularity: number;
  minPlays: number;
  maxDeviation: number;
}

export function acceptsRow(row: LichessRow, f: ImportFilter): boolean {
  return (
    row.rating >= f.min &&
    row.rating <= f.max &&
    row.popularity >= f.minPopularity &&
    row.plays >= f.minPlays &&
    row.ratingDeviation <= f.maxDeviation &&
    row.moves.length >= 2 &&
    row.moves.length % 2 === 0
  );
}

/**
 * Selección equilibrada: reparte el total entre tramos de dificultad de 100 puntos y,
 * dentro de cada tramo, alterna temas para que haya variedad.
 */
export function balancedSelection(rows: LichessRow[], count: number, min: number, max: number): LichessRow[] {
  const bandSize = 100;
  const bands = new Map<number, LichessRow[]>();
  for (const row of rows) {
    const band = Math.floor((row.rating - min) / bandSize);
    const list = bands.get(band) ?? [];
    list.push(row);
    bands.set(band, list);
  }
  const bandCount = Math.max(1, Math.ceil((max - min + 1) / bandSize));
  const perBand = Math.ceil(count / bandCount);
  const result: LichessRow[] = [];
  for (const list of [...bands.entries()].sort((a, b) => a[0] - b[0]).map(([, l]) => l)) {
    const byTheme = new Map<string, LichessRow[]>();
    for (const row of [...list].sort((a, b) => b.popularity - a.popularity)) {
      const key = row.themes.find((t) => !['short', 'long', 'veryLong', 'oneMove', 'crushing', 'advantage', 'middlegame', 'endgame', 'opening'].includes(t)) ?? 'otros';
      const bucket = byTheme.get(key) ?? [];
      bucket.push(row);
      byTheme.set(key, bucket);
    }
    const queues = [...byTheme.values()];
    const picked: LichessRow[] = [];
    while (picked.length < perBand && queues.some((q) => q.length > 0)) {
      for (const q of queues) {
        const next = q.shift();
        if (next && picked.length < perBand) picked.push(next);
      }
    }
    result.push(...picked);
  }
  return result.slice(0, count);
}
