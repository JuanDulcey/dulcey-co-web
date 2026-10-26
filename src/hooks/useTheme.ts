import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'dulcey_theme_mode';

/**
 * Determina el tema activo en el sistema operativo mediante Media Query
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Lee el modo persistido en localStorage o recurre a 'system'
 */
export function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Modo incógnito o cookies deshabilitadas
  }
  return 'system';
}

/**
 * Resuelve el tema visual efectivo ('light' | 'dark') a partir del modo seleccionado
 */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

/**
 * Aplica el tema al elemento <html> raíz y sincroniza la metaetiqueta theme-color
 */
export function applyThemeToDom(resolved: ResolvedTheme, smoothTransition = false): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (smoothTransition) {
    root.classList.add('theme-transition');
  }

  if (resolved === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
    root.setAttribute('data-theme', 'light');
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'dark' ? '#040405' : '#F7F5F0');
  }

  if (smoothTransition) {
    window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 280);
  }
}

/**
 * Hook de Control de Tema Dulcey & Co. (Automático / Claro / Oscuro)
 * - Soporta 3 modos de selección y cambio dinámico con el OS.
 * - Transición suavizada de 250ms.
 * - Cero desincronización con el script inline anti-FOUC.
 */
export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(getInitialThemeMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getInitialThemeMode())
  );

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch {
      // Ignorar restricciones en entornos aislados
    }

    const nextResolved = resolveTheme(newMode);
    setResolvedTheme(nextResolved);
    applyThemeToDom(nextResolved, true);
  }, []);

  // Escuchar cambios del sistema operativo cuando el modo está fijado en 'system'
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        const nextResolved: ResolvedTheme = e.matches ? 'dark' : 'light';
        setResolvedTheme(nextResolved);
        applyThemeToDom(nextResolved, true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  return {
    mode,
    resolvedTheme,
    setMode,
  };
}
