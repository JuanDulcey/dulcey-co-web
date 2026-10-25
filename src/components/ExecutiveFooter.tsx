import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import { EXECUTIVE_CONTACT_CONFIG } from '../data/contact';
import { useColombiaClock } from '../hooks/useColombiaClock';

interface ExecutiveFooterProps {
  onOpenContact: () => void;
}

/**
 * Footer Ejecutivo & Acción de Contacto (Sección 5.5)
 * - Izquierda: Derechos reservados e identidad desde Colombia.
 * - Centro: Latencia simulada nominal + reloj en tiempo real con hora local de Colombia (UTC-5).
 * - Derecha: Botón magnético de alto contraste con borde dorado e iluminación al pasar el mouse.
 */
export function ExecutiveFooter({ onOpenContact }: ExecutiveFooterProps) {
  const { colombiaTime, latencyMs } = useColombiaClock();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMagneticMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.18;
    const deltaY = (e.clientY - centerY) * 0.24;
    rawX.set(Math.max(-10, Math.min(10, deltaX)));
    rawY.set(Math.max(-6, Math.min(6, deltaY)));
  };

  const handleMagneticLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <footer
      data-gsap-reveal
      className="relative z-10 flex flex-col gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-9"
    >
      {/* Izquierda: Copyright Oficial */}
      <div className="max-w-md font-mono text-[10px] sm:text-[11px] leading-relaxed tracking-[0.11em] text-[var(--text-muted)]">
        {EXECUTIVE_CONTACT_CONFIG.copyright}
      </div>

      {/* Centro: Latencia Simulada y Reloj Horológico en Tiempo Real (Colombia UTC-5) */}
      <div className="flex flex-wrap items-center gap-3 rounded-sm border border-[var(--border-hairline)] bg-[#060609]/90 px-3.5 py-2 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[var(--text-platinum)]">
        <span className="inline-flex items-center gap-1.5 text-[var(--accent-gold)]">
          <Activity className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
          <span>LATENCY {latencyMs}ms</span>
        </span>

        <span className="text-[var(--text-muted)]" aria-hidden="true">
          //
        </span>

        <span className="inline-flex items-center gap-1.5 tabular-nums text-[var(--text-ivory)]">
          <Clock
            className="h-3.5 w-3.5 text-[var(--accent-gold)]"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <span>{colombiaTime} COT (UTC-5)</span>
        </span>
      </div>

      {/* Derecha: Botón Magnético de Alto Contraste */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onOpenContact}
        onPointerMove={handleMagneticMove}
        onPointerLeave={handleMagneticLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.985 }}
        className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-sm border border-[var(--border-active)] bg-gradient-to-b from-[#13110C] to-[#08080B] px-6 py-3.5 font-mono text-[11px] sm:text-xs font-normal tracking-[0.15em] text-[var(--accent-gold-light)] shadow-goldGlow transition-all duration-300 hover:border-[var(--accent-gold-light)] hover:text-[#040405] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
      >
        {/* Capa de baño de oro líquido en hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[var(--accent-gold)] via-[var(--accent-gold-light)] to-[var(--accent-gold)] transition-transform duration-500 ease-out group-hover:translate-x-0"
        />

        <span className="relative z-10">AGENDAR CONSULTORÍA PRIVADA -&gt;</span>
      </motion.button>
    </footer>
  );
}
