import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { Opening, OpeningNode } from '@/types/opening';
import { findOpening } from '@/content/openings';
import { NotFoundPage } from '@/app/NotFoundPage';
import { ChessBoard } from '@/components/ChessBoard';
import { Markdown } from '@/components/Markdown';
import { Badge, Button, Card, Feedback, PageHeader } from '@/components/ui';
import { applyMove, formatLine, parseUci, toSpanishSan, type MoveInput } from '@/lib/chess';
import { findNode, lineMoves } from '@/lib/openings/tree';
import { checkStudentMove, chooseLine, isLineMastered, nextTestStep } from '@/lib/openings/trainer';
import { useBoardKeyboardNavigation } from '@/lib/useBoardKeyboardNavigation';
import { useProgress } from '@/store/progress';

export function OpeningPage() {
  const { openingId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const opening = findOpening(openingId);
  if (!opening) return <NotFoundPage />;
  const mode = params.get('modo') === 'test' ? 'test' : 'estudio';

  return (
    <div>
      <nav aria-label="Migas de pan" className="mb-2 text-sm">
        <Link to="/aperturas" className="text-brand-600 underline dark:text-brand-100">
          Aperturas
        </Link>
      </nav>
      <PageHeader
        title={opening.name}
        subtitle={
          <>
            {opening.eco && <Badge>{opening.eco}</Badge>} Juegas con {opening.color === 'white' ? 'blancas' : 'negras'} · {opening.summary}
          </>
        }
        actions={
          <div role="tablist" aria-label="Modo" className="flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
            {(
              [
                ['estudio', '📖 Estudio'],
                ['test', '🎯 Test'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                onClick={() => setParams(value === 'test' ? { modo: 'test' } : {})}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${mode === value ? 'bg-white shadow dark:bg-slate-600' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      {mode === 'estudio' ? <StudyMode key={opening.id} opening={opening} /> : <TestMode key={opening.id} opening={opening} />}
    </div>
  );
}

function lineNames(opening: Opening, node: OpeningNode): string {
  return node.lines.map((i) => opening.lines[i]?.name).filter(Boolean).join(' · ');
}

function StudyMode({ opening }: { opening: Opening }) {
  const [path, setPath] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const markStudied = useProgress((s) => s.markOpeningStudied);
  const node = findNode(opening.tree, path) ?? opening.tree;
  const orientation = opening.color;

  useEffect(() => {
    markStudied(opening.id);
  }, [markStudied, opening.id]);

  const goTo = useCallback(
    (index: number) => {
      // index = número de jugadas del camino - 1 (navegación con el teclado)
      if (index < path.length - 1) setPath(path.slice(0, Math.max(0, index + 1)));
      else if (index >= path.length && node.children[0]) setPath([...path, node.children[0].san]);
    },
    [node.children, path],
  );
  useBoardKeyboardNavigation(path.length - 1, path.length + (node.children.length ? 1 : 0), goTo);

  const onMove = (move: MoveInput) => {
    const played = applyMove(node.fen, move);
    if (!played) return false;
    const child = node.children.find((c) => c.san === played.move.san);
    if (!child) {
      setMessage(`${toSpanishSan(played.move.san)} no forma parte del repertorio en esta posición.`);
      return false;
    }
    setMessage(null);
    setPath([...path, child.san]);
    return true;
  };

  const lastMove = node.uci ? parseUci(node.uci) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
      <div className="space-y-3">
        <ChessBoard fen={node.fen} orientation={orientation} interactive movableColor="both" onMove={onMove} lastMove={lastMove} keyboardInput label="Tablero de estudio" />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setPath([])} aria-label="Posición inicial">⏮</Button>
          <Button onClick={() => setPath(path.slice(0, -1))} disabled={path.length === 0} aria-label="Jugada anterior">◀</Button>
          <Button onClick={() => node.children[0] && setPath([...path, node.children[0].san])} disabled={!node.children.length} aria-label="Jugada siguiente (línea principal)">▶</Button>
        </div>
        {message && <Feedback tone="error">{message}</Feedback>}
      </div>
      <div className="space-y-4">
        <Card>
          <p className="text-sm text-slate-500">
            {path.length === 0 ? 'Posición inicial' : formatLine(opening.tree.fen, path)}
          </p>
          {node.comment ? (
            <div className="mt-2">
              <Markdown text={node.comment} />
            </div>
          ) : (
            path.length === 0 && <p className="mt-2">{opening.summary}</p>
          )}
          {node.children.length > 0 ? (
            <div className="mt-3">
              <p className="mb-1 text-sm font-medium">{node.children.length > 1 ? 'Continuaciones:' : 'Siguiente jugada:'}</p>
              <div className="flex flex-wrap gap-2">
                {node.children.map((c) => (
                  <Button key={c.san} onClick={() => setPath([...path, c.san])} title={lineNames(opening, c)}>
                    <span className="font-mono">{toSpanishSan(c.san)}</span>
                    {node.children.length > 1 && <span className="text-xs text-slate-500">{opening.lines[c.lines[0] ?? 0]?.name}</span>}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">Fin de la línea: «{lineNames(opening, node)}».</p>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Ideas clave</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {opening.ideas.map((idea, i) => (
              <li key={i}>
                <Markdown text={idea} className="[&_p]:my-0" />
              </li>
            ))}
          </ul>
          {opening.plans && (
            <details className="mt-3">
              <summary className="cursor-pointer font-medium">Planes y estructuras típicas</summary>
              <Markdown text={opening.plans} className="mt-2 text-sm" />
            </details>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Líneas del repertorio</h2>
          <ul className="space-y-1 text-sm">
            {opening.lines.map((line, i) => {
              const active = node.lines.includes(i) && path.length > 0;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setPath(lineMoves(line))}
                    className={`w-full rounded px-2 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${active ? 'bg-brand-50 dark:bg-slate-800' : ''}`}
                  >
                    <span className="font-medium">{line.name}</span>
                    <span className="block truncate font-mono text-xs text-slate-500">{formatLine(opening.tree.fen, lineMoves(line))}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function TestMode({ opening }: { opening: Opening }) {
  const stat = useProgress((s) => s.openings[opening.id]);
  const recordLine = useProgress((s) => s.recordOpeningLine);
  const [round, setRound] = useState(0);
  const [lineIndex, setLineIndex] = useState(() => chooseLine(opening, useProgress.getState().openings[opening.id]));
  const [node, setNode] = useState<OpeningNode>(opening.tree);
  const [mistakes, setMistakes] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [showExpected, setShowExpected] = useState(false);
  const [finished, setFinished] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const color = opening.color;
  const step = useMemo(() => nextTestStep(node, lineIndex, color), [color, lineIndex, node]);

  // Jugadas automáticas del rival y final de la línea.
  useEffect(() => {
    if (finished) return;
    if (step.kind === 'opponent') {
      const t = setTimeout(() => setNode(step.node), 550);
      return () => clearTimeout(t);
    }
    if (step.kind === 'done') {
      setFinished(true);
      recordLine(opening.id, lineIndex, mistakes === 0);
    }
  }, [finished, lineIndex, mistakes, opening.id, recordLine, step]);

  const expected = step.kind === 'student' ? (step.expected.find((c) => c.lines.includes(lineIndex)) ?? step.expected[0]) : undefined;

  const onMove = (move: MoveInput) => {
    if (step.kind !== 'student' || finished) return false;
    const played = applyMove(node.fen, move);
    if (!played) return false;
    const result = checkStudentMove(node, played.move.san, lineIndex);
    if (!result.correct || !result.child) {
      setMistakes((m) => m + 1);
      setWrong(`${toSpanishSan(played.move.san)} no es la jugada del repertorio.`);
      setShowExpected(true);
      return false;
    }
    setWrong(null);
    setShowExpected(false);
    setLineIndex(result.lineIndex);
    setNode(result.child);
    setComment(result.child.comment ?? null);
    return true;
  };

  const next = (sameLine = false) => {
    const nextLine = sameLine ? lineIndex : chooseLine(opening, useProgress.getState().openings[opening.id], Math.random, lineIndex);
    setLineIndex(nextLine);
    setNode(opening.tree);
    setMistakes(0);
    setWrong(null);
    setShowExpected(false);
    setFinished(false);
    setComment(null);
    setRound((r) => r + 1);
  };

  const arrows =
    showExpected && expected ? [{ startSquare: parseUci(expected.uci).from, endSquare: parseUci(expected.uci).to, color: 'rgba(22,163,74,0.85)' }] : [];
  const masteredCount = opening.lines.filter((_, i) => isLineMastered(stat?.lines[String(i)])).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]" key={round}>
      <ChessBoard
        fen={node.fen}
        orientation={color}
        interactive={step.kind === 'student' && !finished}
        movableColor={color === 'white' ? 'w' : 'b'}
        onMove={onMove}
        lastMove={node.uci ? parseUci(node.uci) : null}
        arrows={arrows}
        keyboardInput
        label="Tablero del test de aperturas"
      />
      <div className="space-y-4">
        <Card>
          <p className="text-sm text-slate-500">
            Líneas dominadas: {masteredCount}/{opening.lines.length} · Errores en esta línea: {mistakes}
          </p>
          <p className="mt-2 font-medium" aria-live="polite">
            {finished
              ? mistakes === 0
                ? '✅ ¡Línea completada sin errores!'
                : `Línea completada con ${mistakes} error${mistakes === 1 ? '' : 'es'}. Volverá a salir pronto.`
              : step.kind === 'student'
                ? 'Tu turno: juega la jugada de tu repertorio.'
                : 'El rival está moviendo…'}
          </p>
          {node.ply > 0 && <p className="mt-1 font-mono text-xs text-slate-500">{formatLine(opening.tree.fen, pathOf(opening.tree, node))}</p>}
          {wrong && (
            <div className="mt-3">
              <Feedback tone="error">
                {wrong} {expected && <>La correcta es <strong>{toSpanishSan(expected.san)}</strong> (flecha verde). Juégala para continuar.</>}
              </Feedback>
            </div>
          )}
          {comment && !wrong && (
            <div className="mt-3 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">
              <Markdown text={comment} />
            </div>
          )}
          {!finished && step.kind === 'student' && !showExpected && (
            <Button className="mt-3" onClick={() => { setShowExpected(true); setMistakes((m) => m + 1); }}>
              No me acuerdo
            </Button>
          )}
          {finished && (
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                Línea: <strong>{opening.lines[lineIndex]?.name}</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" onClick={() => next()}>
                  Siguiente línea
                </Button>
                <Button onClick={() => next(true)}>Repetir esta línea</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function pathOf(root: OpeningNode, target: OpeningNode): string[] {
  const walk = (node: OpeningNode, acc: string[]): string[] | null => {
    if (node === target) return acc;
    for (const c of node.children) {
      const r = walk(c, [...acc, c.san]);
      if (r) return r;
    }
    return null;
  };
  return walk(root, []) ?? [];
}
