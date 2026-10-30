import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadProfiles } from '@/lib/profiles';
import { reloader, useProfiles } from '@/store/profiles';
import { ProfilePicker } from './ProfilePicker';
import { ProfilesPage } from './ProfilesPage';

function resetProfiles() {
  localStorage.clear();
  sessionStorage.clear();
  useProfiles.setState({ ...loadProfiles(localStorage), chosen: false });
}

describe('perfiles (interfaz)', () => {
  beforeEach(() => {
    resetProfiles();
    vi.spyOn(reloader, 'reload').mockImplementation(() => {});
  });

  it('añade un perfil y lo puede activar', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProfilesPage />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText('Nombre'), 'Lucía');
    await user.click(screen.getByRole('button', { name: 'Avatar 🌸' }));
    await user.click(screen.getByRole('button', { name: 'Añadir perfil' }));
    expect(screen.getByText('Lucía')).toBeInTheDocument();
    expect(useProfiles.getState().profiles).toHaveLength(2);
    expect(useProfiles.getState().chosen).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Usar este perfil' }));
    expect(reloader.reload).toHaveBeenCalled();
    expect(loadProfiles(localStorage).activeId).toBe(useProfiles.getState().profiles[1]!.id);
  });

  it('impide nombres repetidos', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProfilesPage />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText('Nombre'), 'jugador 1');
    await user.click(screen.getByRole('button', { name: 'Añadir perfil' }));
    expect(screen.getByText('Ya existe un perfil con ese nombre.')).toBeInTheDocument();
  });

  it('«¿Quién juega?» confirma el perfil activo sin recargar', async () => {
    const user = userEvent.setup();
    useProfiles.getState().add('Lucía', '🌸');
    useProfiles.setState({ chosen: false });
    render(<ProfilePicker />);
    expect(screen.getByRole('heading', { name: '¿Quién juega?' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Jugador 1/ }));
    expect(useProfiles.getState().chosen).toBe(true);
    expect(reloader.reload).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: /Lucía/ }));
    expect(reloader.reload).toHaveBeenCalledTimes(1);
  });
});
