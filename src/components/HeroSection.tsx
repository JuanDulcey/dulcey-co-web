import { HERO_MANIFESTO } from '../data/services';

/**
 * Sección Hero — Manifiesto de Marca (Sección 5.2)
 * Presenta la declaración editorial central con tipografía serif clásica
 * de alto contraste (`EB Garamond`) y acento dorado en cursiva.
 */
export function HeroSection() {
  return (
    <section
      data-gsap-reveal
      aria-labelledby="dulcey-hero-heading"
      className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20"
    >
      {/* Sutil retícula calibrada lateral en pantallas amplias */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden xl:flex flex-col items-end gap-2 absolute right-12 top-20 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]"
      >
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-[var(--border-hairline)]" />
          <span>CALIBRE // 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-[var(--border-hairline)]" />
          <span className="text-gold/75">BESPOKE ARCHITECTURE</span>
        </div>
      </div>

      <div className="max-w-5xl">
        {/* Etiqueta superior técnica */}
        <div className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs font-normal tracking-[0.18em] text-[var(--accent-gold)]">
          <span>{HERO_MANIFESTO.tag}</span>
          <span
            aria-hidden="true"
            className="hidden sm:inline-block h-px w-12 bg-gradient-to-r from-gold/50 to-transparent"
          />
        </div>

        {/* Título Principal Imponente: clamp(2.5rem, 5vw, 4.5rem), line-height 1.08 */}
        <h1
          id="dulcey-hero-heading"
          className="mt-6 font-serif font-normal text-[var(--text-ivory)] tracking-[-0.01em]"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.08,
          }}
        >
          {HERO_MANIFESTO.headlinePrefix}
          <em className="italic font-normal text-[var(--accent-gold)]">
            {HERO_MANIFESTO.headlineHighlight}
          </em>
          {HERO_MANIFESTO.headlineSuffix}
        </h1>

        {/* Párrafo Ejecutivo: Inter peso 300, --text-platinum, max-width 680px */}
        <p className="mt-7 max-w-[680px] font-sans text-base sm:text-[17px] font-light leading-[1.75] text-[var(--text-platinum)]">
          {HERO_MANIFESTO.paragraph}
        </p>

        {/* Micro-barra de índices horológicos inferiores */}
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--accent-gold)]" />
            04 PILARES DE INGENIERÍA
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            ARQUITECTURA PROPIETARIA
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            RIGOR MATEMÁTICO
          </span>
        </div>
      </div>
    </section>
  );
}
