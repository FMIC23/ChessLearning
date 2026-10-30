import { useMemo, useState, type ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card, Feedback, PageHeader } from '@/components/ui';
import { parsePgn, PgnError } from '@/lib/pgn';
import { useProgress, type SavedGame } from '@/store/progress';
import { AnalysisView } from './AnalysisView';

const RESULT_LABEL: Record<string, string> = { '1-0': '1-0', '0-1': '0-1', '1/2-1/2': '½-½', '*': '*' };

export function AnalysisPage() {
  const [params, setParams] = useSearchParams();
  const games = useProgress((s) => s.games);
  const gameId = params.get('partida');
  const selected = games.find((g) => g.id === gameId);

  if (gameId && selected) {
    return (
      <div>
        <nav className="mb-2 text-sm">
          <button type="button" className="text-brand-600 underline dark:text-brand-100" onClick={() => setParams({})}>
            ← Volver a mis partidas
          </button>
        </nav>
        <AnalysisView key={selected.id} game={selected} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Análisis de partidas" subtitle="Pega el PGN de una partida tuya o elige una de las que has jugado aquí para analizarla con Stockfish." />
      {gameId && !selected && <Feedback tone="error">No se encuentra esa partida.</Feedback>}
      <div className="grid gap-6 lg:grid-cols-2">
        <ImportPgn onImported={(id) => setParams({ partida: id })} />
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Mis partidas</h2>
          {games.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aún no tienes partidas. <Link to="/jugar" className="underline">Juega contra el ordenador</Link> o importa un PGN.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {games.map((g) => (
                <GameRow key={g.id} game={g} onOpen={() => setParams({ partida: g.id })} />
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

function GameRow({ game, onOpen }: { game: SavedGame; onOpen: () => void }) {
  const deleteGame = useProgress((s) => s.deleteGame);
  const player = game.playerColor ? game.analysis?.accuracy[game.playerColor] : undefined;
  return (
    <li className="flex flex-wrap items-center gap-2 py-2">
      <button type="button" onClick={onOpen} className="min-w-0 flex-1 text-left hover:underline">
        <span className="block truncate font-medium">
          {game.white} – {game.black} <span className="text-slate-500">{RESULT_LABEL[game.result] ?? game.result}</span>
        </span>
        <span className="text-xs text-slate-500">
          {new Date(game.date).toLocaleDateString('es-ES')} · {game.source === 'ordenador' ? 'contra el ordenador' : 'importada'}
          {player !== undefined && ` · tu precisión: ${player.toFixed(0)} %`}
          {!game.analysis && ' · sin analizar'}
        </span>
      </button>
      <Button
        variant="ghost"
        aria-label="Borrar partida"
        onClick={() => {
          if (window.confirm('¿Borrar esta partida?')) deleteGame(game.id);
        }}
      >
        🗑
      </Button>
    </li>
  );
}

function ImportPgn({ onImported }: { onImported: (id: string) => void }) {
  const [text, setText] = useState('');
  const [color, setColor] = useState<'w' | 'b' | ''>('w');
  const [error, setError] = useState<string | null>(null);
  const saveGame = useProgress((s) => s.saveGame);

  const preview = useMemo(() => {
    if (!text.trim()) return null;
    try {
      return parsePgn(text);
    } catch {
      return null;
    }
  }, [text]);

  const loadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setText(await file.text());
  };

  const submit = () => {
    try {
      const parsed = parsePgn(text);
      const result = (['1-0', '0-1', '1/2-1/2'].includes(parsed.result) ? parsed.result : '*') as SavedGame['result'];
      const saved = saveGame({
        pgn: text.trim(),
        result,
        source: 'importada',
        white: parsed.headers.White ?? 'Blancas',
        black: parsed.headers.Black ?? 'Negras',
        playerColor: color || undefined,
      });
      setError(null);
      onImported(saved.id);
    } catch (err) {
      setError(err instanceof PgnError ? err.message : 'No se pudo importar la partida.');
    }
  };

  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Importar PGN</h2>
      <label htmlFor="pgn" className="mb-1 block text-sm text-slate-600 dark:text-slate-400">
        Pega aquí la partida en formato PGN (la puedes exportar desde Lichess, Chess.com, etc.)
      </label>
      <textarea
        id="pgn"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={9}
        placeholder={'[White "Yo"]\n[Black "Rival"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 ...'}
        className="w-full rounded-lg border border-slate-300 bg-white p-2 font-mono text-sm dark:border-slate-600 dark:bg-slate-900"
      />
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <label className="cursor-pointer text-brand-600 underline dark:text-brand-100">
          o carga un archivo .pgn
          <input type="file" accept=".pgn,.txt" className="sr-only" onChange={loadFile} />
        </label>
        <label className="flex items-center gap-2">
          Jugabas con
          <select
            value={color}
            onChange={(e) => setColor(e.target.value as 'w' | 'b' | '')}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
          >
            <option value="w">blancas</option>
            <option value="b">negras</option>
            <option value="">no es mía</option>
          </select>
        </label>
      </div>
      {preview && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {preview.headers.White ?? 'Blancas'} – {preview.headers.Black ?? 'Negras'} · {Math.ceil(preview.moves.length / 2)} jugadas
        </p>
      )}
      {error && (
        <div className="mt-2">
          <Feedback tone="error">{error}</Feedback>
        </div>
      )}
      <Button variant="primary" className="mt-3" onClick={submit} disabled={!text.trim()}>
        Importar y analizar
      </Button>
    </Card>
  );
}
