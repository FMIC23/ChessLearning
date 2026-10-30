/** Línea del repertorio tal y como se escribe en content/openings/*.json. */
export interface OpeningLineData {
  name: string;
  /** Jugadas en SAN inglés separadas por espacios, desde la posición inicial: "e4 e5 Nf3 Nc6". */
  moves: string;
  /** Comentarios por número de media jugada (1 = primera jugada de las blancas). */
  comments?: Record<string, string>;
}

export interface OpeningData {
  id: string;
  name: string;
  eco?: string;
  /** Bando que juega el alumno con este repertorio. */
  color: 'white' | 'black';
  /** Grupo para organizar el listado (p. ej. "Con blancas: 1.e4"). */
  group: string;
  summary: string;
  /** Ideas clave (Markdown). */
  ideas: string[];
  /** Planes típicos y estructura (Markdown, opcional). */
  plans?: string;
  lines: OpeningLineData[];
}

/** Nodo del árbol de variantes construido a partir de las líneas. */
export interface OpeningNode {
  /** SAN de la jugada que lleva a este nodo (vacío en la raíz). */
  san: string;
  uci: string;
  fen: string;
  ply: number;
  comment?: string;
  /** Índices de las líneas que pasan por este nodo. */
  lines: number[];
  children: OpeningNode[];
}

export interface Opening extends Omit<OpeningData, 'lines'> {
  lines: OpeningLineData[];
  tree: OpeningNode;
}
