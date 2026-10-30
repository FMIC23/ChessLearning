import { Chess } from 'chess.js';
import type { Opening, OpeningData, OpeningNode } from '../../types/opening';
import { START_FEN, toUci } from '../chess';

export class OpeningParseError extends Error {}

/** Construye el árbol de variantes fusionando las líneas (comparten los prefijos comunes). */
export function buildOpeningTree(data: OpeningData): OpeningNode {
  const root: OpeningNode = { san: '', uci: '', fen: START_FEN, ply: 0, lines: [], children: [] };
  data.lines.forEach((line, lineIndex) => {
    const game = new Chess();
    let node = root;
    root.lines.push(lineIndex);
    const sans = line.moves.trim().split(/\s+/).filter(Boolean);
    sans.forEach((san, i) => {
      let move;
      try {
        move = game.move(san);
      } catch {
        throw new OpeningParseError(`${data.id} · «${line.name}»: jugada ${i + 1} ilegal (${san})`);
      }
      let child = node.children.find((c) => c.san === move.san);
      if (!child) {
        child = { san: move.san, uci: toUci(move), fen: game.fen(), ply: i + 1, lines: [], children: [] };
        node.children.push(child);
      }
      child.lines.push(lineIndex);
      const comment = line.comments?.[String(i + 1)];
      if (comment && !child.comment) child.comment = comment;
      node = child;
    });
  });
  return root;
}

export function parseOpening(data: OpeningData): Opening {
  return { ...data, tree: buildOpeningTree(data) };
}

/** Recorre el árbol siguiendo una secuencia de SAN. */
export function findNode(root: OpeningNode, path: string[]): OpeningNode | null {
  let node: OpeningNode | undefined = root;
  for (const san of path) {
    node = node?.children.find((c) => c.san === san);
    if (!node) return null;
  }
  return node ?? null;
}

/** Jugadas (SAN) de una línea. */
export function lineMoves(data: { moves: string }): string[] {
  return data.moves.trim().split(/\s+/).filter(Boolean);
}

/** Indica si en el nodo le toca mover al bando del alumno. */
export function isStudentTurn(node: OpeningNode, color: 'white' | 'black'): boolean {
  const whiteToMove = node.ply % 2 === 0;
  return (color === 'white') === whiteToMove;
}

/** Errores de estructura: jugadas ilegales, comentarios fuera de rango, líneas vacías. */
export function validateOpening(data: OpeningData): string[] {
  const errors: string[] = [];
  if (!data.id || !data.name) errors.push('apertura sin id o nombre');
  if (!['white', 'black'].includes(data.color)) errors.push(`${data.id}: color no válido`);
  if (!data.lines?.length) errors.push(`${data.id}: sin líneas`);
  try {
    buildOpeningTree(data);
  } catch (error) {
    errors.push((error as Error).message);
  }
  for (const line of data.lines ?? []) {
    const n = lineMoves(line).length;
    if (n === 0) errors.push(`${data.id} · «${line.name}»: línea vacía`);
    for (const key of Object.keys(line.comments ?? {})) {
      const ply = Number(key);
      if (!Number.isInteger(ply) || ply < 1 || ply > n) errors.push(`${data.id} · «${line.name}»: comentario en la jugada ${key} fuera de rango`);
    }
    // La línea debe terminar con una jugada del alumno para que el test acabe en su turno.
    const lastIsWhite = n % 2 === 1;
    if (n > 0 && lastIsWhite !== (data.color === 'white')) {
      errors.push(`${data.id} · «${line.name}»: debe terminar con una jugada del bando del repertorio (${data.color === 'white' ? 'blancas' : 'negras'})`);
    }
  }
  return errors;
}
