import type { ImgHTMLAttributes } from 'react';

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

/**
 * Componente de Imagen Blindada — `<ProtectedImage />`
 * Aplica una arquitectura de doble capa:
 * 1. La imagen real tiene `pointer-events-none` y `draggable={false}`, impidiendo
 *    que el cursor o el dedo del usuario toquen el elemento imagen directamente.
 * 2. Una capa invisible frontal (`pointer-events-auto`) absorbe los gestos de
 *    pulsación larga en iOS/Android y clics directos, neutralizando menús nativos.
 */
export function ProtectedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  ...props
}: ProtectedImageProps) {
  return (
    <div
      data-protected-media
      className={`relative inline-block select-none overflow-hidden ${wrapperClassName}`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className={`pointer-events-none select-none ${className}`}
        {...props}
      />
      {/* Escudo invisible táctil y de cursor */}
      <div
        className="absolute inset-0 z-10 pointer-events-auto cursor-default bg-transparent"
        aria-hidden="true"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
