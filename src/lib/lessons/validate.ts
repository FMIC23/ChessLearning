import type { Exercise, Lesson, Level } from '../../types/lesson';
import { applyMove, createGame, isValidFen } from '../chess';
import { resolveTargets } from './exercise';

const SQUARE_RE = /^[a-h][1-8]$/;

/** Valida un ejercicio y devuelve la lista de errores encontrados. */
export function validateExercise(exercise: Exercise): string[] {
  const errors: string[] = [];
  if (!exercise.prompt) errors.push('falta el enunciado (prompt)');
  const fen = 'fen' in exercise ? exercise.fen : undefined;
  if (fen !== undefined && !isValidFen(fen, { allowMissingKings: true })) {
    errors.push(`FEN no válido: ${fen}`);
    return errors;
  }
  switch (exercise.type) {
    case 'moves': {
      if (!exercise.solution?.length) {
        errors.push('la solución está vacía');
        break;
      }
      if (exercise.solution.length % 2 === 0) errors.push('la solución debe terminar con una jugada del alumno');
      let current = exercise.fen;
      exercise.solution.forEach((move, i) => {
        if (errors.length) return;
        const result = applyMove(current, move);
        if (!result) errors.push(`jugada ${i + 1} ilegal: ${move}`);
        else current = result.fen;
      });
      if (!errors.length && exercise.goal === 'mate' && !createGame(current).isCheckmate()) {
        errors.push('el objetivo es mate pero la solución no termina en mate');
      }
      for (const alt of exercise.accept ?? []) {
        if (!applyMove(exercise.fen, alt)) errors.push(`alternativa ilegal: ${alt}`);
      }
      break;
    }
    case 'squares': {
      try {
        const targets = resolveTargets(exercise);
        if (targets.length === 0) errors.push('no hay casillas objetivo');
        for (const t of targets) if (!SQUARE_RE.test(t)) errors.push(`casilla no válida: ${t}`);
      } catch (error) {
        errors.push((error as Error).message);
      }
      break;
    }
    case 'quiz': {
      if (!Array.isArray(exercise.options) || exercise.options.length < 2) errors.push('se necesitan al menos 2 opciones');
      else if (!Number.isInteger(exercise.answer) || exercise.answer < 0 || exercise.answer >= exercise.options.length) {
        errors.push(`respuesta fuera de rango: ${exercise.answer}`);
      }
      break;
    }
    case 'play': {
      if (!['mate', 'promote', 'draw', 'win'].includes(exercise.goal)) errors.push(`objetivo desconocido: ${exercise.goal}`);
      if (!isValidFen(exercise.fen)) errors.push('las posiciones de práctica deben ser legales (con ambos reyes)');
      break;
    }
    default:
      errors.push(`tipo de ejercicio desconocido: ${(exercise as { type: string }).type}`);
  }
  return errors;
}

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];
  if (!lesson.title) errors.push(`${lesson.id}: falta el título`);
  for (const step of lesson.steps) {
    if (step.kind === 'exercise') {
      for (const e of validateExercise(step.exercise)) errors.push(`${lesson.id} · ejercicio ${step.index + 1}: ${e}`);
    }
    if (step.kind === 'board' && !isValidFen(step.diagram.fen, { allowMissingKings: true })) {
      errors.push(`${lesson.id}: diagrama con FEN no válido (${step.diagram.fen})`);
    }
  }
  return errors;
}

export function validateLevels(levels: Level[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const level of levels) {
    if (level.lessons.length === 0) errors.push(`${level.id}: el nivel no tiene lecciones`);
    for (const lesson of level.lessons) {
      if (ids.has(lesson.id)) errors.push(`id de lección duplicado: ${lesson.id}`);
      ids.add(lesson.id);
      errors.push(...validateLesson(lesson));
    }
  }
  return errors;
}
