import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Puzzle } from '@/types/puzzle';
import { loadPuzzles } from '@/content/puzzles';
import { ChessBoard } from '@/components/ChessBoard';
import { Markdown } from '@/components/Markdown';
import { Badge, Button, Card, Feedback, PageHeader } from '@/components/ui';
import { formatLine, uciLineToSan } from '@/lib/chess';
import { countDue, selectNextPuzzle, type SelectionReason } from '@/lib/puzzles/selection';
import { META_THEMES, themeLabel } from '@/lib/puzzles/themes';
import { gradeFromResult } from '@/lib/srs';
import { studentColor } from '@/lib/lessons/exercise';
import { useProgress } from '@/store/progress';
import { usePuzzleSession, type PuzzleOutcome } from './usePuzzleSession';

export function TacticsPage() {
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState('');
  const [current, setCurrent] = useState<{ puzzle: Puzzle; reason: SelectionReason } | null>(null);
  const [round, setRound] = useState(0);
  const cards = useProgress((s) => s.puzzleCards);
  const rating = useProgress((s) => s.puzzleRating);

  useEffect(() => {
    loadPuzzles()
      .then(setPuzzles)
      .catch((e: Error) => setError(e.message));
  }, []);

  const themes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of puzzles ?? []) for (const t of p.themes) if (!META_THEMES.has(t)) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => themeLabel(a[0]).localeCompare(themeLabel(b[0]), 'es'));
  }, [puzzles]);

  const pickNext = useCallback(
    (excludeId?: string) => {
      if (!puzzles) return;
      const { puzzleCards, puzzleRating } = useProgress.getState();
      setCurrent(selectNextPuzzle(puzzles, puzzleCards, puzzleRating, Date.now(), { theme: theme || undefined, excludeId }));
      setRound((r) => r + 1);
    },
    [puzzles, theme],
  );

  useEffect(() => {
    pickNext();
  }, [pickNext]);

  const due = useMemo(() => countDue(cards, Date.now()), [cards]);
  const solvedToday = useProgress((s) => {
    const today = new Date().toDateString();
    return s.puzzleHistory.filter((h) => h.success && new Date(h.date).toDateString() === today).length;
  });

  return (
    <div>
      <PageHeader
        title="Táctica"
        subtitle="Problemas adaptados a tu nivel. Los que falles volverán a aparecer hasta que los domines."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tema" className="text-sm text-slate-600 dark:text-slate-400">
              Tema
            </label>
            <select
              id="tema"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900"
            >
              <option value="">Todos (recomendado)</option>
              {themes.map(([t, n]) => (
                <option key={t} value={t}>
                  {themeLabel(t)} ({n})
                </option>
              ))}
            </select>
          </div>
        }
      />
      <div className="mb-4 grid grid-cols-3 gap-3 sm:max-w-xl">
        <Stat label="Puntuación táctica" value={rating} />
        <Stat label="Resueltos hoy" value={solvedToday} />
        <Stat label="Repasos pendientes" value={due} />
      </div>
      {error && <Feedback tone="error">No se pudieron cargar los problemas: {error}</Feedback>}
      {!puzzles && !error && <p>Cargando problemas…</p>}
      {puzzles && !current && <Card>No hay problemas para este tema.</Card>}
      {current && (
        <PuzzleBoard
          key={`${current.puzzle.id}-${round}`}
          puzzle={current.puzzle}
          reason={current.reason}
          onNext={() => pickNext(current.puzzle.id)}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-3 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </Card>
  );
}

const REASON_LABEL: Record<SelectionReason, string> = {
  review: 'Repaso',
  new: 'Nuevo',
  ahead: 'Repaso adelantado',
};

