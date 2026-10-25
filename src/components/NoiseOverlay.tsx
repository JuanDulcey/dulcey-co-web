/**
 * Textura Analógica (Noise Overlay — Sección 4.2)
 * Filtro SVG `<feTurbulence>` fijo en toda la pantalla con `opacity: 0.025`
 * y `pointer-events: none` para textura sutil de papel moneda / metal cepillado.
 */
export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.025]"
    >
      <filter id="dulcey-analog-turbulence">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#dulcey-analog-turbulence)" />
    </svg>
  );
}
