import { describe, expect, it } from 'vitest';
import { initialProgress } from '@/store/progress';
import { BackupError, createBackup, parseBackup } from './backup';

describe('copia de seguridad del progreso', () => {
  it('exporta e importa el progreso sin pérdidas', () => {
    const progress = { ...initialProgress(), puzzleRating: 1234, lessons: { 'a/b': { completedAt: 'x', mistakes: 1, times: 1 } } };
    const text = JSON.stringify(createBackup(progress, { theme: 'dark' }));
    const restored = parseBackup(text, initialProgress());
    expect(restored.progress).toEqual(progress);
    expect(restored.settings).toEqual({ theme: 'dark' });
  });

  it('completa los campos que falten con los valores por defecto', () => {
    const text = JSON.stringify({ app: 'escuela-de-ajedrez', version: 1, progress: { puzzleRating: 900 } });
    const restored = parseBackup(text, initialProgress());
    expect(restored.progress.puzzleRating).toBe(900);
    expect(restored.progress.games).toEqual([]);
  });

  it('rechaza archivos no válidos con mensajes claros', () => {
    expect(() => parseBackup('no json', initialProgress())).toThrow(BackupError);
    expect(() => parseBackup('{"app":"otra"}', initialProgress())).toThrow(/no es una copia/);
    expect(() => parseBackup('{"app":"escuela-de-ajedrez","version":99,"progress":{}}', initialProgress())).toThrow(/más reciente/);
    expect(() => parseBackup('{"app":"escuela-de-ajedrez","version":1,"progress":{"games":5}}', initialProgress())).toThrow(/games/);
  });
});
