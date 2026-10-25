import { BrandLogo } from './BrandLogo';
import { EXECUTIVE_CONTACT_CONFIG } from '../data/contact';

interface NavbarProps {
  onOpenContact: () => void;
}

/**
 * Cabecera tipo Membrete de Papelería Privada
 * - Izquierda: Identidad institucional `<BrandLogo />`.
 * - Derecha: Ubicación en Villa de Leyva y enlace sobrio subrayado en oro
 *   hacia contacto ejecutivo directo (sin puntos neón ni recuadros de consola).
 */
export function Navbar({ onOpenContact }: NavbarProps) {
  return (
    <header
      data-gsap-reveal
      className="relative z-10 flex flex-col gap-5 px-6 py-7 sm:px-10 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-9"
    >
      <BrandLogo />

      <div className="flex flex-col items-start gap-1.5 border-t border-[var(--border-hairline)] pt-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
        <p className="font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-[var(--text-platinum)]">
          {EXECUTIVE_CONTACT_CONFIG.location}
        </p>

        <button
          type="button"
          onClick={onOpenContact}
          className="group inline-flex items-center gap-2 border-b border-[rgba(197,160,89,0.38)] pb-0.5 font-sans text-[11px] font-normal uppercase tracking-[0.18em] text-[var(--accent-gold)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
        >
          <span>{EXECUTIVE_CONTACT_CONFIG.directActionLabel}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </header>
  );
}
