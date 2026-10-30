import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Puzzle } from '@/types/puzzle';
import { useProgress } from '@/store/progress';
import { TacticsPage } from './TacticsPage';

const PUZZLES: Puzzle[] = [
  {
    id: 'mate-pasillo',
    fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
    solution: ['a1a8'],
    rating: 800,
    themes: ['mateIn1', 'backRankMate'],
    title: 'El pasillo',
    explanation: 'Los peones encierran al rey.',
    source: 'propio',
  },
  {
    id: 'dos-torres',
    fen: '6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1',
    solution: ['a2a7', 'g8h8', 'b1b8'],
    rating: 820,
    themes: ['mateIn2'],
    source: 'propio',
  },
];

vi.mock('@/content/puzzles', () => ({ loadPuzzles: () => Promise.resolve(PUZZLES) }));

function setup() {
  render(
    <MemoryRouter>
      <TacticsPage />
    </MemoryRouter>,
  );
}

describe('TacticsPage', () => {
  beforeEach(() => {
    useProgress.getState().resetProgress();
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('resuelve un problema y actualiza la puntuación', async () => {
    const user = userEvent.setup();
    setup();
    expect(await screen.findByRole('heading', { name: 'El pasillo' })).toBeInTheDocument();
    await user.type(screen.getByLabelText('Jugada con teclado:'), 'Ta8{enter}');
    expect(await screen.findByText('✅ ¡Resuelto!')).toBeInTheDocument();
    expect(screen.getByText(/Los peones encierran al rey/)).toBeInTheDocument();
    const state = useProgress.getState();
    expect(state.puzzleCount).toBe(1);
    expect(state.puzzleRating).toBeGreaterThan(800);
    expect(state.puzzleCards['mate-pasillo']?.successes).toBe(1);
  });

  it('un fallo cuenta como problema fallado y se programa su repaso', async () => {
    const user = userEvent.setup();
    setup();
    await screen.findByRole('heading', { name: 'El pasillo' });
    await user.type(screen.getByLabelText('Jugada con teclado:'), 'Ta7{enter}');
    expect(await screen.findByText(/Esa no es la jugada/)).toBeInTheDocument();
    const card = useProgress.getState().puzzleCards['mate-pasillo'];
    expect(card?.lapses).toBe(1);
    expect(useProgress.getState().puzzleRating).toBeLessThan(800);
  });

  it('muestra la solución paso a paso con respuesta del rival', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    // Forzamos el problema de dos jugadas resolviendo antes el primero.
    useProgress.getState().recordPuzzle({ puzzleId: 'mate-pasillo', puzzleRating: 800, themes: [], grade: 'good', score: 1 });
    setup();
    await screen.findByText(/Dificultad 820/);
    await user.click(screen.getByRole('button', { name: 'Solución paso a paso' }));
    await user.click(screen.getByRole('button', { name: 'Jugar esta jugada' }));
    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    await user.click(screen.getByRole('button', { name: 'Solución paso a paso' }));
    await user.click(screen.getByRole('button', { name: 'Jugar esta jugada' }));
    expect(await screen.findByText('📘 Solución vista')).toBeInTheDocument();
    vi.useRealTimers();
  });
});
