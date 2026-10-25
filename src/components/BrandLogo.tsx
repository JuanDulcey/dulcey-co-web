import { m } from 'framer-motion';

interface BrandLogoProps {
  compact?: boolean;
}

/**
 * Trazo caligráfico clásico del monograma "D" (proporción Garamond con remates serif)
 * diseñado sobre viewBox 48×48 con regla `evenodd`.
 */
export const DULCEY_MONOGRAM_D_PATH =
  'M 17.2 15.8 H 23.8 C 28.8 15.8 31.8 19.0 31.8 24.0 C 31.8 29.0 28.8 32.2 23.8 32.2 H 17.2 V 31.3 H 18.6 C 19.0 31.3 19.2 31.0 19.2 30.4 V 17.6 C 19.2 17.0 19.0 16.7 18.6 16.7 H 17.2 Z M 21.2 16.8 V 30.5 C 21.2 31.0 21.5 31.2 22.1 31.2 H 23.4 C 27.3 31.2 29.5 28.4 29.5 24.0 C 29.5 19.6 27.3 16.8 23.4 16.8 H 21.2 Z';

/**
 * Identidad Institucional — `<BrandLogo />`
 * Sello octogonal biselado en trazos dorados con monograma clásico "D" grabado,
 * acompañado de la denominación oficial en español de Dulcey & Co.
 */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="group inline-flex items-center gap-3.5 sm:gap-4 select-none">
      {/* Sello Geométrico de la Firma */}
      <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center">
        {/* =====================================================================
            GUÍA PARA EL DESARROLLADOR — REEMPLAZO DE LOGO DEFINITIVO DULCEY & CO.
            =====================================================================
            Para insertar el isotipo o emblema definitivo de "Dulcey & Co.":
            1. Elimina el bloque `<svg>...</svg>` temporal que aparece debajo.
            2. Coloca tu `<svg className="h-10 w-10 text-[var(--accent-gold)]" ...>`
               o una imagen vectorial:
               `<img src="/logo-dulcey.svg" alt="Dulcey & Co." className="h-10 w-10 object-contain" />`
           ===================================================================== */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 sm:h-11 sm:w-11"
          aria-label="Sello institucional de Dulcey & Co."
        >
          {/* Octágono Exterior en Oro Envejecido */}
          <polygon
            points="24,3.2 38.7,9.3 44.8,24 38.7,38.7 24,44.8 9.3,38.7 3.2,24 9.3,9.3"
            stroke="var(--accent-gold)"
            strokeWidth="1.05"
          />

          {/* Octágono Interior de Filigrana Fina */}
          <polygon
            points="24,6.4 36.4,11.6 41.6,24 36.4,36.4 24,41.6 11.6,36.4 6.4,24 11.6,11.6"
            stroke="var(--accent-gold)"
            strokeWidth="0.55"
            strokeOpacity="0.4"
          />

          {/* Índices Cardinales Horológicos */}
          <line x1="24" y1="3.2" x2="24" y2="6.4" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="44.8" y1="24" x2="41.6" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="24" y1="44.8" x2="24" y2="41.6" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="3.2" y1="24" x2="6.4" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.85" />

          {/* Corona Geométrica Sutil Rotatoria Centrada en (24, 24) */}
          <g transform="translate(24, 24)" className="print:hidden">
            <m.g
              animate={{ rotate: 360 }}
              transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
            >
              <polygon
                points="0,-15.2 15.2,0 0,15.2 -15.2,0"
                stroke="var(--accent-gold)"
                strokeWidth="0.5"
                strokeOpacity="0.28"
              />
            </m.g>
          </g>

          {/* Monograma Serif Clásico "D" Grabado en el Centro */}
          <path
            d={DULCEY_MONOGRAM_D_PATH}
            fill="var(--accent-gold-light)"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        {/* =================== FIN DE BLOQUE SVG TEMPORAL =================== */}
      </div>

      {/* Denominación Institucional */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-serif font-normal uppercase tracking-[0.24em] sm:tracking-[0.26em] text-[var(--text-ivory)] ${
            compact ? 'text-base sm:text-lg' : 'text-[17px] sm:text-[21px]'
          } leading-none`}
        >
          DULCEY &amp; CO.
        </span>
        <span className="mt-1.5 font-sans text-[9px] sm:text-[10.5px] font-normal uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-gold)] leading-tight">
          INGENIERÍA COMPUTACIONAL Y SOFTWARE A MEDIDA
        </span>
      </div>
    </div>
  );
}
