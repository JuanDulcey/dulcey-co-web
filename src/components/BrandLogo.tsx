import { motion } from 'framer-motion';

interface BrandLogoProps {
  compact?: boolean;
}

/**
 * Componente Modular de Identidad — `<BrandLogo />` (Sección 1 & 5.1)
 * Presenta el emblema geométrico temporal de alta relojería junto con
 * la firma tipográfica oficial de Dulcey & Co.
 */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="group inline-flex items-center gap-3.5 sm:gap-4 select-none">
      {/* Contenedor del Emblema Geométrico */}
      <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-sm border border-[var(--border-hairline)] bg-[#070709]/90 transition-colors duration-500 group-hover:border-[var(--border-active)]">
        {/* =====================================================================
            GUÍA PARA EL DESARROLLADOR — REEMPLAZO DE LOGO DEFINITIVO DULCEY & CO.
            =====================================================================
            Para insertar tu propio ícono/logo definitivo de "Dulcey & Co.":
            1. Elimina el bloque `<svg>...</svg>` temporal que aparece justo debajo.
            2. Pega tu `<svg className="h-7 w-7 text-[var(--accent-gold)]" ...>`
               o inserta una imagen optimizada:
               `<img src="/tu-logo-dulcey.svg" alt="Dulcey & Co." className="h-7 w-7 object-contain" />`
            El marco biselado, espaciado y tipografía adyacente se adaptarán solos.
           ===================================================================== */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 sm:h-8 sm:w-8"
          aria-label="Emblema Dulcey & Co."
        >
          {/* Octágono Exterior de Precisión Horológica */}
          <polygon
            points="24,3.5 38.5,9.5 44.5,24 38.5,38.5 24,44.5 9.5,38.5 3.5,24 9.5,9.5"
            stroke="var(--accent-gold)"
            strokeWidth="1.15"
            fill="rgba(197, 160, 89, 0.03)"
          />

          {/* Índices Cardinales de Calibración */}
          <line x1="24" y1="3.5" x2="24" y2="7.5" stroke="var(--accent-gold-light)" strokeWidth="0.9" />
          <line x1="44.5" y1="24" x2="40.5" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.9" />
          <line x1="24" y1="44.5" x2="24" y2="40.5" stroke="var(--accent-gold-light)" strokeWidth="0.9" />
          <line x1="3.5" y1="24" x2="7.5" y2="24" stroke="var(--accent-gold-light)" strokeWidth="0.9" />

          {/* Octágono Interior Fino */}
          <polygon
            points="24,10 33.9,14.1 38,24 33.9,33.9 24,38 14.1,33.9 10,24 14.1,14.1"
            stroke="var(--accent-gold)"
            strokeOpacity="0.42"
            strokeWidth="0.75"
          />

          {/* Núcleo Geométrico Animado Suavemente centrado exactamente en (24, 24) */}
          <g transform="translate(24, 24)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            >
              <polygon
                points="0,-10.5 10.5,0 0,10.5 -10.5,0"
                stroke="var(--accent-gold-light)"
                strokeWidth="0.95"
                strokeOpacity="0.88"
              />
              <rect
                x="-7.4"
                y="-7.4"
                width="14.8"
                height="14.8"
                stroke="var(--accent-gold)"
                strokeWidth="0.65"
                strokeOpacity="0.48"
              />
            </motion.g>
          </g>

          {/* Rubí / Pivote Central Metálico */}
          <motion.circle
            cx="24"
            cy="24"
            r="2.2"
            fill="var(--accent-gold-light)"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        {/* =================== FIN DE BLOQUE SVG TEMPORAL =================== */}

        {/* Micro-biseles en las esquinas del escudo */}
        <span className="pointer-events-none absolute -left-px -top-px h-1.5 w-1.5 border-l border-t border-[var(--accent-gold)]" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-1.5 w-1.5 border-b border-r border-[var(--accent-gold)]" />
      </div>

      {/* Bloque Tipográfico de Firma */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-medium uppercase tracking-[0.25em] text-[var(--text-ivory)] ${
            compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          } leading-none`}
        >
          DULCEY &amp; CO.
        </span>
        <span className="mt-1.5 font-mono text-[9px] sm:text-[10px] font-normal uppercase tracking-[0.14em] text-[var(--accent-gold)] leading-tight">
          COMPUTATIONAL ENGINEERING &amp; BESPOKE SOFTWARE
        </span>
      </div>
    </div>
  );
}
