import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { LessonPage } from './LessonPage';
import { useProgress } from '@/store/progress';

function renderLesson(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/aprender/:levelId/:slug" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LessonPage', () => {
  beforeEach(() => useProgress.getState().resetProgress());

  it('muestra la teoría hasta el primer ejercicio y avanza al resolverlo', async () => {
    const user = userEvent.setup();
    renderLesson('/aprender/fundamentos/posicion-inicial');
    expect(screen.getByRole('heading', { level: 1, name: 'La posición inicial' })).toBeInTheDocument();
    expect(screen.getByText('Ejercicio 1 de 5')).toBeInTheDocument();
    expect(screen.queryByText('Ejercicio 2 de 5')).not.toBeInTheDocument();

    // Responde con el teclado: la dama blanca va a d1
    await user.type(screen.getByPlaceholderText('e4'), 'e1{enter}');
    expect(screen.getByText(/no es correcta/)).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('e4'), 'd1{enter}');
    expect(screen.getByText('Ejercicio 2 de 5')).toBeInTheDocument();
  });

  it('registra la lección como completada al resolver todos los ejercicios', async () => {
    const user = userEvent.setup();
    renderLesson('/aprender/fundamentos/el-rey');
    const picker = () => screen.getAllByPlaceholderText('e4').at(-1)!;
    for (const sq of ['d3', 'e3', 'f3', 'd4', 'f4', 'd5', 'e5', 'f5']) await user.type(picker(), `${sq}{enter}`);
    for (const sq of ['e5', 'f5', 'f4', 'f3', 'e3']) await user.type(picker(), `${sq}{enter}`);
    await user.click(screen.getByRole('button', { name: /No, nunca/ }));
    expect(await screen.findByText('¡Lección completada!')).toBeInTheDocument();
    expect(useProgress.getState().lessons['fundamentos/el-rey']).toMatchObject({ mistakes: 0, times: 1 });
  });
});
