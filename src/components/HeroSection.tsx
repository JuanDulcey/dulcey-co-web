import { m } from 'framer-motion';
import { EXECUTIVE_COMMITMENTS, HERO_MANIFESTO } from '../data/services';
import {
  EXECUTIVE_CONTACT_CONFIG,
  buildDirectMailtoUrl,
  buildDirectWhatsAppUrl,
  downloadExecutiveVCard,
  hasRealWhatsApp,
} from '../data/contact';

const linkClass =
  'group inline-flex items-center border-b border-[var(--border-hairline)] pb-1 font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.18em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]';

/** 60 índices horológicos (cada 5 uno mayor) para el anillo que orbita el emblema */
const DIAL_TICKS = Array.from({ length: 60 }, (_, i) => i);

/**
 * Emblema Protagonista — logo oficial con halo dorado y anillo horológico en rotación lenta.
 * Blindado contra copia (doble capa + `data-protected-media`).
 */
function HeroEmblem() {
  return (
    <div
      data-protected-media
      aria-hidden="true"
      className="relative mx-auto aspect-square w-[150px] select-none sm:w-[200px] lg:w-full lg:max-w-[380px]"
    >
      {/* Halo ambiental */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.20)_0%,rgba(197,160,89,0.06)_45%,transparent_70%)] blur-2xl print:hidden" />

      {/* Anillo horológico */}
      <m.svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-0 h-full w-full print:hidden"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="97" fill="none" stroke="var(--accent-gold)" strokeOpacity="0.32" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--accent-gold)" strokeOpacity="0.14" strokeWidth="0.3" />
        {DIAL_TICKS.map((i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="100"
              y1="3"
              x2="100"
              y2={major ? 9.5 : 6.5}
              stroke="var(--accent-gold)"
              strokeOpacity={major ? 0.7 : 0.3}
              strokeWidth={major ? 0.7 : 0.35}
              transform={`rotate(${i * 6} 100 100)`}
            />
          );
        })}
      </m.svg>

      {/* Emblema oficial */}
      <m.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[13%]"
      >
        <picture className="pointer-events-none select-none">
          <source srcSet="/logo-square-512.webp" type="image/webp" />
          <img
            src="/logo-square-512.png"
            alt=""
            width={380}
            height={380}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none h-full w-full select-none object-contain drop-shadow-[0_10px_40px_rgba(197,160,89,0.28)]"
          />
        </picture>
      </m.div>

      {/* Escudo invisible anticopia */}
      <div className="absolute inset-0 z-10 bg-transparent" onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}

/**
 * Manifiesto Principal de la Firma
 * Titular editorial en `EB Garamond`, emblema protagonista y accesos discretos de tarjeta.
 */
export function HeroSection() {
  const showWhatsApp = hasRealWhatsApp();

  return (
    <section
      aria-labelledby="dulcey-hero-heading"
      className="relative z-10 px-5 py-9 sm:px-10 sm:py-16 lg:px-14 lg:py-20 print:py-8"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Emblema: arriba y centrado en móvil, a la derecha en escritorio */}
        <div className="lg:order-2 lg:col-span-5 print:hidden">
          <HeroEmblem />
        </div>

        <div className="lg:order-1 lg:col-span-7">
          {/* Antetítulo en versalitas doradas */}
          <div className="inline-flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-6 sm:w-7 shrink-0 bg-[var(--accent-gold)]" />
            <span className="font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[var(--accent-gold)]">
              {HERO_MANIFESTO.overline}
            </span>
          </div>

          {/* Titular Editorial */}
          <h1
            id="dulcey-hero-heading"
            className="mt-6 sm:mt-7 font-serif font-normal text-balance text-[var(--text-ivory)] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.15rem, 4.4vw, 4.1rem)', lineHeight: 1.08 }}
          >
            {HERO_MANIFESTO.headlinePrefix}
            <em className="italic font-normal text-[var(--accent-gold)]">
              {HERO_MANIFESTO.headlineHighlight}
            </em>
            {HERO_MANIFESTO.headlineSuffix}
          </h1>

          {/* Párrafo Institucional */}
          <p className="mt-6 sm:mt-7 max-w-[600px] font-sans text-[15.5px] sm:text-[17px] font-light leading-[1.75] text-pretty text-[var(--text-platinum)]">
            {HERO_MANIFESTO.paragraph}
          </p>

          {/* Accesos discretos de tarjeta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 print:hidden">
            <button type="button" onClick={downloadExecutiveVCard} className={linkClass}>
              Guardar contacto
              <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </button>

            {showWhatsApp ? (
              <a href={buildDirectWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Escribir por WhatsApp
                <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            ) : (
              <a href={buildDirectMailtoUrl()} className={linkClass}>
                Escribir por correo
                <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            )}
          </div>

          <p className="hidden print:block mt-4 font-sans text-[10px] text-[var(--text-platinum)]">
            {EXECUTIVE_CONTACT_CONFIG.email}
          </p>
        </div>
      </div>

      {/* Garantías Ejecutivas de la Firma */}
      <div className="mt-11 sm:mt-14 grid grid-cols-1 gap-5 border-t border-[var(--border-hairline)] pt-7 sm:grid-cols-3 sm:gap-8 print:mt-6 print:grid-cols-3 print:pt-5">
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
