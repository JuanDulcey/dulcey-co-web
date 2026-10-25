import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'dulcey_suite_calibrated_v1';

function shouldRunFullCalibration(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
}

interface ExecutivePreloaderProps {
  /** Referencia al contenedor raíz para orquestar el reveal de `[data-gsap-reveal]` */
  suiteContainerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Secuencia de Entrada Inicial / Preloader Ejecutivo con GSAP (Sección 2 + Decisión 6)
 * - Primera visita en la sesión (~1.6s): Calibración horológica con trazado SVG octogonal,
 *   contador monoespaciado 00->100% y apertura de velo revelando los módulos de la tarjeta.
 * - Recargas subsecuentes en la misma sesión (~0.6s): Sin pantalla de bloqueo; entrada directa
 *   fluida sobre los elementos `[data-gsap-reveal]`.
 */
export function ExecutivePreloader({ suiteContainerRef }: ExecutivePreloaderProps) {
  const initialCalibrationRef = useRef<boolean>(shouldRunFullCalibration());
  const [overlayMounted, setOverlayMounted] = useState<boolean>(initialCalibrationRef.current);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const polygonRef = useRef<SVGPolygonElement | null>(null);
  const innerDiamondRef = useRef<SVGPolygonElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const counterTextRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const containerEl = suiteContainerRef.current;
    const runFullPreloader = initialCalibrationRef.current;

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

      if (!runFullPreloader) {
        // Reveal directo rápido (~0.6s) para recargas dentro de la misma sesión
        if (revealTargets.length > 0) {
          gsap.fromTo(
            revealTargets,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.58,
              stagger: 0.065,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );
        }
        return;
      }

      // Secuencia de Calibración Horológica (~1.6s total)
      const counter = { value: 0 };

      if (revealTargets.length > 0) {
        gsap.set(revealTargets, { opacity: 0, y: 18 });
      }

      if (polygonRef.current) {
        gsap.set(polygonRef.current, { strokeDasharray: 220, strokeDashoffset: 220 });
      }
      if (innerDiamondRef.current) {
        gsap.set(innerDiamondRef.current, {
          strokeDasharray: 120,
          strokeDashoffset: 120,
          transformOrigin: '50% 50%',
          scale: 0.86,
        });
      }
      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: 'left center' });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SESSION_KEY, 'true');
          } catch {
            // Ignorar restricciones de almacenamiento privado
          }
          setOverlayMounted(false);
        },
      });

      // 1. Trazado del calibre octogonal y avance de telemetría (0.0s -> 1.15s)
      if (polygonRef.current) {
        tl.to(
          polygonRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.0,
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
            rotation: 90,
            duration: 1.05,
            ease: 'power3.out',
          },
          0.12
        );
      }

      if (progressFillRef.current) {
        tl.to(
          progressFillRef.current,
          {
            scaleX: 1,
            duration: 1.15,
            ease: 'power2.inOut',
          },
          0
        );
      }

      tl.to(
        counter,
        {
          value: 100,
          duration: 1.15,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterTextRef.current) {
              const formatted = String(Math.round(counter.value)).padStart(3, '0');
              counterTextRef.current.textContent = `${formatted}%`;
            }
          },
        },
        0
      );

      // 2. Apertura del velo de obsidiana + entrada escalonada de la suite (1.15s -> 1.65s)
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.inOut',
          },
          1.15
        );
      }

      if (revealTargets.length > 0) {
        tl.to(
          revealTargets,
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.065,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          1.12
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
        {/* Calibre Octogonal GSAP */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="h-16 w-16 mb-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            ref={polygonRef}
            points="32,5 51,13 59,32 51,51 32,59 13,51 5,32 13,13"
            stroke="#C5A059"
            strokeWidth="1.25"
          />
          <polygon
            ref={innerDiamondRef}
            points="32,16 48,32 32,48 16,32"
            stroke="#E5C787"
            strokeWidth="1"
          />
          <circle cx="32" cy="32" r="2.4" fill="#E5C787" />
        </svg>

        <p className="font-serif text-sm tracking-[0.32em] uppercase text-[var(--text-ivory)]">
          DULCEY &amp; CO.
        </p>

        {/* Barra de precisión milimétrica */}
        <div className="mt-5 h-px w-52 overflow-hidden bg-[rgba(197,160,89,0.16)]">
          <div
            ref={progressFillRef}
            className="h-full w-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-light)]"
          />
        </div>

        {/* Telemetría de calibración */}
        <div className="mt-3 flex w-52 items-center justify-between font-mono text-[10px] tracking-[0.16em] text-[var(--text-muted)]">
          <span className="text-[var(--accent-gold)]">CALIBRATING SUITE</span>
          <span ref={counterTextRef} className="text-[var(--text-platinum)]">
            000%
          </span>
        </div>
      </div>
    </div>
  );
}
