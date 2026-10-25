interface EngravedCornersProps {
  /** Intensifica el brillo de las esquinas cuando un módulo está activo o en foco */
  active?: boolean;
  className?: string;
}

/**
 * Esquinas Grabadas (Engraved Corners — Sección 4.4)
 * Remates geométricos exactos de 8px (`w-2 h-2`) en color `--accent-gold`
 * simulando el biselado milimétrico de una caja de alta relojería.
 */
export function EngravedCorners({ active = false, className = '' }: EngravedCornersProps) {
  const strokeTone = active
    ? 'border-[var(--accent-gold-light)] opacity-100'
    : 'border-[var(--accent-gold)] opacity-75 group-hover:opacity-100';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 overflow-visible ${className}`}
    >
      {/* Superior Izquierda */}
      <span
        className={`absolute -left-px -top-px h-[8px] w-[8px] border-l border-t transition-opacity duration-300 ${strokeTone}`}
      />
      {/* Superior Derecha */}
      <span
        className={`absolute -right-px -top-px h-[8px] w-[8px] border-r border-t transition-opacity duration-300 ${strokeTone}`}
      />
      {/* Inferior Izquierda */}
      <span
        className={`absolute -bottom-px -left-px h-[8px] w-[8px] border-b border-l transition-opacity duration-300 ${strokeTone}`}
      />
      {/* Inferior Derecha */}
      <span
        className={`absolute -bottom-px -right-px h-[8px] w-[8px] border-b border-r transition-opacity duration-300 ${strokeTone}`}
      />
    </div>
  );
}
