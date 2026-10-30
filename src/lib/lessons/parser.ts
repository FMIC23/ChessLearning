import type { BoardDiagram, Exercise, Lesson, LessonStep } from '../../types/lesson';

export interface Frontmatter {
  [key: string]: string;
}

/** Separa el frontmatter (líneas `clave: valor` entre `---`) del cuerpo Markdown. */
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { data: {}, body: text };
  const data: Frontmatter = {};
  for (const line of (match[1] ?? '').split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1 || !line.trim()) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = value;
  }
  return { data, body: text.slice(match[0].length) };
}

const BLOCK_RE = /```(tablero|ejercicio)[^\n]*\n([\s\S]*?)```/g;

export class LessonParseError extends Error {}

/** Divide el cuerpo en pasos: texto, diagramas (```tablero) y ejercicios (```ejercicio). */
export function parseSteps(body: string, source = 'lección'): LessonStep[] {
  const steps: LessonStep[] = [];
  let last = 0;
  let exerciseIndex = 0;
  const pushText = (markdown: string) => {
    if (markdown.trim()) steps.push({ kind: 'text', markdown: markdown.trim() });
  };
  for (const match of body.matchAll(BLOCK_RE)) {
    pushText(body.slice(last, match.index));
    last = (match.index ?? 0) + match[0].length;
    const [, kind, json] = match;
    let data: unknown;
    try {
      data = JSON.parse(json ?? '');
    } catch (error) {
      throw new LessonParseError(`JSON no válido en un bloque ${kind} de ${source}: ${(error as Error).message}`);
    }
    if (kind === 'tablero') {
      steps.push({ kind: 'board', diagram: data as BoardDiagram });
    } else {
      steps.push({ kind: 'exercise', exercise: data as Exercise, index: exerciseIndex++ });
    }
  }
  pushText(body.slice(last));
  return steps;
}

/** Extrae el número de orden de un nombre de archivo tipo "03-la-torre.md". */
export function orderFromFilename(path: string): number {
  const name = path.split('/').pop() ?? '';
  const match = /^(\d+)/.exec(name);
  return match ? Number(match[1]) : 0;
}

export function slugFromFilename(path: string): string {
  const name = (path.split('/').pop() ?? '').replace(/\.md$/, '');
  return name.replace(/^\d+-/, '');
}

/** Convierte un archivo Markdown de lección en un objeto Lesson. */
export function parseLesson(raw: string, path: string, levelId: string): Lesson {
  const { data, body } = parseFrontmatter(raw);
  const steps = parseSteps(body, path);
  const exerciseCount = steps.filter((s) => s.kind === 'exercise').length;
  const slug = data.slug ?? slugFromFilename(path);
  const id = `${levelId}/${slug}`;
  const title = data.title;
  if (!title) throw new LessonParseError(`Falta el título (title) en ${path}`);
  return {
    id,
    slug,
    levelId,
    order: data.order ? Number(data.order) : orderFromFilename(path),
    title,
    summary: data.summary ?? '',
    minutes: data.minutes ? Number(data.minutes) : Math.max(3, exerciseCount * 2),
    tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    steps,
    exerciseCount,
  };
}
