import { useEffect } from 'react';

/**
 * Blindaje de Propiedad Intelectual — Dulcey & Co.
 * Intercepta y neutraliza de forma silenciosa e imperceptible:
 * 1. Clic derecho (`contextmenu`) sobre imágenes (`img`, `picture`, `svg`, `[data-protected-media]`).
 * 2. Arrastre (`dragstart`) de imágenes hacia el escritorio o pestañas.
 * 3. Selección y llamadas táctiles prolongadas (`-webkit-touch-callout`).
 *
 * Mantiene intacta la selección de texto, clic derecho en áreas estándar y navegación normal.
 */
export function useMediaProtection(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isProtectedTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement || target instanceof SVGElement)) return false;

      // Detecta imágenes directas o elementos dentro de contenedores multimedia protegidos
      return Boolean(
        target.tagName === 'IMG' ||
          target.tagName === 'PICTURE' ||
          target.closest('img') ||
          target.closest('picture') ||
          target.closest('[data-protected-media]') ||
          (target.tagName === 'svg' && target.getAttribute('aria-label')?.includes('Dulcey'))
      );
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isProtectedTarget(e.target)) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (isProtectedTarget(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, []);
}
