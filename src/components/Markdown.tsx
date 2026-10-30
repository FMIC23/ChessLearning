import { useMemo } from 'react';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/** Renderiza Markdown del contenido didáctico (contenido propio y de confianza del repositorio). */
export function Markdown({ text, className = '' }: { text: string; className?: string }) {
  const html = useMemo(() => marked.parse(text, { async: false }), [text]);
  return <div className={`prose-lesson ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
