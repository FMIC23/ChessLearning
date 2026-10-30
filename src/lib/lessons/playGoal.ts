import type { Chess, Move } from 'chess.js';
import type { PlayExercise } from '../../types/lesson';

export type PlayVerdict = { state: 'continue' } | { state: 'success'; message: string } | { state: 'fail'; message: string };

/**
 * Evalúa el estado de una práctica contra el motor tras cada jugada.
 * `engineCp` es la evaluación desde el punto de vista del alumno (si se conoce).
 */
export function judgePlay(
  exercise: Pick<PlayExercise, 'goal' | 'maxMoves'>,
  game: Chess,
  studentColor: 'w' | 'b',
  studentMoves: number,
  lastMove: Move | null,
  engineCp?: number,
): PlayVerdict {
  const max = exercise.maxMoves ?? 50;
  const studentToMove = game.turn() === studentColor;

  if (game.isCheckmate()) {
    const studentWon = !studentToMove;
    if (studentWon) return { state: 'success', message: '¡Jaque mate! Objetivo conseguido.' };
    return { state: 'fail', message: 'Te han dado jaque mate. ¡Inténtalo de nuevo!' };
  }

  if (exercise.goal === 'promote' && lastMove?.promotion && lastMove.color === studentColor) {
    return { state: 'success', message: '¡Has coronado el peón!' };
  }

  if (game.isDraw()) {
    if (exercise.goal === 'draw') return { state: 'success', message: '¡Tablas conseguidas! Has defendido bien.' };
    const why = game.isStalemate() ? 'por rey ahogado' : game.isInsufficientMaterial() ? 'por material insuficiente' : 'por repetición';
    return { state: 'fail', message: `La partida ha terminado en tablas ${why}.` };
  }

  if (exercise.goal === 'win' && engineCp !== undefined && engineCp >= 600) {
    return { state: 'success', message: 'Has conseguido una ventaja decisiva.' };
  }

  if (exercise.goal === 'promote' && engineCp !== undefined && engineCp <= -300) {
    return { state: 'fail', message: 'El rival ha conseguido detener el peón. Revisa la idea y vuelve a intentarlo.' };
  }

  if (studentToMove && studentMoves >= max) {
    if (exercise.goal === 'draw') {
      if (engineCp === undefined || engineCp > -300) return { state: 'success', message: `Has aguantado ${max} jugadas sin perder. ¡Bien defendido!` };
      return { state: 'fail', message: 'Has aguantado, pero la posición ya está perdida.' };
    }
    return { state: 'fail', message: `Has superado el máximo de ${max} jugadas. Intenta ser más directo.` };
  }

  if (exercise.goal === 'draw' && engineCp !== undefined && engineCp <= -800) {
    return { state: 'fail', message: 'La posición se ha perdido. Repasa la técnica de defensa.' };
  }

  return { state: 'continue' };
}
