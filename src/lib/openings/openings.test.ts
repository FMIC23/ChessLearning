import { describe, expect, it } from 'vitest';
import type { OpeningData } from '@/types/opening';
import { buildOpeningTree, findNode, isStudentTurn, parseOpening, validateOpening } from './tree';
import { checkStudentMove, chooseLine, nextTestStep, openingMastery, updateLineStat, type OpeningStat } from './trainer';

const ITALIAN: OpeningData = {
  id: 'italiana',
  name: 'Italiana',
  color: 'white',
  group: 'Con blancas: 1.e4',
  summary: '',
  ideas: [],
  lines: [
    { name: 'Giuoco Piano', moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3', comments: { '5': 'El alfil apunta a f7.', '7': 'Prepara d4.' } },
    { name: 'Dos caballos', moves: 'e4 e5 Nf3 Nc6 Bc4 Nf6 d3', comments: { '6': 'Ataca e4.' } },
    { name: 'Petrov', moves: 'e4 e5 Nf3 Nf6 Nxe5' },
  ],
};

describe('árbol de aperturas', () => {
  const tree = buildOpeningTree(ITALIAN);

  it('fusiona los prefijos comunes', () => {
    expect(tree.children).toHaveLength(1);
    const afterNf3 = findNode(tree, ['e4', 'e5', 'Nf3'])!;
    expect(afterNf3.children.map((c) => c.san)).toEqual(['Nc6', 'Nf6']);
    expect(findNode(tree, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'])!.children.map((c) => c.san)).toEqual(['Bc5', 'Nf6']);
    expect(findNode(tree, ['e4', 'e5', 'Nf3', 'Nc6'])!.lines).toEqual([0, 1]);
  });

  it('asigna comentarios por media jugada', () => {
    expect(findNode(tree, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'])!.comment).toBe('El alfil apunta a f7.');
    expect(findNode(tree, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6'])!.comment).toBe('Ataca e4.');
  });

  it('sabe a quién le toca', () => {
    expect(isStudentTurn(tree, 'white')).toBe(true);
    expect(isStudentTurn(tree.children[0]!, 'white')).toBe(false);
  });

  it('valida líneas ilegales, comentarios fuera de rango y el final de las líneas', () => {
    expect(validateOpening(ITALIAN)).toEqual([]);
    const bad: OpeningData = { ...ITALIAN, lines: [{ name: 'x', moves: 'e4 e5 Ke3', comments: { '9': 'x' } }] };
    expect(validateOpening(bad).join()).toMatch(/ilegal/);
    const even: OpeningData = { ...ITALIAN, lines: [{ name: 'x', moves: 'e4 e5', comments: { '9': 'x' } }] };
    const errors = validateOpening(even).join();
    expect(errors).toMatch(/fuera de rango/);
    expect(errors).toMatch(/debe terminar/);
  });

  it('parseOpening devuelve el árbol', () => {
    expect(parseOpening(ITALIAN).tree.children[0]?.san).toBe('e4');
  });
});

describe('entrenador de aperturas', () => {
  const opening = parseOpening(ITALIAN);

  it('recorre una línea alternando rival y alumno', () => {
    expect(nextTestStep(opening.tree, 0, 'white')).toMatchObject({ kind: 'student' });
    const e4 = opening.tree.children[0]!;
    const step = nextTestStep(e4, 2, 'white');
    expect(step.kind === 'opponent' && step.node.san).toBe('e5');
    const end = findNode(opening.tree, ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5'])!;
    expect(nextTestStep(end, 2, 'white').kind).toBe('done');
  });

  it('acepta la jugada de la línea y rechaza las demás', () => {
    expect(checkStudentMove(opening.tree, 'e4', 0)).toMatchObject({ correct: true, lineIndex: 0 });
    expect(checkStudentMove(opening.tree, 'd4', 0)).toMatchObject({ correct: false });
  });

  it('elige primero las líneas nuevas y luego las peor sabidas', () => {
    expect(chooseLine(opening, undefined, () => 0)).toBe(0);
    const stat: OpeningStat = {
      lines: {
        '0': updateLineStat(updateLineStat(undefined, true), true),
        '1': updateLineStat(undefined, false),
        '2': updateLineStat(undefined, true),
      },
    };
    expect(chooseLine(opening, stat, () => 0)).toBe(1);
    expect(openingMastery(opening, stat)).toEqual({ mastered: 1, total: 3 });
  });

  it('actualiza la racha de cada línea', () => {
    const s1 = updateLineStat(undefined, true, 'a');
    const s2 = updateLineStat(s1, false, 'b');
    expect(s1).toEqual({ attempts: 1, perfect: 1, streak: 1, lastPlayed: 'a' });
    expect(s2).toEqual({ attempts: 2, perfect: 1, streak: 0, lastPlayed: 'b' });
  });
});
