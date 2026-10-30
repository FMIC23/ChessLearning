/**
 * Perfiles de usuario en el mismo dispositivo. Cada perfil guarda su progreso y sus ajustes
 * en claves propias de localStorage (`<clave>:<idPerfil>`).
 */
export interface Profile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface ProfilesData {
  profiles: Profile[];
  activeId: string;
}

export const PROFILES_KEY = 'ajedrez-perfiles';
/** Claves de datos que pertenecen a cada perfil. */
export const SCOPED_KEYS = ['ajedrez-progreso', 'ajedrez-ajustes'] as const;
export const AVATARS = ['♔', '♕', '♖', '♗', '♘', '♙', '🦁', '🦉', '🐱', '🐶', '🦊', '🐼', '🌸', '⭐'];
export const MAX_NAME_LENGTH = 24;

export type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function scopedKey(base: string, profileId: string): string {
  return `${base}:${profileId}`;
}

function newId(): string {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function isValid(data: unknown): data is ProfilesData {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as ProfilesData;
  return Array.isArray(d.profiles) && d.profiles.length > 0 && typeof d.activeId === 'string';
}

/**
 * Lee los perfiles. La primera vez crea un perfil por defecto y le asigna los datos que
 * hubiera de versiones anteriores (sin perfiles), para no perder el progreso.
 */
export function loadProfiles(storage: KeyValueStorage): ProfilesData {
  try {
    const raw = storage.getItem(PROFILES_KEY);
    const data: unknown = raw ? JSON.parse(raw) : null;
    if (isValid(data)) {
      if (!data.profiles.some((p) => p.id === data.activeId)) data.activeId = data.profiles[0]!.id;
      return data;
    }
  } catch {
    // datos corruptos: se recrea el perfil por defecto
  }
  const profile: Profile = { id: newId(), name: 'Jugador 1', avatar: '♔', createdAt: new Date().toISOString() };
  for (const key of SCOPED_KEYS) {
    const legacy = storage.getItem(key);
    if (legacy !== null) {
      storage.setItem(scopedKey(key, profile.id), legacy);
      storage.removeItem(key);
    }
  }
  const data = { profiles: [profile], activeId: profile.id };
  saveProfiles(storage, data);
  return data;
}

export function saveProfiles(storage: KeyValueStorage, data: ProfilesData): void {
  storage.setItem(PROFILES_KEY, JSON.stringify(data));
}

export function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, ' ').slice(0, MAX_NAME_LENGTH);
}

export function addProfile(data: ProfilesData, name: string, avatar: string): { data: ProfilesData; profile: Profile } {
  const clean = cleanName(name);
  if (!clean) throw new Error('El nombre no puede estar vacío.');
  if (data.profiles.some((p) => p.name.toLowerCase() === clean.toLowerCase())) throw new Error('Ya existe un perfil con ese nombre.');
  const profile: Profile = { id: newId(), name: clean, avatar, createdAt: new Date().toISOString() };
  return { data: { ...data, profiles: [...data.profiles, profile] }, profile };
}

export function updateProfile(data: ProfilesData, id: string, changes: Partial<Pick<Profile, 'name' | 'avatar'>>): ProfilesData {
  const name = changes.name !== undefined ? cleanName(changes.name) : undefined;
  if (name !== undefined && !name) throw new Error('El nombre no puede estar vacío.');
  if (name && data.profiles.some((p) => p.id !== id && p.name.toLowerCase() === name.toLowerCase())) {
    throw new Error('Ya existe un perfil con ese nombre.');
  }
  return {
    ...data,
    profiles: data.profiles.map((p) => (p.id === id ? { ...p, ...changes, ...(name ? { name } : {}) } : p)),
  };
}

/** Borra un perfil y sus datos. No se puede borrar el último. */
export function removeProfile(storage: KeyValueStorage, data: ProfilesData, id: string): ProfilesData {
  if (data.profiles.length <= 1) throw new Error('Debe quedar al menos un perfil.');
  for (const key of SCOPED_KEYS) storage.removeItem(scopedKey(key, id));
  const profiles = data.profiles.filter((p) => p.id !== id);
  return { profiles, activeId: data.activeId === id ? profiles[0]!.id : data.activeId };
}

/**
 * Almacenamiento para Zustand que redirige cada clave al perfil indicado por `profileId`
 * (por defecto, el perfil activo en cada momento).
 */
export function createProfileStorage(
  storage: () => KeyValueStorage,
  profileId: () => string = () => loadProfiles(storage()).activeId,
): KeyValueStorage {
  const active = profileId;
  return {
    getItem: (name) => storage().getItem(scopedKey(name, active())),
    setItem: (name, value) => storage().setItem(scopedKey(name, active()), value),
    removeItem: (name) => storage().removeItem(scopedKey(name, active())),
  };
}
