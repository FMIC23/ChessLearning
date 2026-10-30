import '@testing-library/jest-dom/vitest';

// jsdom no implementa matchMedia.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

if (!('ResizeObserver' in window)) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'ResizeObserver', { writable: true, value: ResizeObserverStub });
  Object.defineProperty(globalThis, 'ResizeObserver', { writable: true, value: ResizeObserverStub });
}

// jsdom no calcula tamaños: react-chessboard necesita un ancho de casilla para animar.
const originalRect = Element.prototype.getBoundingClientRect;
Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
  const rect = originalRect.call(this);
  if (rect.width > 0) return rect;
  return { ...rect, width: 50, height: 50, x: 0, y: 0, top: 0, left: 0, right: 50, bottom: 50, toJSON: () => ({}) };
};
