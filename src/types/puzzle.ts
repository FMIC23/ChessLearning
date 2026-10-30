/** Problema táctico tal y como se guarda en content/puzzles/*.json. */
export interface PuzzleData {
  id: string;
  /** Posición inicial. Si `opponentFirst` es true, el rival mueve primero (formato Lichess). */
  fen: string;
  /** Jugadas en UCI alternando alumno y rival (o rival y alumno con `opponentFirst`). */
  moves: string[];
  /** Dificultad estimada (escala Elo). */
  rating: number;
  /** Temas tácticos (claves en inglés, compatibles con Lichess: fork, pin, mateIn2...). */
  themes: string[];
  opponentFirst?: boolean;
  title?: string;
  hint?: string;
  /** Explicación del motivo táctico (Markdown). */
  explanation?: string;
  source?: 'propio' | 'lichess';
  url?: string;
}

/** Problema normalizado listo para jugar: siempre empieza el alumno. */
export interface Puzzle {
  id: string;
  /** Posición con el alumno al turno. */
  fen: string;
  /** Jugadas UCI: alumno, rival, alumno... (termina en el alumno). */
  solution: string[];
  rating: number;
  themes: string[];
  /** Jugada previa del rival (para mostrarla resaltada) y posición anterior. */
  setup?: { fen: string; move: string };
  title?: string;
  hint?: string;
  explanation?: string;
  source: 'propio' | 'lichess';
  url?: string;
}
