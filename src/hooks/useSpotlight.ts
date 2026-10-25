import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

/**
 * Actualiza variables CSS `--mouse-x`, `--mouse-y` y `--spotlight-opacity`
 * directamente en el nodo DOM mediante `requestAnimationFrame`, evitando
 * re-renderizados de React y garantizando 60-120 FPS estables.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    if (event.pointerType === 'touch') return;
    const node = elementRef.current;
    if (!node) return;

    const clientX = event.clientX;
    const clientY = event.clientY;

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      node.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
      node.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
      node.style.setProperty('--spotlight-opacity', '1');
      rafRef.current = null;
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    const node = elementRef.current;
    if (!node) return;
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    node.style.setProperty('--spotlight-opacity', '0');
  }, []);

  return {
    spotlightRef: elementRef,
    spotlightHandlers: {
      onPointerMove,
      onPointerLeave,
    },
  };
}
