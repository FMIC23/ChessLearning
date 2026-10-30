import { describe, expect, it } from 'vitest';
import { orderFromFilename, parseFrontmatter, parseLesson, parseSteps, slugFromFilename } from './parser';

const SAMPLE = `---
title: La torre
summary: Movimientos de la torre
tags: piezas, basico
minutes: 4
---

Texto inicial.

\`\`\`tablero
{ "fen": "8/8/8/8/3R4/8/8/8 w - - 0 1" }
\`\`\`

Más texto.

\`\`\`ejercicio
{ "type": "quiz", "prompt": "¿Salta?", "options": ["Sí", "No"], "answer": 1 }
\`\`\`

\`\`\`ejercicio
{ "type": "squares", "prompt": "Marca e4", "targets": ["e4"] }
\`\`\`
`;

describe('parser de lecciones', () => {
  it('lee el frontmatter', () => {
    const { data, body } = parseFrontmatter(SAMPLE);
    expect(data.title).toBe('La torre');
    expect(data.minutes).toBe('4');
    expect(body.startsWith('\nTexto inicial.')).toBe(true);
  });

  it('sin frontmatter devuelve el texto completo', () => {
    expect(parseFrontmatter('Hola').body).toBe('Hola');
  });

  it('divide el cuerpo en pasos', () => {
    const steps = parseSteps(parseFrontmatter(SAMPLE).body);
    expect(steps.map((s) => s.kind)).toEqual(['text', 'board', 'text', 'exercise', 'exercise']);
    const exercises = steps.filter((s) => s.kind === 'exercise');
    expect(exercises.map((s) => (s.kind === 'exercise' ? s.index : -1))).toEqual([0, 1]);
  });

  it('informa del JSON no válido', () => {
    expect(() => parseSteps('```ejercicio\n{ mal }\n```', 'x.md')).toThrow(/JSON no válido.*x\.md/);
  });

  it('construye la lección con id, orden y etiquetas', () => {
    const lesson = parseLesson(SAMPLE, 'content/lessons/n0/03-la-torre.md', 'fundamentos');
    expect(lesson).toMatchObject({
      id: 'fundamentos/la-torre',
      slug: 'la-torre',
      order: 3,
      title: 'La torre',
      minutes: 4,
      tags: ['piezas', 'basico'],
      exerciseCount: 2,
    });
  });

  it('exige título', () => {
    expect(() => parseLesson('---\nsummary: x\n---\nhola', 'a/01-x.md', 'n')).toThrow(/título/);
  });

  it('extrae orden y slug del nombre de archivo', () => {
    expect(orderFromFilename('a/b/12-mate-pastor.md')).toBe(12);
    expect(slugFromFilename('a/b/12-mate-pastor.md')).toBe('mate-pastor');
  });
});
