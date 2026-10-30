/** Convierte flechas del contenido ([origen, destino, color?]) al formato del tablero. */
export function toBoardArrows(arrows: [string, string, string?][] | undefined) {
  return (arrows ?? []).map(([startSquare, endSquare, color]) => ({
    startSquare,
    endSquare,
    color: color ?? 'rgba(234, 88, 12, 0.85)',
  }));
}
