/**
 * Importa una selección de la base de problemas de Lichess (licencia CC0).
 *
 * 1. Descarga lichess_db_puzzle.csv.zst de https://database.lichess.org/#puzzles
 * 2. Descomprímelo: `zstd -d lichess_db_puzzle.csv.zst`
 * 3. npm run puzzles:import -- --input lichess_db_puzzle.csv [--count 2000] [--min 600] [--max 2400]
 *
 * Genera content/puzzles/lichess.json, que la app carga junto al banco propio.
 */
import { createReadStream, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acceptsRow, balancedSelection, lichessRowToPuzzle, parseLichessRow, type LichessRow } from '../src/lib/puzzles/lichess';
import { validatePuzzle } from '../src/lib/puzzles/normalize';

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

async function main() {
  const input = arg('input');
  if (!input) {
    console.error('Uso: npm run puzzles:import -- --input lichess_db_puzzle.csv [--count 2000] [--min 600] [--max 2400]');
    process.exit(1);
  }
  const count = Number(arg('count', '2000'));
  const filter = {
    min: Number(arg('min', '600')),
    max: Number(arg('max', '2400')),
    minPopularity: Number(arg('popularity', '85')),
    minPlays: Number(arg('plays', '1000')),
    maxDeviation: Number(arg('deviation', '90')),
  };
  const output = arg('output', join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'puzzles', 'lichess.json'))!;
  // Para no cargar millones de filas en memoria se guarda un máximo de candidatos por tramo.
  const maxPerBand = Math.ceil(count / ((filter.max - filter.min) / 100)) * 20;
  const bandCounts = new Map<number, number>();
  const candidates: LichessRow[] = [];
  let read = 0;

  const rl = createInterface({ input: createReadStream(input), crlfDelay: Infinity });
  for await (const line of rl) {
    read++;
    const row = parseLichessRow(line);
    if (!row || !acceptsRow(row, filter)) continue;
    const band = Math.floor(row.rating / 100);
    const n = bandCounts.get(band) ?? 0;
    if (n >= maxPerBand) continue;
    bandCounts.set(band, n + 1);
    candidates.push(row);
    if (read % 500_000 === 0) console.log(`  ${read.toLocaleString('es-ES')} filas leídas…`);
  }

  const selected = balancedSelection(candidates, count, filter.min, filter.max).map(lichessRowToPuzzle);
  const valid = selected.filter((p) => validatePuzzle(p).length === 0);
  writeFileSync(output, JSON.stringify(valid, null, 0) + '\n');
  console.log(`✓ ${valid.length} problemas guardados en ${output} (de ${candidates.length} candidatos, ${read.toLocaleString('es-ES')} filas)`);
}

void main();
