import { describe, expect, it } from 'vitest';
import { acceptsRow, balancedSelection, lichessRowToPuzzle, parseLichessRow, type LichessRow } from './lichess';
import { normalizePuzzle } from './normalize';

const LINE =
  '00sHx,q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17,e8d7 a2e6 d7d8 f7f8,1760,80,83,72,mate mateIn2 middlegame short,https://lichess.org/yyznGmXs/black#34,Italian_Game';

describe('importación de Lichess', () => {
  it('interpreta una fila del CSV', () => {
    const row = parseLichessRow(LINE);
    expect(row).toMatchObject({ id: '00sHx', rating: 1760, popularity: 83, themes: ['mate', 'mateIn2', 'middlegame', 'short'] });
    expect(parseLichessRow('PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags')).toBeNull();
  });

  it('convierte la fila en un problema jugable (el rival mueve primero)', () => {
    const puzzle = normalizePuzzle(lichessRowToPuzzle(parseLichessRow(LINE)!));
    expect(puzzle.solution).toEqual(['a2e6', 'd7d8', 'f7f8']);
    expect(puzzle.setup?.move).toBe('e8d7');
    expect(puzzle.source).toBe('lichess');
  });

  it('filtra por dificultad y popularidad', () => {
    const row = parseLichessRow(LINE)!;
    const f = { min: 600, max: 2400, minPopularity: 80, minPlays: 50, maxDeviation: 90 };
    expect(acceptsRow(row, f)).toBe(true);
    expect(acceptsRow(row, { ...f, max: 1500 })).toBe(false);
    expect(acceptsRow(row, { ...f, minPopularity: 90 })).toBe(false);
  });

  it('reparte la selección entre tramos de dificultad', () => {
    const rows: LichessRow[] = Array.from({ length: 100 }, (_, i) => ({
      id: String(i),
      fen: '',
      moves: ['a', 'b'],
      rating: 600 + (i % 10) * 100,
      ratingDeviation: 70,
      popularity: 90,
      plays: 1000,
      themes: [i % 2 ? 'fork' : 'pin'],
      url: '',
    }));
    const selected = balancedSelection(rows, 20, 600, 1599);
    expect(selected).toHaveLength(20);
    const bands = new Set(selected.map((r) => r.rating));
    expect(bands.size).toBe(10);
  });
});
