import { EXECUTIVE_COMMITMENTS, HERO_MANIFESTO } from '../data/services';

/**
 * Manifiesto Principal de la Firma
 * Jerarquía editorial pura en `EB Garamond`, bloques balanceados sin palabras huérfanas
 * y compromisos institucionales verificables.
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="dulcey-hero-heading"
      className="relative z-10 px-5 py-11 sm:px-10 sm:py-16 lg:px-14 lg:py-20 print:py-8"
    >
      <div className="max-w-4xl">
        {/* Antetítulo en versalitas doradas */}
        <div className="inline-flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-6 sm:w-7 shrink-0 bg-[var(--accent-gold)]" />
          <span className="font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[var(--accent-gold)]">
            {HERO_MANIFESTO.overline}
          </span>
        </div>

        {/* Titular Editorial en EB Garamond con balance tipográfico */}
        <h1
          id="dulcey-hero-heading"
          className="mt-6 sm:mt-7 font-serif font-normal text-balance text-[var(--text-ivory)] tracking-[-0.01em]"
          style={{
            fontSize: 'clamp(2.2rem, 4.7vw, 4.35rem)',
            lineHeight: 1.08,
          }}
        >
          {HERO_MANIFESTO.headlinePrefix}
          <em className="italic font-normal text-[var(--accent-gold)]">
            {HERO_MANIFESTO.headlineHighlight}
          </em>
          {HERO_MANIFESTO.headlineSuffix}
        </h1>

        {/* Párrafo Institucional sin viudas tipográficas */}
        <p className="mt-7 sm:mt-8 max-w-[660px] font-sans text-[15.5px] sm:text-[17px] font-light leading-[1.82] text-pretty text-[var(--text-platinum)]">
          {HERO_MANIFESTO.paragraph}
        </p>
      </div>

      {/* Garantías Ejecutivas de la Firma (Autoridad Honesta, Cero Cifras Ficticias) */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-5 border-t border-[var(--border-hairline)] pt-7 sm:grid-cols-3 sm:gap-8 print:mt-6 print:grid-cols-3 print:pt-5">
        {EXECUTIVE_COMMITMENTS.map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--accent-gold-light)]">
              {item.label}
            </p>
            <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-pretty text-[var(--text-platinum)]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
