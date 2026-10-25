import { HERO_MANIFESTO } from '../data/services';

/**
 * Manifiesto Principal de la Firma
 * Jerarquía editorial pura en `EB Garamond` con amplio espacio negativo.
 */
export function HeroSection() {
  return (
    <section
      data-gsap-reveal
      aria-labelledby="dulcey-hero-heading"
      className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
    >
      <div className="max-w-4xl">
        {/* Antetítulo en versalitas doradas */}
        <div className="inline-flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-7 bg-[var(--accent-gold)]" />
          <span className="font-sans text-[10.5px] sm:text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--accent-gold)]">
            {HERO_MANIFESTO.overline}
          </span>
        </div>

        {/* Titular Editorial en EB Garamond */}
        <h1
          id="dulcey-hero-heading"
          className="mt-7 font-serif font-normal text-[var(--text-ivory)] tracking-[-0.01em]"
          style={{
            fontSize: 'clamp(2.45rem, 4.8vw, 4.35rem)',
            lineHeight: 1.08,
          }}
        >
          {HERO_MANIFESTO.headlinePrefix}
          <em className="italic font-normal text-[var(--accent-gold)]">
            {HERO_MANIFESTO.headlineHighlight}
          </em>
          {HERO_MANIFESTO.headlineSuffix}
        </h1>

        {/* Párrafo Institucional */}
        <p className="mt-8 max-w-[650px] font-sans text-base sm:text-[17px] font-light leading-[1.82] text-[var(--text-platinum)]">
          {HERO_MANIFESTO.paragraph}
        </p>
      </div>
    </section>
  );
}
