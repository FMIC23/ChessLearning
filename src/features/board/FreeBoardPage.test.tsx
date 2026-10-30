import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { FreeBoardPage } from './FreeBoardPage';

describe('FreeBoardPage', () => {
  it('permite jugar con el teclado y muestra la jugada en notación española', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <FreeBoardPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText('Jugada con teclado:');
    await user.type(input, 'Cf3{enter}');
    expect(screen.getByRole('button', { name: 'Cf3' })).toBeInTheDocument();
    expect(screen.getByText(/Juegan las/)).toHaveTextContent('negras');
    await user.type(input, 'xx{enter}');
    expect(screen.getByRole('alert')).toHaveTextContent('no es una jugada legal');
  });
});
