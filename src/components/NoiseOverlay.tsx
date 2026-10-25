import { useEffect, useState } from 'react';

let cachedGrainDataUrl: string | null = null;

function getAnalogGrainDataUrl(): string {
  if (cachedGrainDataUrl) return cachedGrainDataUrl;
  if (typeof document === 'undefined') return '';

  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  // Semilla determinista para grano homogéneo tipo papel algodón / metal cepillado
  let seed = 19716089;
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const value = (seed >>> 24) & 0xff;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  cachedGrainDataUrl = canvas.toDataURL('image/png');
  return cachedGrainDataUrl;
}

/**
 * Textura Analógica Optimizada (0 costo de filtro SVG en GPU)
 * Aplica un mosaico estático de 128×128px generado una única vez en memoria.
 */
export function NoiseOverlay() {
  const [grainUrl, setGrainUrl] = useState<string>('');

  useEffect(() => {
    setGrainUrl(getAnalogGrainDataUrl());
  }, []);

  if (!grainUrl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.026] print:hidden"
      style={{
        backgroundImage: `url(${grainUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  );
}
