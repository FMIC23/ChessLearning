import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Puzzle } from '@/types/puzzle';
import { useProgress } from '@/store/progress';
import { AnticipationPage } from './AnticipationPage';

const PUZZLES: Puzzle[] = [
  {
    id: 'escalera',
    fen: '6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1',
    solution: ['a2a7', 'g8h8', 'b1b8'],
    rating: 600,
    themes: ['mateIn2'],
    explanation: 'La escalera de torres.',
    source: 'propio',
  },
];

vi.mock('@/content/puzzles', () => ({ loadPuzzles: () => Promise.resolve(PUZZLES) }));

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AnticipationPage />
    </MemoryRouter>,
  );
}

describe('AnticipationPage', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('visualización: hay que responder en la posición imaginada', async () => {
    const user = userEvent.setup();
    renderAt('/anticipacion');
    expect(await screen.findByText('1. Ta7 Rh8')).toBeInTheDocument();
    const input = screen.getByLabelText('Jugada con teclado:');
    await user.type(input, 'Ta6{enter}');
    expect(screen.getByText(/Ta6 no es la mejor/)).toBeInTheDocument();
    await user.type(input, 'Tb8{enter}');
    expect(await screen.findByText('✅ ¡Lo has visto!')).toBeInTheDocument();
    // el primer intento fallido es el que cuenta
    expect(useProgress.getState().anticipation.visualization).toEqual({ attempts: 1, successes: 0 });
  });

  it('amenazas: el alumno juega la jugada del rival', async () => {
    const user = userEvent.setup();
    renderAt('/anticipacion?modo=amenazas');
    expect(await screen.findByText(/le toca mover al rival/)).toBeInTheDocument();
    await user.type(screen.getByLabelText('Jugada con teclado:'), 'Ta7{enter}');
    expect(await screen.findByText('✅ ¡Amenaza detectada!')).toBeInTheDocument();
    expect(useProgress.getState().anticipation.threats).toEqual({ attempts: 1, successes: 1 });
  });
});
