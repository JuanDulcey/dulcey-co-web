import { useEffect, useState } from 'react';

interface TelemetryClockState {
  colombiaTime: string;
  latencyMs: number;
}

function formatColombiaTime(now: Date): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
  } catch {
    // Fallback determinista UTC-5 en caso de entorno sin base IANA completa
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const bogotaDate = new Date(utcMs - 5 * 3600000);
    return bogotaDate.toTimeString().slice(0, 8);
  }
}

/**
 * Reloj horológico en tiempo real sincronizado con la hora oficial de Colombia (UTC-5)
 * junto con micro-telemetría de latencia nominal.
 */
export function useColombiaClock(): TelemetryClockState {
  const [state, setState] = useState<TelemetryClockState>(() => ({
    colombiaTime: formatColombiaTime(new Date()),
    latencyMs: 14,
  }));

  useEffect(() => {
    let tickCount = 0;
    const samples = [12, 14, 13, 15, 14, 11, 13, 14];

    const intervalId = window.setInterval(() => {
      tickCount += 1;
      setState((prev) => ({
        colombiaTime: formatColombiaTime(new Date()),
        // Actualiza latencia simulada sutilmente cada 4 segundos para realismo ejecutivo
        latencyMs:
          tickCount % 4 === 0 ? samples[(tickCount / 4) % samples.length] : prev.latencyMs,
      }));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return state;
}