function PuzzleBoard({ puzzle, reason, onNext }: { puzzle: Puzzle; reason: SelectionReason; onNext: () => void }) {
  const recordPuzzle = useProgress((s) => s.recordPuzzle);
  const [ratingChange, setRatingChange] = useState<{ before: number; after: number } | null>(null);
  const [firstOutcome, setFirstOutcome] = useState<PuzzleOutcome | null>(null);

  const onFirstResult = useCallback(
    (outcome: PuzzleOutcome) => {
      setFirstOutcome(outcome);
      const grade = gradeFromResult({ ...outcome, solved: outcome.solved && !outcome.viewedSolution });
      const score = grade === 'fail' ? 0 : outcome.usedHint ? 0.5 : 1;
      setRatingChange(recordPuzzle({ puzzleId: puzzle.id, puzzleRating: puzzle.rating, themes: puzzle.themes, grade, score }));
    },
    [puzzle, recordPuzzle],
  );

  const session = usePuzzleSession(puzzle, onFirstResult);
  const color = studentColor(puzzle.fen);
  const colorName = color === 'white' ? 'blancas' : 'negras';
  const visibleThemes = puzzle.themes.filter((t) => !META_THEMES.has(t));
  const solved = session.status === 'solved';
  const cleanSolve = solved && firstOutcome?.solved && !firstOutcome.viewedSolution;

  const arrows =
    session.showArrow && session.expectedMove
      ? [{ startSquare: session.expectedMove.from, endSquare: session.expectedMove.to, color: 'rgba(22,163,74,0.85)' }]
      : [];
  const highlights =
    session.hintLevel >= 2 && session.expectedMove && !solved ? { [session.expectedMove.from]: 'rgba(250,204,21,0.6)' } : undefined;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.tagName === 'INPUT') return;
      if (e.key === 'n' && solved) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNext, solved]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
      <ChessBoard
        fen={session.fen}
        orientation={color}
        interactive={!solved && session.status !== 'setup' && !session.busy}
        movableColor={color === 'white' ? 'w' : 'b'}
        onMove={session.onMove}
        lastMove={session.lastMove}
        arrows={arrows}
        highlights={highlights}
        keyboardInput
        label="Tablero del problema"
      />
      <div className="space-y-4">
        <Card>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{REASON_LABEL[reason]}</Badge>
            <Badge>Dificultad {puzzle.rating}</Badge>
            {puzzle.source === 'lichess' && <Badge>Lichess</Badge>}
          </div>
          <h2 className="text-lg font-semibold">{puzzle.title ?? 'Encuentra la mejor jugada'}</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-400" aria-live="polite">
            {session.status === 'setup'
              ? 'Mira la última jugada del rival…'
              : solved
                ? '¡Problema terminado!'
                : `Juegan las ${colorName}. Encuentra la mejor jugada.`}
          </p>
          {session.message && session.status === 'wrong' && (
            <div className="mt-3">
              <Feedback tone="error">{session.message}</Feedback>
            </div>
          )}
          {!solved && session.status === 'playing' && session.ply > 0 && !session.busy && (
            <div className="mt-3">
              <Feedback tone="success">¡Bien! Sigue: ¿cuál es la siguiente jugada?</Feedback>
            </div>
          )}
          {session.hintLevel >= 1 && !solved && (
            <div className="mt-3">
              <Feedback tone="info">
                💡 Tema: <strong>{visibleThemes.map(themeLabel).join(', ') || 'táctica'}</strong>
                {puzzle.hint ? `. ${puzzle.hint}` : ''}
                {session.hintLevel >= 2 && ' La pieza que debes mover está resaltada.'}
              </Feedback>
            </div>
          )}
          {!solved && (
            <div className="mt-4 flex flex-wrap gap-2">
              {session.status === 'wrong' && (
                <Button variant="primary" onClick={session.retry}>
                  Reintentar
                </Button>
              )}
              <Button onClick={session.nextHint} disabled={session.hintLevel >= 2 || session.status === 'setup'}>
                {session.hintLevel === 0 ? 'Pista' : 'Otra pista'}
              </Button>
              <Button onClick={session.solutionStep} disabled={session.busy || session.status === 'setup'}>
                {session.showArrow ? 'Jugar esta jugada' : 'Solución paso a paso'}
              </Button>
              <Button variant="ghost" onClick={onNext}>
                Saltar
              </Button>
            </div>
          )}
        </Card>

        {solved && (
          <Card className={cleanSolve ? 'border-emerald-400' : 'border-amber-400'}>
            <p className="text-lg font-semibold">
              {cleanSolve
                ? firstOutcome?.usedHint
                  ? '✅ Resuelto con pista'
                  : '✅ ¡Resuelto!'
                : firstOutcome?.viewedSolution
                  ? '📘 Solución vista'
                  : '🔁 Resuelto tras un fallo'}
            </p>
            {ratingChange && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Puntuación: {ratingChange.before} → <strong>{ratingChange.after}</strong> (
                {ratingChange.after - ratingChange.before >= 0 ? '+' : ''}
                {ratingChange.after - ratingChange.before})
              </p>
            )}
            {!cleanSolve && <p className="mt-1 text-sm text-slate-500">Este problema volverá a aparecer pronto para repasarlo.</p>}
            <div className="mt-3 flex flex-wrap gap-1">
              {visibleThemes.map((t) => (
                <Badge key={t} tone="blue">
                  {themeLabel(t)}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm">
              <strong>Solución:</strong> {formatLine(puzzle.fen, uciLineToSan(puzzle.fen, puzzle.solution))}
            </p>
            {puzzle.explanation && (
              <div className="mt-2">
                <Markdown text={puzzle.explanation} />
              </div>
            )}
            <Button variant="primary" className="mt-4" onClick={onNext}>
              Siguiente problema (N)
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
