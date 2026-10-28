import type { ReactNode } from 'react';
import { m } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Aparición Editorial al Desplazarse — `<Reveal />`
 * Fundido + 12px de desplazamiento, una sola vez por sesión de página.
 * Respeta `prefers-reduced-motion` vía `MotionConfig reducedMotion="user"`
 * y se fuerza visible en impresión (`[data-reveal]` en `@media print`).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}
