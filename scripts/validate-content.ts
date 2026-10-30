/**
 * Valida todo el contenido didáctico:
 *  - estructura de lecciones, FEN, legalidad de las soluciones (siempre);
 *  - con --engine, comprueba con Stockfish que las jugadas del alumno son las mejores
 *    (o casi) en los ejercicios de jugadas, y en los problemas de táctica.
 *
 * Uso: npm run validate:content [-- --engine]
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseLesson } from '../src/lib/lessons/parser';
import { validateLevels } from '../src/lib/lessons/validate';
import { applyMove, isValidFen } from '../src/lib/chess';
import type { Level, LevelMeta, MovesExercise } from '../src/types/lesson';
import type { PuzzleData } from '../src/types/puzzle';
import type { OpeningData } from '../src/types/opening';
import { normalizePuzzle, validatePuzzle } from '../src/lib/puzzles/normalize';
import { validateOpening } from '../src/lib/openings/tree';
import { NodeEngine, scoreToCp } from './lib/node-engine';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lessonsDir = join(root, 'content', 'lessons');
const puzzlesDir = join(root, 'content', 'puzzles');
const openingsDir = join(root, 'content', 'openings');

function readJsonFiles<T>(dir: string): { file: string; data: T }[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((file) => ({ file, data: JSON.parse(readFileSync(join(dir, file), 'utf8')) as T }));
}

function loadPuzzles(): PuzzleData[] {
  return readJsonFiles<PuzzleData[]>(puzzlesDir).flatMap(({ data }) => data);
}

function loadOpenings(): OpeningData[] {
  return readJsonFiles<OpeningData>(openingsDir).map(({ data }) => data);
}
const useEngine = process.argv.includes('--engine');
const depth = Number(process.argv.find((a) => a.startsWith('--depth='))?.split('=')[1] ?? 16);

function loadLevels(): Level[] {
  return readdirSync(lessonsDir)
    .filter((d) => existsSync(join(lessonsDir, d, 'level.json')))
    .map((dir) => {
      const meta = JSON.parse(readFileSync(join(lessonsDir, dir, 'level.json'), 'utf8')) as LevelMeta;
      const lessons = readdirSync(join(lessonsDir, dir))
        .filter((f) => f.endsWith('.md'))
        .map((f) => parseLesson(readFileSync(join(lessonsDir, dir, f), 'utf8'), `${dir}/${f}`, meta.id))
        .sort((a, b) => a.order - b.order);
      return { ...meta, lessons };
    })
    .sort((a, b) => a.number - b.number);
}

async function checkWithEngine(engine: NodeEngine, label: string, ex: MovesExercise): Promise<string[]> {
  const warnings: string[] = [];
  if (!isValidFen(ex.fen)) return warnings; // posiciones didácticas sin reyes: el motor no las admite
  if (ex.engine === false) return warnings;
  let fen = ex.fen;
  for (let ply = 0; ply < ex.solution.length; ply++) {
    const move = ex.solution[ply] ?? '';
    const played = applyMove(fen, move);
    if (!played) break;
    if (ply % 2 === 0) {
      const [best, second] = await engine.analyse(fen, depth, 2);
      if (best) {
        const bestCp = scoreToCp(best.score);
        const after = await engine.analyse(played.fen, depth - 2, 1);
        const playedCp = after[0] ? -scoreToCp(after[0].score) : 0;
        const isBest = best.bestMove === `${played.move.from}${played.move.to}${played.move.promotion ?? ''}`;
        const lastPly = ply >= ex.solution.length - 1;
        const mateGoal = ex.goal === 'mate';
        // En ejercicios de mate se tolera otro camino al mate; en el resto, una pérdida pequeña.
        if (!isBest && !(mateGoal && playedCp > 9000) && bestCp - playedCp > 60 && !(lastPly && playedCp > 9000)) {
          warnings.push(
            `${label}: jugada ${ply + 1} (${played.move.san}) no es la mejor; el motor prefiere ${best.bestMove} (${bestCp} vs ${playedCp})`,
          );
        }
        // Unicidad: si hay otra jugada igual de buena, el alumno podría encontrarla y fallar.
        if (isBest && second && !mateGoal && ply === 0 && !ex.accept?.length) {
          const secondCp = scoreToCp(second.score);
          if (bestCp < 9000 && bestCp - secondCp < 50 && Math.abs(bestCp) < 2000) {
            warnings.push(`${label}: solución poco única; ${second.bestMove} es casi igual (${bestCp} vs ${secondCp})`);
          }
        }
      }
    }
    fen = played.fen;
  }
  return warnings;
}

async function main() {
  const levels = loadLevels();
  const errors = validateLevels(levels);
  const lessonCount = levels.reduce((n, l) => n + l.lessons.length, 0);
  const exerciseCount = levels.reduce((n, l) => n + l.lessons.reduce((m, x) => m + x.exerciseCount, 0), 0);
  console.log(`Niveles: ${levels.length} · Lecciones: ${lessonCount} · Ejercicios: ${exerciseCount}`);
  for (const level of levels) console.log(`  Nivel ${level.number} (${level.id}): ${level.lessons.length} lecciones`);

  const puzzles = loadPuzzles();
  const ids = new Set<string>();
  for (const p of puzzles) {
    if (ids.has(p.id)) errors.push(`id de problema duplicado: ${p.id}`);
    ids.add(p.id);
    errors.push(...validatePuzzle(p));
  }
  const openings = loadOpenings();
  for (const o of openings) errors.push(...validateOpening(o));
  console.log(`Problemas: ${puzzles.length} · Aperturas: ${openings.length} (${openings.reduce((n, o) => n + o.lines.length, 0)} líneas)`);

  const fatal = errors.filter((e) => !(process.argv.includes('--allow-empty') && e.includes('no tiene lecciones')));
  if (fatal.length) {
    errors.length = 0;
    errors.push(...fatal);
    console.error(`\n✗ ${errors.length} errores de estructura:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log('✓ Estructura y legalidad correctas');

  if (!useEngine) return;
  const engine = new NodeEngine();
  await engine.init();
  const filter = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1];
  const warnings: string[] = [];
  for (const level of levels) {
    for (const lesson of level.lessons) {
      if (filter && !lesson.id.includes(filter)) continue;
      for (const step of lesson.steps) {
        if (step.kind === 'exercise' && step.exercise.type === 'moves') {
          warnings.push(...(await checkWithEngine(engine, `${lesson.id} #${step.index + 1}`, step.exercise)));
        }
      }
    }
  }
  if (!filter || filter === 'problemas') {
    for (const data of puzzles) {
      if (data.source === 'lichess') continue;
      const p = normalizePuzzle(data);
      const ex: MovesExercise = {
        type: 'moves',
        fen: p.fen,
        solution: p.solution,
        prompt: '',
        goal: p.themes.some((t) => t.startsWith('mate')) ? 'mate' : undefined,
      };
      warnings.push(...(await checkWithEngine(engine, `problema ${p.id}`, ex)));
    }
  }
  engine.quit();
  if (warnings.length) {
    console.warn(`\n⚠ ${warnings.length} avisos del motor:`);
    for (const w of warnings) console.warn(`  - ${w}`);
    process.exitCode = 2;
  } else {
    console.log('✓ Todas las soluciones coinciden con el motor');
  }
}

void main();
