import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { EXECUTIVE_CONTACT_CONFIG } from '../data/contact';

interface NavbarProps {
  onOpenContact: () => void;
}

/**
 * Cabecera tipo Membrete de Papelería Privada
 * - Móvil: compacta (~150px) — emblema + nombre, y una sola línea con sede corta y selector de tema.
 * - Escritorio: sede completa, selector de tema y enlace sobrio hacia contacto ejecutivo directo.
 */
export function Navbar({ onOpenContact }: NavbarProps) {
  return (
    <header className="relative z-10 flex flex-col gap-4 px-5 py-5 sm:gap-5 sm:px-10 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-9">
      <BrandLogo />

      <div className="flex flex-col gap-2.5 border-t border-[var(--border-hairline)] pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:pt-4 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
        <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-3.5">
          <p className="whitespace-nowrap font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--text-platinum)]">
            <span className="sm:hidden">{EXECUTIVE_CONTACT_CONFIG.locationShort}</span>
            <span className="hidden sm:inline">{EXECUTIVE_CONTACT_CONFIG.location}</span>
          </p>
          <span aria-hidden="true" className="hidden h-3 w-px bg-[var(--border-hairline)] sm:block print:hidden" />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={onOpenContact}
          className="group hidden self-start border-b border-[rgba(197,160,89,0.42)] pb-0.5 text-left font-sans text-[10.5px] sm:inline-block sm:self-auto sm:text-[11px] font-normal uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)] print:hidden"
        >
          <span>{EXECUTIVE_CONTACT_CONFIG.directActionLabel}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
          >
            {'\u00A0→'}
          </span>
        </button>

        {/* Coordenadas de contacto visibles únicamente en Dossier Impreso / PDF */}
        <p className="hidden font-sans text-[10px] tracking-[0.08em] text-[var(--text-platinum)] print:block">
          {EXECUTIVE_CONTACT_CONFIG.email} · {EXECUTIVE_CONTACT_CONFIG.websiteUrl.replace('https://', '')}
        </p>
      </div>
    </header>
  );
}
