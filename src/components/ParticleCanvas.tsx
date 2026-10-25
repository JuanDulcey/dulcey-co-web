import { useRef } from 'react';
import { useExecutiveParticles } from '../hooks/useExecutiveParticles';

/**
 * Lienzo fijo "Gold Dust & Neural Nodes" (Sección 4.1)
 * Respaldado por `useExecutiveParticles` con halo ambiental cenital sutil.
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useExecutiveParticles(canvasRef);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden">
      {/* Iluminación cenital atmosférica ultratenue sobre obsidiana #040405 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(197, 160, 89, 0.065), transparent 70%)',
        }}
      />
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
