import { createJSONStorage } from 'zustand/middleware';
import { createProfileStorage, loadProfiles } from '@/lib/profiles';

// Cada pestaña trabaja con el perfil que estaba activo al cargarla: si en otra pestaña se elige
// otro perfil, esta sigue guardando en el suyo (cambiar de perfil recarga la página).
let tabProfileId: string | null = null;
const currentProfileId = () => (tabProfileId ??= loadProfiles(localStorage).activeId);

/** Almacenamiento persistente del perfil de esta pestaña (localStorage con claves por perfil). */
export const profileStorage = createJSONStorage(() => createProfileStorage(() => localStorage, currentProfileId));
