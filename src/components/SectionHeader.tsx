interface SectionHeaderProps {
  id: string;
  title: string;
  aside: string;
}

/** Cabecera de sección de borde a borde (antetítulo dorado + nota itálica en Garamond) */
export function SectionHeader({ id, title, aside }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-[var(--border-hairline)] px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-10 sm:py-6 lg:px-14">
      <h2
        id={id}
        className="font-sans text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--accent-gold)]"
      >
        {title}
      </h2>
      <p className="font-serif text-base italic text-[var(--text-platinum)]">{aside}</p>
    </div>
  );
}
