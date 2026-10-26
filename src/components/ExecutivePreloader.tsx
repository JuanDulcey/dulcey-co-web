import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { DULCEY_MONOGRAM_D_PATH } from './BrandLogo';

const SESSION_KEY = 'dulcey_apertura_sesion_v3';

function shouldRunOpeningMonogram(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
}

/**
 * Apertura Silenciosa de Monograma (~1.2s en primera visita de sesión)
 * Implementada íntegramente sobre Framer Motion ligero (`m`), eliminando la
 * dependencia extra de `gsap` (~70 kB) sin perder fluidez horológica.
 */
export function ExecutivePreloader() {
  const initialRunRef = useRef<boolean>(shouldRunOpeningMonogram());
  const [visible, setVisible] = useState<boolean>(initialRunRef.current);

  useEffect(() => {
    if (!initialRunRef.current) return;

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Ignorar restricciones de almacenamiento en navegación privada
      }
      setVisible(false);
    }, 1050);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="dulcey-opening-monogram"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-obsidian)] px-6 select-none print:hidden"
        >
          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="mb-5 h-16 w-16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <m.polygon
                points="24,3.2 38.7,9.3 44.8,24 38.7,38.7 24,44.8 9.3,38.7 3.2,24 9.3,9.3"
                stroke="var(--accent-gold)"
                strokeWidth="1.05"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              />
              <m.polygon
                points="24,6.4 36.4,11.6 41.6,24 36.4,36.4 24,41.6 11.6,36.4 6.4,24 11.6,11.6"
                stroke="var(--accent-gold-light)"
                strokeWidth="0.6"
                strokeOpacity="0.45"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
              />
              <m.path
                d={DULCEY_MONOGRAM_D_PATH}
                fill="var(--accent-gold-light)"
                fillRule="evenodd"
                clipRule="evenodd"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
              />
            </svg>

            <m.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
              className="font-serif text-sm uppercase tracking-[0.34em] text-[var(--text-ivory)]"
            >
              DULCEY &amp; CO.
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
