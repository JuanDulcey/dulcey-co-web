import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { SERVICES_DATA, type ServiceId } from '../data/services';
import { useSpotlight } from '../hooks/useSpotlight';

interface ServicesShowcaseProps {
  activeServiceId: ServiceId;
  onSelectService: (serviceId: ServiceId) => void;
  onConsultService: (serviceId: ServiceId) => void;
}

/**
 * Las Cuatro Áreas de Práctica — Retícula Editorial de Filetes Continuos
 * - Desktop (`lg+`): Superposición en celda única CSS Grid para estabilidad vertical
 *   exacta (`0px` de salto de altura entre prácticas `01–04`) e índice `flex-1` sin huecos.
 * - Mobile (`< lg`): Acordeón accesible (`aria-controls`, `role="region"`, `focus-visible`).
 * - Print (`@media print`): Despliegue íntegro de las 4 prácticas para Dossier PDF.
 */
export function ServicesShowcase({
  activeServiceId,
  onSelectService,
  onConsultService,
}: ServicesShowcaseProps) {
  const [mobileOpenId, setMobileOpenId] = useState<ServiceId | null>(activeServiceId);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLDivElement>();

  const handleToggleMobile = (id: ServiceId) => {
    onSelectService(id);
    setMobileOpenId((prev) => (prev === id ? null : id));
  };

  const handleTabKeyDown = (index: number, event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const count = SERVICES_DATA.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % count;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const targetService = SERVICES_DATA[nextIndex];
      onSelectService(targetService.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section aria-labelledby="dulcey-services-heading" className="relative z-10">
      {/* Cabecera de Sección de Borde a Borde */}
      <div className="flex flex-col gap-1.5 border-b border-[var(--border-hairline)] px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-10 sm:py-6 lg:px-14">
        <h2
          id="dulcey-services-heading"
          className="font-sans text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--accent-gold)]"
        >
          Áreas de Práctica
        </h2>

        <p className="font-serif text-base italic text-[var(--text-platinum)]">
          Cuatro disciplinas de ingeniería bajo un mismo estándar de precisión
        </p>
      </div>

      {/* =====================================================================
          VISTA DESKTOP (lg+): LIBRO MAYOR DE DOS COLUMNAS SIN SALTO DE ALTURA
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 print:hidden">
        {/* Columna Izquierda: Índice Editorial 01 – 04 distribuido uniformemente */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Áreas de práctica de Dulcey & Co."
          className="lg:col-span-5 flex flex-col divide-y divide-[var(--border-hairline)] border-r border-[var(--border-hairline)]"
        >
          {SERVICES_DATA.map((service, index) => {
            const isActive = service.id === activeServiceId;

            return (
              <button
                key={service.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`dulcey-pillar-tab-${service.id}`}
                aria-controls={`dulcey-pillar-panel-${service.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelectService(service.id)}
                onKeyDown={(e) => handleTabKeyDown(index, e)}
                className={`group relative flex flex-1 w-full items-baseline gap-5 px-9 py-7 xl:px-14 xl:py-8 text-left transition-colors duration-300 focus:outline-none focus-visible:bg-[rgba(197,160,89,0.07)] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--accent-gold)] ${
                  isActive
                    ? 'bg-[rgba(197,160,89,0.05)]'
                    : 'hover:bg-[rgba(197,160,89,0.04)]'
                }`}
              >
                {/* Filete vertical activo en oro */}
                {isActive && (
                  <m.span
                    layoutId="dulcey-linea-practica-activa"
                    className="absolute bottom-0 left-0 top-0 w-[2px] bg-[var(--accent-gold)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}

                <span
                  className={`font-serif text-lg italic shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--accent-gold-light)]'
                      : 'text-[var(--accent-gold)] group-hover:text-[var(--accent-gold-light)]'
                  }`}
                >
                  {service.index}
                </span>

                <div className="min-w-0">
                  <h3
                    className={`font-serif text-[20px] xl:text-[22px] leading-snug text-balance transition-colors duration-300 ${
                      isActive
                        ? 'text-[var(--text-ivory)]'
                        : 'text-[var(--text-platinum)] group-hover:text-[var(--text-ivory)]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-pretty text-[var(--text-platinum)]">
                    {service.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hoja Derecha: Superposición en Celda Única (0px de salto vertical) */}
        <div
          ref={spotlightRef}
          {...spotlightHandlers}
          className="spotlight-module lg:col-span-7 grid grid-cols-1 grid-rows-1"
        >
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === activeServiceId;

            return (
              <div
                key={service.id}
                id={`dulcey-pillar-panel-${service.id}`}
                role="tabpanel"
                aria-labelledby={`dulcey-pillar-tab-${service.id}`}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 flex flex-col justify-between px-9 py-10 xl:px-14 xl:py-12 transition-all duration-300 ${
                  isActive
                    ? 'visible z-10 translate-y-0 opacity-100 pointer-events-auto'
                    : 'invisible z-0 translate-y-1.5 opacity-0 pointer-events-none select-none'
                }`}
              >
                <div>
                  {/* Numeral y referencia */}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-4xl italic text-[var(--accent-gold)]">
                      {service.index}
                    </span>
                    <span className="font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Práctica {service.index} de 04
                    </span>
                  </div>

                  {/* Título y Subtítulo */}
                  <h3 className="mt-4 font-serif text-3xl xl:text-[34px] font-normal leading-[1.15] text-balance text-[var(--text-ivory)]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 font-serif text-lg italic text-pretty text-[var(--accent-gold)]">
                    {service.subtitle}
                  </p>

                  {/* Descripción Ejecutiva */}
                  <p className="mt-6 font-sans text-[15px] font-light leading-[1.85] text-pretty text-[var(--text-platinum)]">
                    {service.description}
                  </p>

                  {/* Filete divisor */}
                  <div className="my-8 h-px w-full bg-[var(--border-hairline)]" />

                  {/* Las 4 Capacidades en Lista Tipográfica Limpia */}
                  <div>
                    <h4 className="font-sans text-[10.5px] font-normal uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Alcance y Capacidades
                    </h4>

                    <ul className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-baseline gap-3 font-sans text-[13.5px] font-light leading-relaxed text-[var(--text-ivory)]"
                        >
                          <span aria-hidden="true" className="text-[var(--accent-gold)] select-none">
                            —
                          </span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pie de Hoja: Impacto en el Negocio y Acción Directa */}
                <div className="mt-9 border-t border-[var(--border-hairline)] pt-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                  <div className="max-w-md">
                    <span className="block font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Impacto en el Negocio
                    </span>
                    <p className="mt-1.5 font-sans text-[13.5px] font-light leading-relaxed text-pretty text-[var(--text-ivory)]">
                      {service.businessImpact}
                    </p>
                  </div>

                  <button
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onConsultService(service.id)}
                    className="group shrink-0 self-start xl:self-auto border-b border-[var(--border-active)] pb-1 text-left font-sans text-[11px] font-normal uppercase tracking-[0.18em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    <span>Conversar sobre esta práctica</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      {'\u00A0→'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          VISTA MOBILE (< lg): ACORDEÓN EDITORIAL ACCESIBLE DE FILETE CONTINUO
         ===================================================================== */}
      <div className="divide-y divide-[var(--border-hairline)] lg:hidden print:hidden">
        {SERVICES_DATA.map((service) => {
          const isExpanded = mobileOpenId === service.id;
          const mobileTriggerId = `dulcey-mobile-trigger-${service.id}`;
          const mobileRegionId = `dulcey-mobile-region-${service.id}`;

          return (
            <div
              key={service.id}
              className={`transition-colors duration-300 ${
                isExpanded ? 'bg-[rgba(197,160,89,0.035)]' : 'bg-transparent'
              }`}
            >
              <button
                id={mobileTriggerId}
                type="button"
                onClick={() => handleToggleMobile(service.id)}
                aria-expanded={isExpanded}
                aria-controls={mobileRegionId}
                className="flex w-full items-baseline justify-between gap-3.5 px-5 py-6 sm:px-10 text-left focus:outline-none focus-visible:bg-[rgba(197,160,89,0.07)] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--accent-gold)]"
              >
                <div className="flex items-baseline gap-3.5 min-w-0">
                  <span className="font-serif text-lg italic text-[var(--accent-gold)] shrink-0">
                    {service.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl leading-snug text-balance text-[var(--text-ivory)]">
                      {service.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs font-light leading-relaxed text-pretty text-[var(--text-platinum)]">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif text-xl leading-none text-[var(--accent-gold)] select-none"
                >
                  {isExpanded ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <m.div
                    id={mobileRegionId}
                    role="region"
                    aria-labelledby={mobileTriggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 px-5 pb-7 pt-1 sm:px-10">
                      <p className="font-sans text-sm font-light leading-[1.8] text-pretty text-[var(--text-platinum)]">
                        {service.description}
                      </p>

                      <div className="border-t border-[var(--border-hairline)] pt-4">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          Alcance y Capacidades
                        </p>
                        <ul className="mt-3 space-y-2">
                          {service.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="flex items-baseline gap-2.5 font-sans text-xs font-light text-[var(--text-ivory)]"
                            >
                              <span aria-hidden="true" className="text-[var(--accent-gold)]">
                                —
                              </span>
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[var(--border-hairline)] pt-4">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          Impacto en el Negocio
                        </p>
                        <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-pretty text-[var(--text-ivory)]">
                          {service.businessImpact}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onConsultService(service.id)}
                          className="border-b border-[var(--border-active)] pb-1 text-left font-sans text-[10.5px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                        >
                          <span>Conversar sobre esta práctica</span>
                          <span aria-hidden="true">{'\u00A0→'}</span>
                        </button>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          VISTA EXCLUSIVA DE IMPRESIÓN / DOSSIER PDF (@media print)
          Muestra las 4 Áreas de Práctica completas para comités directivos.
         ===================================================================== */}
      <div className="hidden print:grid print:grid-cols-2 print:divide-x print:divide-y print:divide-[var(--border-hairline)]">
        {SERVICES_DATA.map((service) => (
          <article key={service.id} className="p-6 break-inside-avoid">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-lg italic text-[var(--accent-gold)]">
                {service.index}.
              </span>
              <h3 className="font-serif text-lg font-normal text-[var(--text-ivory)]">
                {service.title}
              </h3>
            </div>
            <p className="mt-1 font-serif text-xs italic text-[var(--accent-gold)]">
              {service.subtitle}
            </p>
            <p className="mt-2.5 font-sans text-[10px] leading-relaxed text-[var(--text-platinum)]">
              {service.description}
            </p>
            <ul className="mt-3 space-y-1 border-t border-[var(--border-hairline)] pt-2.5">
              {service.capabilities.map((cap) => (
                <li key={cap} className="font-sans text-[9.5px] text-[var(--text-ivory)]">
                  — {cap}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
