import { ArrowUpRight, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { EXECUTIVE_CONTACT_CONFIG } from '../data/contact';

interface NavbarProps {
  onOpenContact: () => void;
}

/**
 * Header de la Tarjeta Ejecutiva — `Navbar.tsx` (Sección 5.1 + Decisión 8)
 * - Izquierda: `<BrandLogo />` modular.
 * - Derecha: Telemetría regional de Villa de Leyva + Indicador pulsante en vivo
 *   `SYSTEMS NOMINAL // DISPONIBILIDAD EJECUTIVA` que opera como atajo directo al Modal.
 */
export function Navbar({ onOpenContact }: NavbarProps) {
  return (
    <header
      data-gsap-reveal
      className="relative z-10 flex flex-col gap-5 px-5 py-6 sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-8"
    >
      {/* Izquierda: Identidad de Marca */}
      <BrandLogo />

      {/* Derecha: Telemetría Regional e Indicador Interactivo de Estado */}
      <div className="flex flex-col items-start gap-2.5 border-t border-[var(--border-hairline)] pt-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
        {/* Ubicación y Coordenadas */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-platinum)]">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-ivory)]">
            <MapPin
              className="h-3.5 w-3.5 text-[var(--accent-gold)]"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            {EXECUTIVE_CONTACT_CONFIG.location}
          </span>
          <span className="hidden sm:inline text-[var(--text-muted)]" aria-hidden="true">
            |
          </span>
          <span className="text-[var(--text-muted)]">{EXECUTIVE_CONTACT_CONFIG.coordinates}</span>
        </div>

        {/* Badge en vivo interactivo -> Abre Modal de Consultoría Privada */}
        <button
          type="button"
          onClick={onOpenContact}
          className="group inline-flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2.5 rounded-sm border border-[var(--border-hairline)] bg-[#08080B]/85 px-3 py-2 sm:py-1.5 font-mono text-[10px] tracking-[0.13em] text-[var(--text-platinum)] transition-all duration-300 hover:border-[var(--border-active)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
          aria-label="Disponibilidad ejecutiva activa — Abrir modal de consultoría privada"
        >
          <span className="inline-flex items-center gap-2.5">
            {/* Punto verde esmeralda pulsante (#10B981) */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            </span>

            <span className="text-left">{EXECUTIVE_CONTACT_CONFIG.statusText}</span>
          </span>

          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 text-[var(--accent-gold)] opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
