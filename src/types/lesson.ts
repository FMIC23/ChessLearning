/** Diagrama estático incrustado en la teoría (bloque ```tablero). */
export interface BoardDiagram {
  fen: string;
  /** Flechas como pares [origen, destino] o [origen, destino, color]. */
  arrows?: [string, string, string?][];
  /** Casillas a resaltar. */
  highlights?: string[];
  caption?: string;
  orientation?: 'white' | 'black';
}

interface ExerciseBase {
  /** Enunciado mostrado al alumno. */
  prompt: string;
  /** Explicación tras resolverlo. */
  explanation?: string;
  hint?: string;
}

/**
 * Ejercicio de jugadas: el alumno juega los movimientos en posiciones pares de `solution`
 * y la app responde con los impares.
 */
export interface MovesExercise extends ExerciseBase {
  type: 'moves';
  fen: string;
  /** Jugadas en UCI o SAN, alternando alumno y respuesta. */
  solution: string[];
  /** Primeras jugadas alternativas también correctas (ejercicios de una jugada). */
  accept?: string[];
  /** Si es 'mate', cualquier jugada que dé mate en la última jugada del alumno se acepta. */
  goal?: 'mate';
  /** Mensajes específicos para jugadas incorrectas habituales (clave UCI o SAN). */
  wrong?: Record<string, string>;
  orientation?: 'white' | 'black';
  /** false para omitir la verificación con Stockfish (jugadas didácticas que no son la mejor). */
  engine?: boolean;
}

/**
 * Ejercicio de casillas: el alumno hace clic en una o varias casillas.
 * `targets` puede ser una lista o "moves:<casilla>" para usar los movimientos legales de esa pieza.
 */
export interface SquaresExercise extends ExerciseBase {
  type: 'squares';
  fen?: string;
  targets: string[] | string;
  /** 'all': marcar todas las casillas objetivo; 'one': basta con acertar una. */
  mode?: 'all' | 'one';
  /** Casillas a resaltar como pista visual (p. ej. la pieza protagonista). */
  highlights?: string[];
  orientation?: 'white' | 'black';
}

/** Pregunta tipo test, opcionalmente con un diagrama. */
export interface QuizExercise extends ExerciseBase {
  type: 'quiz';
  options: string[];
  /** Índice (desde 0) de la respuesta correcta. */
  answer: number;
  fen?: string;
  arrows?: [string, string, string?][];
  orientation?: 'white' | 'black';
}

/**
 * Práctica contra el motor: el alumno debe lograr el objetivo desde la posición dada.
 */
export interface PlayExercise extends ExerciseBase {
  type: 'play';
  fen: string;
  goal: 'mate' | 'promote' | 'draw' | 'win';
  /** Máximo de jugadas del alumno para lograrlo. */
  maxMoves?: number;
  /** Profundidad del motor rival (por defecto, juego fuerte). */
  engineDepth?: number;
  orientation?: 'white' | 'black';
}

export type Exercise = MovesExercise | SquaresExercise | QuizExercise | PlayExercise;

export type LessonStep =
  | { kind: 'text'; markdown: string }
  | { kind: 'board'; diagram: BoardDiagram }
  | { kind: 'exercise'; exercise: Exercise; index: number };

export interface Lesson {
  /** Identificador global: `<nivel>/<slug>`. */
  id: string;
  slug: string;
  levelId: string;
  order: number;
  title: string;
  summary: string;
  /** Minutos aproximados. */
  minutes: number;
  /** Etiquetas temáticas (se usan para detectar puntos débiles). */
  tags: string[];
  steps: LessonStep[];
  exerciseCount: number;
}

export interface Level {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface LevelMeta {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}
