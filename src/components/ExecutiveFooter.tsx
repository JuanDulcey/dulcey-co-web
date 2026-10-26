import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { EXECUTIVE_CONTACT_CONFIG, downloadExecutiveVCard } from '../data/contact';
import { useColombiaClock } from '../hooks/useColombiaClock';

interface ExecutiveFooterProps {
  onOpenContact: () => void;
}

/**
 * Pie Institucional de la Tarjeta
 * - Disposición sin recortes en `1024px` (`xl:flex-row` + `shrink-0`).
 * - Accesos discretos de papelería corporativa: Guardar Contacto (.vcf) y Dossier PDF.
 */
export function ExecutiveFooter({ onOpenContact }: ExecutiveFooterProps) {
  const colombiaTime = useColombiaClock();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  const handleMagneticMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.2;
    rawX.set(Math.max(-8, Math.min(8, deltaX)));
    rawY.set(Math.max(-5, Math.min(5, deltaY)));
  };

  const handleMagneticLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <footer className="relative z-10 flex flex-col gap-6 px-5 py-8 sm:px-10 lg:px-14 lg:py-9 xl:flex-row xl:items-center xl:justify-between print:py-5">
      {/* Izquierda: Derechos Reservados y Utilidades Discretas de Tarjeta */}
      <div className="space-y-2.5">
        <p className="font-sans text-[11px] font-light leading-relaxed tracking-[0.06em] text-[var(--text-muted)]">
          {EXECUTIVE_CONTACT_CONFIG.copyright}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 print:hidden">
          <button
            type="button"
            onClick={downloadExecutiveVCard}
            className="border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--accent-gold)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
          >
            Guardar contacto (.vcf)
          </button>

          <span aria-hidden="true" className="text-[10px] text-[var(--text-muted)]">
            ·
          </span>

          <button
            type="button"
            onClick={() => window.print()}
            className="border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--text-platinum)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
          >
            Dossier PDF
          </button>
        </div>
      </div>

      {/* Centro y Derecha: Reloj Local + Acción Principal sin compresión en 1024px */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between xl:justify-end xl:gap-8">
        <p className="font-sans text-[10.5px] sm:text-[11px] font-normal uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--text-platinum)] tabular-nums print:hidden">
          Hora local en Colombia <span className="mx-1.5 text-[var(--accent-gold)]">·</span>{' '}
          <span className="text-[var(--text-ivory)]">{colombiaTime}</span>
        </p>

        <m.button
          ref={buttonRef}
          type="button"
          onClick={onOpenContact}
          onPointerMove={handleMagneticMove}
          onPointerLeave={handleMagneticLeave}
          style={{ x: springX, y: springY }}
          whileTap={{ scale: 0.99 }}
          className="group relative inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-[var(--border-active)] bg-[var(--surface-elevated)] px-4 sm:px-7 py-3.5 font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.13em] sm:tracking-[0.2em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:bg-[var(--accent-gold)] hover:text-white dark:hover:text-[#040405] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)] print:hidden"
        >
          <span>Agendar Consultoría Privada</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </m.button>
      </div>
    </footer>
  );
}
