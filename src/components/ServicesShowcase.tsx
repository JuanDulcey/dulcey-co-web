import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SERVICES_DATA, type ServiceId } from '../data/services';

interface ServicesShowcaseProps {
  onConsultService: (serviceId: ServiceId) => void;
}

/**
 * Las Cuatro Áreas de Práctica — Retícula Editorial de Filetes Continuos
 * - Desktop (`lg+`): Libro mayor dividido por un filete vertical fino (índice izquierdo `01–04`
 *   y hoja derecha destilada en `EB Garamond`), sin recuadros anidados ni íconos decorativos.
 * - Mobile (`< lg`): Acordeón táctil limpio separado por filetes continuos.
 */
export function ServicesShowcase({ onConsultService }: ServicesShowcaseProps) {
  const [activeId, setActiveId] = useState<ServiceId>('arquitectura-web');
  const [mobileOpenId, setMobileOpenId] = useState<ServiceId | null>('arquitectura-web');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeService =
    SERVICES_DATA.find((service) => service.id === activeId) ?? SERVICES_DATA[0];

  const handleToggleMobile = (id: ServiceId) => {
    setActiveId(id);
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
      setActiveId(targetService.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      data-gsap-reveal
      aria-labelledby="dulcey-services-heading"
      className="relative z-10"
    >
      {/* Cabecera de Sección de Borde a Borde */}
      <div className="flex flex-col gap-2 border-b border-[var(--border-hairline)] px-6 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:px-10 lg:px-14">
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
          VISTA DESKTOP (lg+): LIBRO MAYOR DE DOS COLUMNAS CON FILETE CONTINUO
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12">
        {/* Columna Izquierda: Índice Editorial 01 – 04 */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Áreas de práctica de Dulcey & Co."
          className="lg:col-span-5 divide-y divide-[var(--border-hairline)] border-r border-[var(--border-hairline)]"
        >
          {SERVICES_DATA.map((service, index) => {
            const isActive = service.id === activeId;

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
                onClick={() => setActiveId(service.id)}
                onKeyDown={(e) => handleTabKeyDown(index, e)}
                className={`group relative flex w-full items-baseline gap-5 px-10 py-7 xl:px-14 xl:py-8 text-left transition-colors duration-300 focus:outline-none focus-visible:bg-[rgba(197,160,89,0.06)] ${
                  isActive
                    ? 'bg-[rgba(197,160,89,0.045)]'
                    : 'hover:bg-[rgba(255,255,255,0.015)]'
                }`}
              >
                {/* Filete vertical activo en oro */}
                {isActive && (
                  <motion.span
                    layoutId="dulcey-linea-practica-activa"
                    className="absolute bottom-0 left-0 top-0 w-[2px] bg-[var(--accent-gold)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}

                <span
                  className={`font-serif text-lg italic shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--accent-gold-light)]'
                      : 'text-gold/65 group-hover:text-[var(--accent-gold)]'
                  }`}
                >
                  {service.index}
                </span>

                <div className="min-w-0">
                  <h3
                    className={`font-serif text-[21px] xl:text-[22px] leading-snug transition-colors duration-300 ${
                      isActive
                        ? 'text-[var(--text-ivory)]'
                        : 'text-ivory/80 group-hover:text-[var(--text-ivory)]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-platinum/75">
                    {service.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hoja Derecha: Especificación Ejecutiva Destilada */}
        <div
          id={`dulcey-pillar-panel-${activeService.id}`}
          role="tabpanel"
          aria-labelledby={`dulcey-pillar-tab-${activeService.id}`}
          className="lg:col-span-7 flex flex-col justify-between px-10 py-10 xl:px-14 xl:py-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-between"
            >
              <div>
                {/* Numeral y referencia */}
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-4xl italic text-[var(--accent-gold)]">
                    {activeService.index}
                  </span>
                  <span className="font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Práctica {activeService.index} de 04
                  </span>
                </div>

                {/* Título y Subtítulo */}
                <h3 className="mt-4 font-serif text-3xl xl:text-[34px] font-normal leading-[1.15] text-[var(--text-ivory)]">
                  {activeService.title}
                </h3>
                <p className="mt-2.5 font-serif text-lg italic text-[var(--accent-gold)]">
                  {activeService.subtitle}
                </p>

                {/* Descripción Ejecutiva */}
                <p className="mt-6 font-sans text-[15px] font-light leading-[1.85] text-[var(--text-platinum)]">
                  {activeService.description}
                </p>

                {/* Filete divisor */}
                <div className="my-8 h-px w-full bg-[var(--border-hairline)]" />

                {/* Las 4 Capacidades en Lista Tipográfica Limpia */}
                <div>
                  <h4 className="font-sans text-[10.5px] font-normal uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Alcance y Capacidades
                  </h4>

                  <ul className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3">
                    {activeService.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-baseline gap-3 font-sans text-[13.5px] font-light leading-relaxed text-ivory/90"
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
                  <p className="mt-1.5 font-sans text-[13.5px] font-light leading-relaxed text-ivory/90">
                    {activeService.businessImpact}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onConsultService(activeService.id)}
                  className="group inline-flex shrink-0 items-center gap-2 self-start xl:self-auto border-b border-[var(--border-active)] pb-1 font-sans text-[11px] font-normal uppercase tracking-[0.18em] text-[var(--accent-gold-light)] transition-colors duration-300 hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                >
                  <span>Conversar sobre esta práctica</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =====================================================================
          VISTA MOBILE (< lg): ACORDEÓN EDITORIAL DE FILETE CONTINUO
         ===================================================================== */}
      <div className="divide-y divide-[var(--border-hairline)] lg:hidden">
        {SERVICES_DATA.map((service) => {
          const isExpanded = mobileOpenId === service.id;

          return (
            <div
              key={service.id}
              className={`transition-colors duration-300 ${
                isExpanded ? 'bg-[rgba(197,160,89,0.03)]' : 'bg-transparent'
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggleMobile(service.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-baseline justify-between gap-4 px-6 py-6 sm:px-10 text-left focus:outline-none"
              >
                <div className="flex items-baseline gap-3.5 min-w-0">
                  <span className="font-serif text-lg italic text-[var(--accent-gold)] shrink-0">
                    {service.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl leading-snug text-[var(--text-ivory)]">
                      {service.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs font-light leading-relaxed text-platinum/80">
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
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 px-6 pb-7 pt-1 sm:px-10">
                      <p className="font-sans text-sm font-light leading-[1.8] text-[var(--text-platinum)]">
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
                              className="flex items-baseline gap-2.5 font-sans text-xs font-light text-ivory/90"
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
                        <p className="mt-1.5 font-sans text-xs font-light leading-relaxed text-ivory/90">
                          {service.businessImpact}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onConsultService(service.id)}
                          className="inline-flex items-center gap-2 border-b border-[var(--border-active)] pb-1 font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--accent-gold-light)]"
                        >
                          <span>Conversar sobre esta práctica</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
