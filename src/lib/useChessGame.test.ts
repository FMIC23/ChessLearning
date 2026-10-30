import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { START_FEN } from './chess';
import { useChessGame } from './useChessGame';

describe('useChessGame', () => {
  it('juega, navega y deshace', () => {
    const { result } = renderHook(() => useChessGame());
    act(() => {
      result.current.move('e4');
    });
    act(() => {
      result.current.move('e5');
    });
    expect(result.current.history.map((m) => m.san)).toEqual(['e4', 'e5']);
    act(() => result.current.goTo(-1));
    expect(result.current.fen).toBe(START_FEN);
    expect(result.current.isViewingLatest).toBe(false);
    act(() => result.current.goTo(1));
    act(() => result.current.undo());
    expect(result.current.history).toHaveLength(1);
    expect(result.current.lastMove).toEqual({ from: 'e2', to: 'e4' });
  });

  it('rechaza jugadas ilegales y ramifica desde una posición anterior', () => {
    const { result } = renderHook(() => useChessGame());
    let illegal: unknown;
    act(() => {
      illegal = result.current.move('e5');
    });
    expect(illegal).toBeNull();
    act(() => {
      result.current.move('e4');
    });
    act(() => {
      result.current.move('c5');
    });
    act(() => result.current.goTo(0));
    act(() => {
      result.current.move('e5');
    });
    expect(result.current.history.map((m) => m.san)).toEqual(['e4', 'e5']);
  });
});
