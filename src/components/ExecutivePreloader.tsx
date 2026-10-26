import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

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
 * Apertura Silenciosa de Emblema (~1.2s en primera visita de sesión)
 * Revelación suave y fluida del emblema oficial andino-computacional de Dulcey & Co.,
 * blindado contra copia y descargas directas.
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
    }, 1150);

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
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-obsidian)] px-6 select-none print:hidden"
        >
          <div className="flex flex-col items-center">
            {/* Contenedor del Emblema con halo sutil y blindaje */}
            <m.div
              data-protected-media
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-5 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 select-none"
            >
              <div
                className="pointer-events-none absolute inset-0 -m-3 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.18)_0%,transparent_70%)] blur-md"
                aria-hidden="true"
              />
              <picture className="pointer-events-none select-none">
                <source srcSet="/logo-square-512.webp" type="image/webp" />
                <img
                  src="/logo-square-512.png"
                  alt="Dulcey & Co."
                  width={96}
                  height={96}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="pointer-events-none relative z-10 h-full w-full select-none object-contain drop-shadow-[0_4px_24px_rgba(197,160,89,0.32)]"
                />
              </picture>
              {/* Escudo invisible frontal */}
              <div
                className="absolute inset-0 z-20 bg-transparent"
                aria-hidden="true"
                onContextMenu={(e) => e.preventDefault()}
              />
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
              className="font-serif text-sm uppercase tracking-[0.34em] text-[var(--text-ivory)]"
            >
              DULCEY &amp; CO.
            </m.p>

            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              className="mt-1 font-sans text-[9px] uppercase tracking-[0.2em] text-[var(--accent-gold)]"
            >
              INGENIERÍA COMPUTACIONAL
            </m.span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
