import type { Exercise } from '@/types/lesson';
import { MovesExerciseView } from './MovesExerciseView';
import { SquaresExerciseView } from './SquaresExerciseView';
import { QuizExerciseView } from './QuizExerciseView';
import { PlayExerciseView } from './PlayExerciseView';

interface Props {
  exercise: Exercise;
  solved: boolean;
  onSolved: (mistakes: number) => void;
}

export function ExerciseView({ exercise, solved, onSolved }: Props) {
  switch (exercise.type) {
    case 'moves':
      return <MovesExerciseView exercise={exercise} solved={solved} onSolved={onSolved} />;
    case 'squares':
      return <SquaresExerciseView exercise={exercise} solved={solved} onSolved={onSolved} />;
    case 'quiz':
      return <QuizExerciseView exercise={exercise} solved={solved} onSolved={onSolved} />;
    case 'play':
      return <PlayExerciseView exercise={exercise} solved={solved} onSolved={onSolved} />;
  }
}
