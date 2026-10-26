import { useEffect, type RefObject } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  phaseSpeed: number;
}

const DESKTOP_PARTICLE_COUNT = 45;
const MOBILE_PARTICLE_COUNT = 18;
const MOBILE_BREAKPOINT = 768;
const LINK_DISTANCE = 110;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const CURSOR_LINK_DISTANCE = 140;
const CURSOR_LINK_DISTANCE_SQ = CURSOR_LINK_DISTANCE * CURSOR_LINK_DISTANCE;

// Color base #C5A059 -> RGB(197, 160, 89)
const GOLD_RGB = '197, 160, 89';
// Color luz #E5C787 -> RGB(229, 199, 135)
const GOLD_LIGHT_RGB = '229, 199, 135';

/**
 * Motor 2D nativo "Gold Dust & Neural Nodes"
 * - Desktop (>= 768px): 45 partículas, red neuronal < 110px (0.5px),
 *   y Nodo Maestro Neural en el cursor (< 140px con atracción magnética amortiguada).
 * - Mobile (< 768px): 18 partículas, sin cálculo de mouse para 60fps estables y ahorro energético.
 */
export function useExecutiveParticles(canvasRef: RefObject<HTMLCanvasElement | null>): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < MOBILE_BREAKPOINT;
    let animationFrameId = 0;
    let isDocumentHidden = document.hidden;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let particles: Particle[] = [];

    const createParticles = (count: number, w: number, h: number): Particle[] => {
      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const speed = prefersReducedMotion ? 0.04 : 0.14 + Math.random() * 0.22;
        const angle = Math.random() * Math.PI * 2;
        next.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.0 + Math.random() * 1.35,
          // Rango estricto de opacidad 0.15 a 0.40 según especificación
          baseAlpha: 0.15 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.006 + Math.random() * 0.012,
        });
      }
      return next;
    };

    const configureCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const nextIsMobile = width < MOBILE_BREAKPOINT;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = nextIsMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
      if (particles.length !== targetCount || nextIsMobile !== isMobile) {
        isMobile = nextIsMobile;
        if (isMobile) {
          pointer.active = false;
        }
        particles = createParticles(targetCount, width, height);
      } else {
        // Re-encuadrar partículas si la ventana se redujo
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].x > width) particles[i].x = Math.random() * width;
          if (particles[i].y > height) particles[i].y = Math.random() * height;
        }
      }
    };

    configureCanvas();

    const handlePointerMove = (e: PointerEvent) => {
      if (isMobile || e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleVisibilityChange = () => {
      isDocumentHidden = document.hidden;
    };

    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(configureCanvas, 120);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      if (isDocumentHidden) return;

      ctx.clearRect(0, 0, width, height);

      const len = particles.length;

      // 1. Actualizar cinemática de partículas
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.phase += p.phaseSpeed;

        // Nodo Maestro Neural en Desktop: atracción magnética sutil y amortiguada sin colapsar en el centro
        if (!isMobile && pointer.active && !prefersReducedMotion) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CURSOR_LINK_DISTANCE_SQ && distSq > 1200) {
            const dist = Math.sqrt(distSq);
            const pull = (1 - dist / CURSOR_LINK_DISTANCE) * 0.0085;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        // Límite suave de velocidad máxima para preservar flotación horológica serena
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        const maxSpeed = prefersReducedMotion ? 0.08 : 0.42;
        if (speedSq > maxSpeed * maxSpeed) {
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Envoltura perimetral continua (toroidal suave)
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;

        if (p.y < -12) p.y = height + 12;
        else if (p.y > height + 12) p.y = -12;
      }

      const isLightMode = document.documentElement.classList.contains('light');
      const activeGoldRgb = isLightMode ? '139, 109, 42' : GOLD_RGB;
      const activeGoldLightRgb = isLightMode ? '176, 142, 68' : GOLD_LIGHT_RGB;

      // 2. Conexiones entre partículas (< 110px, línea ultrafina de 0.5px)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < LINK_DISTANCE_SQ) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / LINK_DISTANCE) * (isLightMode ? 0.28 : 0.22);
            ctx.strokeStyle = `rgba(${activeGoldRgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 3. Filamentos dorados hacia el Nodo Maestro del cursor en Desktop (< 140px)
        if (!isMobile && pointer.active) {
          const cdx = pointer.x - p1.x;
          const cdy = pointer.y - p1.y;
          const cDistSq = cdx * cdx + cdy * cdy;

          if (cDistSq < CURSOR_LINK_DISTANCE_SQ) {
            const cDist = Math.sqrt(cDistSq);
            const cAlpha = (1 - cDist / CURSOR_LINK_DISTANCE) * (isLightMode ? 0.38 : 0.34);
            ctx.strokeStyle = `rgba(${activeGoldLightRgb}, ${cAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // 4. Dibujo de nodos de polvo de oro (opacidad adaptada y controlada)
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const shimmer = Math.sin(p.phase) * 0.04;
        const alpha = isLightMode
          ? Math.min(0.48, Math.max(0.2, p.baseAlpha + shimmer + 0.06))
          : Math.min(0.4, Math.max(0.15, p.baseAlpha + shimmer));

        ctx.fillStyle = `rgba(${activeGoldRgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [canvasRef]);
}
