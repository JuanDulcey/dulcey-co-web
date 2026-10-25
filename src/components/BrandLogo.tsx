import { motion } from 'framer-motion';

interface BrandLogoProps {
  compact?: boolean;
}

/**
 * Identidad Institucional — `<BrandLogo />`
 * Sello octogonal grabado en trazos finos dorados junto con la denominación
 * oficial en español de Dulcey & Co.
 */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="group inline-flex items-center gap-4 select-none">
      {/* Sello Geométrico de la Firma (sin caja pesada exterior, grabado directo sobre la tarjeta) */}
      <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center">
        {/* =====================================================================
            GUÍA PARA EL DESARROLLADOR — REEMPLAZO DE LOGO DEFINITIVO DULCEY & CO.
            =====================================================================
            Para insertar el isotipo o emblema definitivo de "Dulcey & Co.":
            1. Elimina el bloque `<svg>...</svg>` temporal que aparece debajo.
            2. Coloca tu `<svg className="h-9 w-9 text-[var(--accent-gold)]" ...>`
               o una imagen vectorial:
               `<img src="/logo-dulcey.svg" alt="Dulcey & Co." className="h-9 w-9 object-contain" />`
           ===================================================================== */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10"
          aria-label="Emblema Dulcey & Co."
        >
          {/* Octágono Exterior en Oro Envejecido */}
          <polygon
            points="24,3.5 38.5,9.5 44.5,24 38.5,38.5 24,44.5 9.5,38.5 3.5,24 9.5,9.5"
            stroke="var(--accent-gold)"
            strokeWidth="1.05"
          />

          {/* Índices Cardinales */}
          <line x1="24" y1="3.5" x2="24" y2="7" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="44.5" y1="24" x2="41" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="24" y1="44.5" x2="24" y2="41" stroke="var(--accent-gold-light)" strokeWidth="0.85" />
          <line x1="3.5" y1="24" x2="7" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.85" />

          {/* Núcleo Geométrico Centrado en (24, 24) */}
          <g transform="translate(24, 24)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
            >
              <polygon
                points="0,-11 11,0 0,11 -11,0"
                stroke="var(--accent-gold-light)"
                strokeWidth="0.9"
                strokeOpacity="0.85"
              />
              <rect
                x="-7.6"
                y="-7.6"
                width="15.2"
                height="15.2"
                stroke="var(--accent-gold)"
                strokeWidth="0.6"
                strokeOpacity="0.42"
              />
            </motion.g>
          </g>

          <circle cx="24" cy="24" r="1.8" fill="var(--accent-gold-light)" />
        </svg>
        {/* =================== FIN DE BLOQUE SVG TEMPORAL =================== */}
      </div>

      {/* Denominación Institucional */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-normal uppercase tracking-[0.26em] text-[var(--text-ivory)] ${
            compact ? 'text-base sm:text-lg' : 'text-lg sm:text-[21px]'
          } leading-none`}
        >
          DULCEY &amp; CO.
        </span>
        <span className="mt-1.5 font-sans text-[9.5px] sm:text-[10.5px] font-normal uppercase tracking-[0.18em] text-[var(--accent-gold)] leading-tight">
          INGENIERÍA COMPUTACIONAL Y SOFTWARE A MEDIDA
        </span>
      </div>
    </div>
  );
}
