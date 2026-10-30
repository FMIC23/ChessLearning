import { create } from 'zustand';
import { addProfile, loadProfiles, removeProfile, saveProfiles, updateProfile, type Profile, type ProfilesData } from '@/lib/profiles';

/** Marca de sesión: ya se ha elegido perfil en esta pestaña. */
export const CHOSEN_KEY = 'ajedrez-perfil-elegido';

interface ProfilesState extends ProfilesData {
  /** Cambia de perfil y recarga la app para cargar sus datos. */
  switchTo: (id: string) => void;
  /** Confirma el perfil activo sin recargar (pantalla de «¿Quién juega?»). */
  confirmActive: () => void;
  add: (name: string, avatar: string) => Profile;
  update: (id: string, changes: Partial<Pick<Profile, 'name' | 'avatar'>>) => void;
  remove: (id: string) => void;
  chosen: boolean;
}

function readChosen(): boolean {
  try {
    return sessionStorage.getItem(CHOSEN_KEY) === '1';
  } catch {
    return true;
  }
}

function markChosen() {
  try {
    sessionStorage.setItem(CHOSEN_KEY, '1');
  } catch {
    // sin sessionStorage: no pasa nada
  }
}

/** Recarga la página (aislado para poder sustituirlo en los tests). */
export const reloader = { reload: () => window.location.reload() };

export const useProfiles = create<ProfilesState>()((set, get) => ({
  ...loadProfiles(localStorage),
  chosen: readChosen(),
  switchTo: (id) => {
    const data = { profiles: get().profiles, activeId: id };
    saveProfiles(localStorage, data);
    markChosen();
    if (id === get().activeId) {
      set({ chosen: true });
      return;
    }
    reloader.reload();
  },
  confirmActive: () => {
    markChosen();
    set({ chosen: true });
  },
  add: (name, avatar) => {
    const { data, profile } = addProfile({ profiles: get().profiles, activeId: get().activeId }, name, avatar);
    saveProfiles(localStorage, data);
    // Quien añade un perfil ya está usando la app: no hace falta preguntarle quién juega.
    markChosen();
    set({ ...data, chosen: true });
    return profile;
  },
  update: (id, changes) => {
    const data = updateProfile({ profiles: get().profiles, activeId: get().activeId }, id, changes);
    saveProfiles(localStorage, data);
    set(data);
  },
  remove: (id) => {
    const wasActive = get().activeId === id;
    const data = removeProfile(localStorage, { profiles: get().profiles, activeId: get().activeId }, id);
    saveProfiles(localStorage, data);
    if (wasActive) {
      reloader.reload();
      return;
    }
    set(data);
  },
}));

export function useActiveProfile(): Profile {
  return useProfiles((s) => s.profiles.find((p) => p.id === s.activeId) ?? s.profiles[0]!);
}
