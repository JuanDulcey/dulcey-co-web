import { PHILOSOPHY_PILLARS } from '../data/services';
import { EngravedCorners } from './EngravedCorners';
import { useSpotlight } from '../hooks/useSpotlight';

/**
 * Sección de Metodología / Filosofía — "El Estándar Dulcey & Co." (Sección 5.4)
 * Franja horizontal dividida en 3 columnas minimalistas con bordes sutiles
 * y remates horológicos grabados.
 */
export function PhilosophyBar() {
  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLDivElement>();

  return (
    <section
      data-gsap-reveal
      aria-labelledby="dulcey-philosophy-heading"
      className="relative z-10 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          id="dulcey-philosophy-heading"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent-gold)]"
        >
          [ EL ESTÁNDAR DULCEY &amp; CO. // FILOSOFÍA DE FIRMA ]
        </h2>
        <span
          aria-hidden="true"
          className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-l from-[var(--border-hairline)] to-transparent"
        />
      </div>

      <div
        ref={spotlightRef}
        {...spotlightHandlers}
        className="spotlight-module relative grid grid-cols-1 md:grid-cols-3 rounded-sm border border-[var(--border-hairline)] bg-[#07070A]/80 divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]"
      >
        <EngravedCorners />

        {PHILOSOPHY_PILLARS.map((item) => (
          <article key={item.romanIndex} className="relative z-10 p-5 sm:p-7 lg:p-8">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
              <span>{item.code}</span>
              <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
            </div>

            <h3 className="mt-3.5 font-serif text-lg sm:text-xl font-medium tracking-[0.06em] text-[var(--text-ivory)]">
              {item.title}
            </h3>

            <p className="mt-2.5 font-sans text-sm font-light leading-[1.7] text-[var(--text-platinum)]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
