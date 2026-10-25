import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { EXECUTIVE_CONTACT_CONFIG } from '../data/contact';
import { useColombiaClock } from '../hooks/useColombiaClock';

interface ExecutiveFooterProps {
  onOpenContact: () => void;
}

/**
 * Pie Institucional de la Tarjeta
 * Derechos reservados, hora local en Colombia (HH:MM) y botón principal sobrio.
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
    <footer
      data-gsap-reveal
      className="relative z-10 flex flex-col gap-6 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-9"
    >
      {/* Izquierda: Derechos Reservados */}
      <p className="font-sans text-[11px] font-light leading-relaxed tracking-[0.08em] text-[var(--text-muted)]">
        {EXECUTIVE_CONTACT_CONFIG.copyright}
      </p>

      {/* Centro: Hora Local en Colombia (Serena, sin segundos ni latencia artificial) */}
      <p className="font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-[var(--text-platinum)] tabular-nums">
        Hora local en Colombia <span className="mx-1.5 text-[var(--accent-gold)]">·</span>{' '}
        <span className="text-[var(--text-ivory)]">{colombiaTime}</span>
      </p>

      {/* Derecha: Acción Principal Magnética */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onOpenContact}
        onPointerMove={handleMagneticMove}
        onPointerLeave={handleMagneticLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.99 }}
        className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 sm:gap-3 overflow-hidden whitespace-nowrap border border-[var(--border-active)] bg-[#0B0A08] px-5 sm:px-7 py-3.5 font-sans text-[10.5px] sm:text-[11px] font-normal uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:bg-[var(--accent-gold)] hover:text-[#040405] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
      >
        <span>Agendar Consultoría Privada</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </motion.button>
    </footer>
  );
}
