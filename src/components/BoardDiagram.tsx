import type { BoardDiagram as Diagram } from '@/types/lesson';
import { ChessBoard } from './ChessBoard';
import { toBoardArrows } from '@/lib/board/arrows';

const HIGHLIGHT = 'rgba(47, 111, 214, 0.45)';

/** Diagrama estático con flechas y casillas resaltadas. */
export function BoardDiagram({ diagram }: { diagram: Diagram }) {
  const highlights = Object.fromEntries((diagram.highlights ?? []).map((sq) => [sq, HIGHLIGHT]));
  return (
    <figure className="mx-auto my-4 w-full max-w-sm">
      <ChessBoard
        fen={diagram.fen}
        orientation={diagram.orientation ?? 'white'}
        arrows={toBoardArrows(diagram.arrows)}
        highlights={highlights}
        label={diagram.caption ?? 'Diagrama'}
      />
      {diagram.caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">{diagram.caption}</figcaption>
      )}
    </figure>
  );
}
