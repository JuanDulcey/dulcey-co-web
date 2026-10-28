import { METHOD_STEPS } from '../data/services';
import { SectionHeader } from './SectionHeader';

/**
 * Método de Trabajo — Cuatro fases en línea con filete horológico continuo.
 * Escritorio: 4 columnas unidas por un hilo dorado con nodos. Móvil: línea de tiempo vertical.
 */
export function MethodSection() {
  return (
    <section aria-labelledby="dulcey-method-heading" className="relative z-10">
      <SectionHeader
        id="dulcey-method-heading"
        title="Método de Trabajo"
        aside="Del diagnóstico a la entrega, sin improvisación"
      />

      <ol className="relative grid grid-cols-1 px-5 py-8 sm:px-10 sm:py-10 lg:grid-cols-4 lg:gap-8 lg:px-14 lg:py-12 print:grid-cols-4 print:gap-6 print:py-6">
        {/* Hilo continuo (escritorio) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-14 right-14 top-[4.05rem] hidden h-px bg-gradient-to-r from-[var(--accent-gold)] via-[var(--border-active)] to-transparent opacity-50 lg:block"
        />

        {METHOD_STEPS.map((step, i) => (
          <li
            key={step.index}
            className="relative pb-8 pl-9 last:pb-0 lg:pb-0 lg:pl-0 print:pl-0 break-inside-avoid"
          >
            {/* Hilo vertical (móvil) */}
            {i < METHOD_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[5px] top-3 w-px bg-[var(--border-hairline)] lg:hidden print:hidden"
              />
            )}

            {/* Nodo */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.45rem] flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[var(--accent-gold)] bg-[var(--bg-obsidian)] lg:static lg:mb-6 print:hidden"
            >
              <span className="h-[3px] w-[3px] rounded-full bg-[var(--accent-gold-light)]" />
            </span>

            <span className="block font-serif text-lg italic text-[var(--accent-gold)]">{step.index}</span>
            <h3 className="mt-1.5 font-serif text-xl font-normal text-balance text-[var(--text-ivory)]">
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-[34ch] font-sans text-sm font-light leading-[1.75] text-pretty text-[var(--text-platinum)] print:text-[10px]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
