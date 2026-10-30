import type { Level, LevelMeta } from '@/types/lesson';
import { parseLesson } from '@/lib/lessons/parser';

// El contenido vive en /content/lessons: cada carpeta es un nivel con un level.json y lecciones .md.
const levelFiles = import.meta.glob<LevelMeta>('../../content/lessons/*/level.json', { eager: true, import: 'default' });
const lessonFiles = import.meta.glob<string>('../../content/lessons/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function folderOf(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 2] ?? '';
}

export function buildLevels(levelsByFolder: Record<string, LevelMeta>, lessonsByPath: Record<string, string>): Level[] {
  const levels = Object.entries(levelsByFolder).map(([path, meta]) => {
    const folder = folderOf(path);
    const lessons = Object.entries(lessonsByPath)
      .filter(([lessonPath]) => folderOf(lessonPath) === folder)
      .map(([lessonPath, raw]) => parseLesson(raw, lessonPath, meta.id))
      .sort((a, b) => a.order - b.order);
    return { ...meta, lessons };
  });
  return levels.sort((a, b) => a.number - b.number);
}

export const LEVELS: Level[] = buildLevels(levelFiles, lessonFiles);

export function findLevel(levelId: string): Level | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

export function findLesson(levelId: string, slug: string) {
  const level = findLevel(levelId);
  const lesson = level?.lessons.find((l) => l.slug === slug);
  return level && lesson ? { level, lesson } : undefined;
}

export function allLessons() {
  return LEVELS.flatMap((level) => level.lessons);
}
