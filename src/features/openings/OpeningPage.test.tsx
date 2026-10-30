import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parseOpening } from '@/lib/openings/tree';
import { useProgress } from '@/store/progress';
import { OpeningPage } from './OpeningPage';

vi.mock('@/content/openings', () => {
  const opening = parseOpening({
    id: 'prueba',
    name: 'Apertura de prueba',
    color: 'white',
    group: 'Con blancas: 1.e4',
    summary: 'Resumen',
    ideas: ['Idea **clave**'],
    lines: [{ name: 'Línea única', moves: 'e4 e5 Nf3', comments: { '1': 'Ocupa el centro.', '3': 'Desarrolla y ataca e5.' } }],
  });
  return { findOpening: (id: string) => (id === 'prueba' ? opening : undefined), OPENINGS: [opening] };
});

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/aperturas/:openingId" element={<OpeningPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('OpeningPage', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('modo estudio: recorre la línea con comentarios', async () => {
    const user = userEvent.setup();
    renderAt('/aperturas/prueba');
    expect(screen.getByText('Idea')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^e4/ }));
    expect(screen.getByText('Ocupa el centro.')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Jugada con teclado:'), 'd5{enter}');
    expect(screen.getByText(/no forma parte del repertorio/)).toBeInTheDocument();
  });

  it('modo test: el alumno juega, la app responde y se registra la línea', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderAt('/aperturas/prueba?modo=test');
    const input = screen.getByLabelText('Jugada con teclado:');
    await user.type(input, 'd4{enter}');
    expect(screen.getByText(/no es la jugada del repertorio/)).toBeInTheDocument();
    await user.type(input, 'e4{enter}');
    await act(async () => {
      vi.advanceTimersByTime(700);
    });
    await user.type(screen.getByLabelText('Jugada con teclado:'), 'Cf3{enter}');
    expect(await screen.findByText(/Línea completada con 1 error/)).toBeInTheDocument();
    expect(useProgress.getState().openings.prueba?.lines['0']).toMatchObject({ attempts: 1, streak: 0 });
    vi.useRealTimers();
  });
});
