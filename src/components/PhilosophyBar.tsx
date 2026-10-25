import { PHILOSOPHY_PILLARS } from '../data/services';

/**
 * El Estándar Dulcey & Co. — Tres Columnas con Filetes Continuos
 * Numeración romana clásica en Garamond itálica y sobriedad editorial.
 */
export function PhilosophyBar() {
  return (
    <section
      data-gsap-reveal
      aria-labelledby="dulcey-philosophy-heading"
      className="relative z-10"
    >
      <div className="flex flex-col gap-1.5 border-b border-[var(--border-hairline)] px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-10 lg:px-14">
        <h2
          id="dulcey-philosophy-heading"
          className="font-sans text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--accent-gold)]"
        >
          El Estándar Dulcey &amp; Co.
        </h2>

        <span className="font-serif text-sm italic text-[var(--text-muted)]">
          Principios permanentes de la firma
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-[var(--border-hairline)] md:grid-cols-3 md:divide-x md:divide-y-0">
        {PHILOSOPHY_PILLARS.map((item) => (
          <article
            key={item.romanIndex}
            className="px-6 py-8 sm:px-10 lg:px-14 lg:py-10"
          >
            <span className="block font-serif text-lg italic text-[var(--accent-gold)]">
              {item.romanIndex}.
            </span>

            <h3 className="mt-2.5 font-serif text-xl font-normal text-[var(--text-ivory)]">
              {item.title}
            </h3>

            <p className="mt-3 font-sans text-sm font-light leading-[1.78] text-[var(--text-platinum)]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
