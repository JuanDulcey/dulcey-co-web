import { useEffect, useState } from 'react';

function formatColombiaTime(now: Date): string {
  try {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
  } catch {
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const bogotaDate = new Date(utcMs - 5 * 3600000);
    return bogotaDate.toTimeString().slice(0, 5);
  }
}

/**
 * Hora local en Colombia (UTC−5) en formato sereno HH:MM.
 */
export function useColombiaClock(): string {
  const [colombiaTime, setColombiaTime] = useState<string>(() => formatColombiaTime(new Date()));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setColombiaTime(formatColombiaTime(new Date()));
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  return colombiaTime;
}
