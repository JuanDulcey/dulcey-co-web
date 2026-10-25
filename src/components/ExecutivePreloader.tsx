import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'dulcey_apertura_sesion_v2';

function shouldRunOpeningMonogram(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
}

interface ExecutivePreloaderProps {
  suiteContainerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Apertura Silenciosa de Monograma (~1.3s en primera visita de sesión)
 * Traza con delicadeza el sello octogonal dorado y la firma "DULCEY & CO.",
 * sin barras de carga ni porcentajes.
 */
export function ExecutivePreloader({ suiteContainerRef }: ExecutivePreloaderProps) {
  const initialRunRef = useRef<boolean>(shouldRunOpeningMonogram());
  const [overlayMounted, setOverlayMounted] = useState<boolean>(initialRunRef.current);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const polygonRef = useRef<SVGPolygonElement | null>(null);
  const innerDiamondRef = useRef<SVGPolygonElement | null>(null);
  const wordmarkRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const containerEl = suiteContainerRef.current;
    const runMonogram = initialRunRef.current;

    const ctx = gsap.context(() => {
      const revealTargets = containerEl
        ? Array.from(containerEl.querySelectorAll<HTMLElement>('[data-gsap-reveal]'))
        : [];

      if (prefersReducedMotion) {
        if (revealTargets.length > 0) {
          gsap.set(revealTargets, { opacity: 1, y: 0, clearProps: 'all' });
        }
        setOverlayMounted(false);
        return;
      }

      if (!runMonogram) {
        if (revealTargets.length > 0) {
          gsap.fromTo(
            revealTargets,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );
        }
        return;
      }

      if (revealTargets.length > 0) {
        gsap.set(revealTargets, { opacity: 0, y: 16 });
      }

      if (polygonRef.current) {
        gsap.set(polygonRef.current, { strokeDasharray: 220, strokeDashoffset: 220 });
      }
      if (innerDiamondRef.current) {
        gsap.set(innerDiamondRef.current, {
          strokeDasharray: 120,
          strokeDashoffset: 120,
          transformOrigin: '50% 50%',
          scale: 0.9,
        });
      }
      if (wordmarkRef.current) {
        gsap.set(wordmarkRef.current, { opacity: 0, y: 6 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SESSION_KEY, 'true');
          } catch {
            // Ignorar restricciones en modo privado
          }
          setOverlayMounted(false);
        },
      });

      if (polygonRef.current) {
        tl.to(
          polygonRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.88,
            ease: 'power2.inOut',
          },
          0
        );
      }

      if (innerDiamondRef.current) {
        tl.to(
          innerDiamondRef.current,
          {
            strokeDashoffset: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
          },
          0.1
        );
      }

      if (wordmarkRef.current) {
        tl.to(
          wordmarkRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
          },
          0.25
        );
      }

      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.42,
            ease: 'power2.inOut',
          },
          0.95
        );
      }

      if (revealTargets.length > 0) {
        tl.to(
          revealTargets,
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          0.92
        );
      }
    });

    return () => ctx.revert();
  }, [suiteContainerRef]);

  if (!overlayMounted) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040405] px-6 select-none"
    >
      <div className="flex flex-col items-center">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="h-14 w-14 mb-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            ref={polygonRef}
            points="32,5 51,13 59,32 51,51 32,59 13,51 5,32 13,13"
            stroke="#C5A059"
            strokeWidth="1.1"
          />
          <polygon
            ref={innerDiamondRef}
            points="32,16 48,32 32,48 16,32"
            stroke="#E5C787"
            strokeWidth="0.95"
          />
          <circle cx="32" cy="32" r="2" fill="#E5C787" />
        </svg>

        <p
          ref={wordmarkRef}
          className="font-serif text-sm tracking-[0.34em] uppercase text-[var(--text-ivory)]"
        >
          DULCEY &amp; CO.
        </p>
      </div>
    </div>
  );
}
