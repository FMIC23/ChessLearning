export interface ExerciseViewProps<T> {
  exercise: T;
  /** Se llama una sola vez al resolver el ejercicio, con el número de fallos cometidos. */
  onSolved: (mistakes: number) => void;
  solved: boolean;
}
