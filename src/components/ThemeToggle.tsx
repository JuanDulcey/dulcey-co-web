import { useTheme, type ThemeMode } from '../hooks/useTheme';

interface ThemeOption {
  id: ThemeMode;
  label: string;
  tooltip: string;
  icon: JSX.Element;
}

const THEME_OPTIONS: readonly ThemeOption[] = [
  {
    id: 'system',
    label: 'Auto',
    tooltip: 'Automático · Sincronizado con el sistema',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'light',
    label: 'Claro',
    tooltip: 'Modo Claro · Papelería Marfil & Oro Bruñido',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
  {
    id: 'dark',
    label: 'Oscuro',
    tooltip: 'Modo Oscuro · Obsidiana & Oro Envejecido',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

/**
 * Selector Segmented Pill Minimalista — Dulcey & Co.
 * Control accesible (WAI-ARIA radiogroup) para alternar entre Automático (OS), Claro y Oscuro.
 */
export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Selector de tema de visualización"
      className="inline-flex items-center gap-0.5 border border-[var(--border-hairline)] bg-[var(--surface-elevated)] p-0.5 select-none print:hidden"
    >
      {THEME_OPTIONS.map((opt) => {
        const isSelected = mode === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={opt.tooltip}
            title={opt.tooltip}
            onClick={() => setMode(opt.id)}
            className={`group relative flex items-center gap-1 px-1.5 py-1 text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)] ${
              isSelected
                ? 'border border-[var(--border-active)] bg-[rgba(197,160,89,0.16)] font-medium text-[var(--accent-gold)] shadow-[0_1px_4px_rgba(0,0,0,0.2)]'
                : 'border border-transparent font-light text-[var(--text-muted)] hover:bg-[rgba(197,160,89,0.06)] hover:text-[var(--text-ivory)]'
            }`}
          >
            {opt.icon}
            <span className="hidden sm:inline font-sans">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
