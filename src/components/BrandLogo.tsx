interface BrandLogoProps {
  compact?: boolean;
}

/**
 * Trazo caligráfico clásico del monograma "D" (proporción Garamond con remates serif)
 * mantenido para compatibilidad de firma y utilidades gráficas.
 */
export const DULCEY_MONOGRAM_D_PATH =
  'M 17.2 15.8 H 23.8 C 28.8 15.8 31.8 19.0 31.8 24.0 C 31.8 29.0 28.8 32.2 23.8 32.2 H 17.2 V 31.3 H 18.6 C 19.0 31.3 19.2 31.0 19.2 30.4 V 17.6 C 19.2 17.0 19.0 16.7 18.6 16.7 H 17.2 Z M 21.2 16.8 V 30.5 C 21.2 31.0 21.5 31.2 22.1 31.2 H 23.4 C 27.3 31.2 29.5 28.4 29.5 24.0 C 29.5 19.6 27.3 16.8 23.4 16.8 H 21.2 Z';

/**
 * Identidad Institucional — `<BrandLogo />`
 * Emblema oficial de Dulcey & Co. blindado contra copia, descarga y arrastre,
 * con doble capa protectora y soporte para modo oscuro, claro y móvil.
 */
export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="group inline-flex items-center gap-3.5 sm:gap-4 select-none">
      {/* Emblema Oficial de la Firma (Blindado contra copia/descarga) */}
      <div
        data-protected-media
        className={`relative flex shrink-0 items-center justify-center ${
          compact ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-[52px] w-[52px] sm:h-14 sm:w-14'
        }`}
      >
        <picture className="pointer-events-none select-none">
          <source srcSet="/logo-square-512.webp" type="image/webp" />
          <img
            src="/logo-square-512.png"
            alt="Dulcey & Co."
            width={56}
            height={56}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none h-full w-full select-none object-contain drop-shadow-[0_2px_10px_rgba(197,160,89,0.22)] transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
        </picture>
        {/* Escudo invisible protector de puntero y pulsación táctil */}
        <div
          className="absolute inset-0 z-10 bg-transparent"
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
        />
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
        <span className="mt-1.5 hidden sm:block font-sans text-[10.5px] font-normal uppercase tracking-[0.18em] text-[var(--accent-gold)] leading-tight print:block">
          INGENIERÍA COMPUTACIONAL Y SOFTWARE A MEDIDA
        </span>
      </div>
    </div>
  );
}
