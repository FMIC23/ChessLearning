import type { PlayExercise } from '@/types/lesson';
import { Feedback } from '@/components/ui';
import type { ExerciseViewProps } from './types';

/** Práctica contra el motor (se implementa junto con la integración de Stockfish). */
export function PlayExerciseView({ exercise, onSolved }: ExerciseViewProps<PlayExercise>) {
  return (
    <div className="space-y-2">
      <p>{exercise.prompt}</p>
      <Feedback tone="info">La práctica contra el ordenador estará disponible pronto.</Feedback>
      <button type="button" className="text-sm underline" onClick={() => onSolved(0)}>
        Saltar
      </button>
    </div>
  );
}
