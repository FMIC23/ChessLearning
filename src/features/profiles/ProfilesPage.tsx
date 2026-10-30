import { useState, type FormEvent } from 'react';
import { Button, Card, Feedback, PageHeader } from '@/components/ui';
import { AVATARS, MAX_NAME_LENGTH, type Profile } from '@/lib/profiles';
import { useProfiles } from '@/store/profiles';

function AvatarPicker({ value, onChange, label }: { value: string; onChange: (a: string) => void; label: string }) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm text-slate-600 dark:text-slate-400">{label}</legend>
      <div className="flex flex-wrap gap-1">
        {AVATARS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onChange(a)}
            aria-pressed={value === a}
            aria-label={`Avatar ${a}`}
            className={`h-10 w-10 rounded-lg text-2xl ${value === a ? 'bg-brand-100 ring-2 ring-brand-500 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            {a}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ProfilesPage() {
  const { profiles, activeId, add, switchTo } = useProfiles();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('♕');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    try {
      add(name, avatar);
      setName('');
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Perfiles"
        subtitle="Varias personas pueden usar la app en este dispositivo: cada perfil guarda su propio progreso, partidas y ajustes."
      />
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Perfiles de este dispositivo</h2>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {profiles.map((p) => (
            <ProfileRow key={p.id} profile={p} active={p.id === activeId} onSwitch={() => switchTo(p.id)} canDelete={profiles.length > 1} />
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Añadir un perfil</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label htmlFor="nuevo-perfil" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
              Nombre
            </label>
            <input
              id="nuevo-perfil"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setName(e.target.value)}
              placeholder="p. ej. Lucía"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
          </div>
          <AvatarPicker value={avatar} onChange={setAvatar} label="Avatar" />
          {error && <Feedback tone="error">{error}</Feedback>}
          <Button type="submit" variant="primary" disabled={!name.trim()}>
            Añadir perfil
          </Button>
        </form>
      </Card>
      <p className="text-sm text-slate-500">
        Los perfiles se guardan solo en este navegador. Para pasar tu progreso a otro dispositivo usa «Exportar progreso» en la página
        Progreso.
      </p>
    </div>
  );
}

function ProfileRow({ profile, active, onSwitch, canDelete }: { profile: Profile; active: boolean; onSwitch: () => void; canDelete: boolean }) {
  const update = useProfiles((s) => s.update);
  const remove = useProfiles((s) => s.remove);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [error, setError] = useState<string | null>(null);

  if (editing) {
    return (
      <li className="space-y-3 py-3">
        <label className="block text-sm">
          Nombre
          <input
            value={name}
            maxLength={MAX_NAME_LENGTH}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          />
        </label>
        <AvatarPicker value={avatar} onChange={setAvatar} label="Avatar" />
        {error && <Feedback tone="error">{error}</Feedback>}
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              try {
                update(profile.id, { name, avatar });
                setEditing(false);
                setError(null);
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          >
            Guardar
          </Button>
          <Button variant="ghost" onClick={() => setEditing(false)}>
            Cancelar
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-3 py-3">
      <span aria-hidden="true" className="text-3xl">
        {profile.avatar}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{profile.name}</span>
        {active && <span className="text-xs text-emerald-700 dark:text-emerald-400">Perfil activo</span>}
      </span>
      {!active && (
        <Button variant="primary" onClick={onSwitch}>
          Usar este perfil
        </Button>
      )}
      <Button onClick={() => setEditing(true)}>Editar</Button>
      {canDelete && (
        <Button
          variant="danger"
          aria-label={`Borrar el perfil ${profile.name}`}
          onClick={() => {
            if (window.confirm(`¿Borrar el perfil «${profile.name}» y todo su progreso? No se puede deshacer.`)) remove(profile.id);
          }}
        >
          Borrar
        </Button>
      )}
    </li>
  );
}
