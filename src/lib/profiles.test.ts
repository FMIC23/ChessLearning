import { beforeEach, describe, expect, it } from 'vitest';
import { addProfile, createProfileStorage, loadProfiles, PROFILES_KEY, removeProfile, saveProfiles, scopedKey, updateProfile } from './profiles';

class MemoryStorage {
  map = new Map<string, string>();
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.map.set(k, v);
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
}

describe('perfiles', () => {
  let storage: MemoryStorage;
  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('crea un perfil por defecto y migra los datos anteriores', () => {
    storage.setItem('ajedrez-progreso', '{"state":{"puzzleRating":1234}}');
    const data = loadProfiles(storage);
    expect(data.profiles).toHaveLength(1);
    expect(storage.getItem('ajedrez-progreso')).toBeNull();
    expect(storage.getItem(scopedKey('ajedrez-progreso', data.activeId))).toContain('1234');
    // segunda lectura: no vuelve a crear nada
    expect(loadProfiles(storage)).toEqual(data);
  });

  it('añade, renombra y valida nombres', () => {
    let data = loadProfiles(storage);
    const added = addProfile(data, '  Lucía  ', '🌸');
    data = added.data;
    expect(added.profile.name).toBe('Lucía');
    expect(() => addProfile(data, 'lucía', '♔')).toThrow(/Ya existe/);
    expect(() => addProfile(data, '   ', '♔')).toThrow(/vacío/);
    data = updateProfile(data, added.profile.id, { name: 'Lucía G.', avatar: '⭐' });
    expect(data.profiles[1]).toMatchObject({ name: 'Lucía G.', avatar: '⭐' });
  });

  it('borra un perfil con sus datos y cambia el activo si hace falta', () => {
    let data = loadProfiles(storage);
    const { data: withTwo, profile } = addProfile(data, 'Ana', '♕');
    data = { ...withTwo, activeId: profile.id };
    storage.setItem(scopedKey('ajedrez-progreso', profile.id), 'x');
    data = removeProfile(storage, data, profile.id);
    expect(data.profiles).toHaveLength(1);
    expect(data.activeId).toBe(data.profiles[0]!.id);
    expect(storage.getItem(scopedKey('ajedrez-progreso', profile.id))).toBeNull();
    expect(() => removeProfile(storage, data, data.activeId)).toThrow(/al menos un perfil/);
  });

  it('el almacenamiento por perfil separa los datos de cada persona', () => {
    const scoped = createProfileStorage(() => storage);
    let data = loadProfiles(storage);
    scoped.setItem('ajedrez-progreso', 'datos de 1');
    const { data: withTwo, profile } = addProfile(data, 'Ana', '♕');
    data = { ...withTwo, activeId: profile.id };
    saveProfiles(storage, data);
    expect(scoped.getItem('ajedrez-progreso')).toBeNull();
    scoped.setItem('ajedrez-progreso', 'datos de Ana');
    saveProfiles(storage, { ...data, activeId: data.profiles[0]!.id });
    expect(scoped.getItem('ajedrez-progreso')).toBe('datos de 1');
    expect(JSON.parse(storage.getItem(PROFILES_KEY)!).profiles).toHaveLength(2);
  });

  it('recupera un estado corrupto', () => {
    storage.setItem(PROFILES_KEY, '{roto');
    expect(loadProfiles(storage).profiles).toHaveLength(1);
  });
});

describe('perfil fijo por pestaña', () => {
  it('escribe siempre en el perfil indicado aunque cambie el activo', () => {
    const storage = new MemoryStorage();
    const data = loadProfiles(storage);
    const tab = createProfileStorage(() => storage, () => data.activeId);
    const { data: withTwo, profile } = addProfile(data, 'Ana', '♕');
    saveProfiles(storage, { ...withTwo, activeId: profile.id });
    tab.setItem('ajedrez-progreso', 'mío');
    expect(storage.getItem(scopedKey('ajedrez-progreso', data.activeId))).toBe('mío');
    expect(storage.getItem(scopedKey('ajedrez-progreso', profile.id))).toBeNull();
  });
});
