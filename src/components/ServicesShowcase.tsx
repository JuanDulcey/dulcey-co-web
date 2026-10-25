import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Compass,
  Cpu,
  LineChart,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SERVICES_DATA, type ServiceId, type ServicePillar } from '../data/services';
import { EngravedCorners } from './EngravedCorners';
import { ServiceBlueprintSvg } from './ServiceBlueprintSvg';
import { useSpotlight } from '../hooks/useSpotlight';

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  'web-ecosystems': Compass,
  'bespoke-software': Cpu,
  'ai-agents': Bot,
  'data-science-ml': LineChart,
};

interface ServicesShowcaseProps {
  onConsultService: (serviceId: ServiceId) => void;
}

interface PillarSelectorCardProps {
  service: ServicePillar;
  isActive: boolean;
  onSelect: () => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}

function DesktopPillarSelectorCard({
  service,
  isActive,
  onSelect,
  onKeyDown,
  buttonRef,
}: PillarSelectorCardProps) {
  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLButtonElement>();
  const Icon = SERVICE_ICONS[service.id];

  const assignRefs = (node: HTMLButtonElement | null) => {
    spotlightRef.current = node;
    buttonRef(node);
  };

  return (
    <button
      ref={assignRefs}
      {...spotlightHandlers}
      id={`dulcey-pillar-tab-${service.id}`}
      aria-controls={`dulcey-pillar-panel-${service.id}`}
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      role="tab"
      className={`spotlight-module group relative w-full text-left rounded-sm border p-5 xl:p-6 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)] ${
        isActive
          ? 'border-[var(--border-active)] bg-[var(--surface-elevated)] shadow-goldGlow'
          : 'border-[var(--border-hairline)] bg-[#08080B]/70 hover:border-[rgba(197,160,89,0.38)] hover:bg-[#111116]/90'
      }`}
    >
      <EngravedCorners active={isActive} />

      {/* Barra lateral activa animada con Framer Motion */}
      {isActive && (
        <motion.span
          layoutId="dulcey-active-service-bar"
          className="absolute bottom-2 left-0 top-2 w-[2px] bg-gradient-to-b from-[var(--accent-gold-light)] via-[var(--accent-gold)] to-[var(--accent-gold-light)]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em]">
            <span className={isActive ? 'text-[var(--accent-gold-light)]' : 'text-gold/80'}>
              [ {service.index} ]
            </span>
            <span className="h-px w-5 bg-[var(--border-hairline)]" />
            <span className="text-[10px] uppercase text-[var(--text-muted)]">
              {service.modalLabel}
            </span>
          </div>

          <h3
            className={`font-serif text-xl xl:text-[22px] leading-snug transition-colors duration-300 ${
              isActive
                ? 'text-[var(--text-ivory)]'
                : 'text-ivory/85 group-hover:text-[var(--text-ivory)]'
            }`}
          >
            {service.title}
          </h3>

          <p className="font-sans text-xs sm:text-[13px] font-light leading-relaxed text-platinum/85">
            {service.subtitle}
          </p>
        </div>

        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300 ${
            isActive
              ? 'border-[var(--border-active)] bg-[rgba(197,160,89,0.12)] text-[var(--accent-gold-light)]'
              : 'border-[var(--border-hairline)] bg-[#060608] text-[var(--text-platinum)] group-hover:border-gold/40 group-hover:text-[var(--accent-gold)]'
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

/**
 * Núcleo Interactivo: Los 4 Pilares de Servicios (Sección 5.3 + Decisiones 2 & 3)
 * - Desktop (`lg+`): Consola Dual Asimétrica (~40/60) con selector indexado a la izquierda
 *   (con soporte de navegación por teclado WAI-ARIA) y Panel de Especificaciones a la derecha.
 * - Mobile (`< lg`): Acordeón táctil suave a 60 FPS con fichas técnicas desplegables.
 */
export function ServicesShowcase({ onConsultService }: ServicesShowcaseProps) {
  const [activeId, setActiveId] = useState<ServiceId>('web-ecosystems');
  const [mobileOpenId, setMobileOpenId] = useState<ServiceId | null>('web-ecosystems');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { spotlightRef: detailRef, spotlightHandlers: detailSpotlight } =
    useSpotlight<HTMLDivElement>();

  const activeService =
    SERVICES_DATA.find((service) => service.id === activeId) ?? SERVICES_DATA[0];
  const ActiveIcon = SERVICE_ICONS[activeService.id];

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
      className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      {/* Encabezado de Sección */}
      <div className="mb-8 sm:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--accent-gold)]">
            [ 01 — 04 // NÚCLEO DE INGENIERÍA &amp; CAPACIDADES ]
          </span>
          <h2
            id="dulcey-services-heading"
            className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--text-ivory)]"
          >
            Los Cuatro Pilares de <span className="italic text-[var(--accent-gold)]">Ejecución</span>
          </h2>
        </div>

        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[var(--text-muted)]">
          SELECCIONE UN PILAR PARA INSPECCIONAR SU ARQUITECTURA
        </p>
      </div>

      {/* =====================================================================
          VISTA DESKTOP (lg+): CONSOLA DUAL ASIMÉTRICA (MASTER-DETAIL ~42% / 58%)
         ===================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-7 xl:gap-9 items-start">
        {/* Columna Izquierda: Índice Interactivo [01 - 04] */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Pilares de servicios de ingeniería"
          className="lg:col-span-5 flex flex-col gap-3.5"
        >
          {SERVICES_DATA.map((service, index) => (
            <DesktopPillarSelectorCard
              key={service.id}
              service={service}
              isActive={service.id === activeId}
              onSelect={() => setActiveId(service.id)}
              onKeyDown={(e) => handleTabKeyDown(index, e)}
              buttonRef={(node) => {
                tabRefs.current[index] = node;
              }}
            />
          ))}
        </div>

        {/* Columna Derecha: Panel de Especificaciones Técnicas de Lujo */}
        <div
          ref={detailRef}
          {...detailSpotlight}
          id={`dulcey-pillar-panel-${activeService.id}`}
          role="tabpanel"
          aria-labelledby={`dulcey-pillar-tab-${activeService.id}`}
          className="spotlight-module lg:col-span-7 relative rounded-sm border border-[rgba(197,160,89,0.42)] bg-[#08080C]/90 p-7 xl:p-9 shadow-executive"
        >
          <EngravedCorners active />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 space-y-6"
            >
              {/* Barra Superior de Telemetría del Módulo */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--accent-gold-light)]">
                  <ActiveIcon className="h-4 w-4 text-[var(--accent-gold)]" strokeWidth={1.25} />
                  <span>PILAR [ {activeService.index} ] // FICHA TÉCNICA</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--text-muted)]">
                  {activeService.architectureCode}
                </span>
              </div>

              {/* Título & Subtítulo Oficial */}
              <div>
                <h3 className="font-serif text-2xl xl:text-[30px] leading-tight text-[var(--text-ivory)]">
                  {activeService.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs tracking-[0.06em] text-[var(--accent-gold)]">
                  {activeService.subtitle}
                </p>
              </div>

              {/* Blueprint SVG Geométrico / Arquitectónico */}
              <div className="blueprint-grid-bg relative overflow-hidden rounded-sm border border-[var(--border-hairline)] bg-[#050507]/90 px-4 py-3">
                <ServiceBlueprintSvg serviceId={activeService.id} />
                <div className="mt-1.5 flex items-start justify-between gap-4 border-t border-[rgba(197,160,89,0.12)] pt-2.5 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[var(--text-muted)]">
                  <span>{activeService.architectureSummary}</span>
                  <span className="shrink-0 text-gold/80">NOMINAL</span>
                </div>
              </div>

              {/* Descripción Ejecutiva */}
              <p className="font-sans text-[15px] font-light leading-[1.75] text-[var(--text-platinum)]">
                {activeService.description}
              </p>

              {/* Capacidades Técnicas (Tags) */}
              <div>
                <h4 className="mb-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                  CAPACIDADES TÉCNICAS INCLUIDAS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeService.capabilities.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--border-hairline)] bg-[var(--surface-elevated)] px-3 py-1.5 font-mono text-[11px] text-ivory/90"
                    >
                      <Sparkles
                        className="h-3 w-3 text-[var(--accent-gold)]"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Casos de Uso Empresariales & Arquitectura */}
              <div>
                <h4 className="mb-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                  CASOS DE USO EMPRESARIALES &amp; ENTREGABLES
                </h4>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-2.5">
                  {activeService.useCases.map((useCase) => (
                    <div
                      key={useCase.title}
                      className="rounded-sm border border-[var(--border-hairline)] bg-[#060609]/85 p-3.5 transition-colors duration-300 hover:border-[rgba(197,160,89,0.35)]"
                    >
                      <p className="font-serif text-[15px] font-medium text-[var(--text-ivory)]">
                        {useCase.title}
                      </p>
                      <p className="mt-1 font-sans text-xs font-light leading-relaxed text-platinum/85">
                        {useCase.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impacto de Negocio + CTA Contextual */}
              <div className="flex flex-col gap-4 rounded-sm border border-[var(--border-hairline)] border-l-2 border-l-[var(--accent-gold)] bg-[rgba(197,160,89,0.04)] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--accent-gold-light)]">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                    <span>IMPACTO DE NEGOCIO</span>
                  </div>
                  <p className="font-sans text-xs sm:text-[13px] font-normal leading-relaxed text-ivory/95">
                    {activeService.businessImpact}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onConsultService(activeService.id)}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-[var(--border-active)] bg-[#0A0A0E] px-4 py-2.5 font-mono text-[11px] tracking-[0.13em] uppercase text-[var(--accent-gold-light)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[#040405] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  <span>CONSULTAR PILAR</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* =====================================================================
          VISTA MOBILE & TABLET (< lg): ACORDEONES TÁCTILES SUAVES (60 FPS)
         ===================================================================== */}
      <div className="flex flex-col gap-3.5 lg:hidden">
        {SERVICES_DATA.map((service) => {
          const isExpanded = mobileOpenId === service.id;
          const Icon = SERVICE_ICONS[service.id];

          return (
            <div
              key={service.id}
              className={`relative rounded-sm border transition-colors duration-300 ${
                isExpanded
                  ? 'border-[var(--border-active)] bg-[#09090D]/95'
                  : 'border-[var(--border-hairline)] bg-[#07070A]/75'
              }`}
            >
              <EngravedCorners active={isExpanded} />

              <button
                type="button"
                onClick={() => handleToggleMobile(service.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between gap-3 p-5 text-left focus:outline-none"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.15em] text-[var(--accent-gold)]">
                    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
                      <span>[ {service.index} ]</span>
                    </span>
                    <span className="text-[var(--text-muted)]">// {service.modalLabel}</span>
                  </div>
                  <h3 className="font-serif text-xl leading-snug text-[var(--text-ivory)]">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs font-light text-[var(--text-platinum)]">
                    {service.subtitle}
                  </p>
                </div>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-transform duration-300 ${
                    isExpanded
                      ? 'rotate-180 border-[var(--border-active)] text-[var(--accent-gold-light)]'
                      : 'border-[var(--border-hairline)] text-[var(--text-platinum)]'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 border-t border-[var(--border-hairline)] px-5 pb-5 pt-4">
                      {/* Blueprint SVG */}
                      <div className="blueprint-grid-bg rounded-sm border border-[var(--border-hairline)] bg-[#050507] p-3">
                        <ServiceBlueprintSvg serviceId={service.id} />
                      </div>

                      {/* Descripción Ejecutiva */}
                      <p className="font-sans text-sm font-light leading-relaxed text-[var(--text-platinum)]">
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.capabilities.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-[var(--border-hairline)] bg-[var(--surface-elevated)] px-2.5 py-1 font-mono text-[10px] text-ivory/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Casos de Uso */}
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                          CASOS DE USO EMPRESARIALES
                        </p>
                        {service.useCases.map((uc) => (
                          <div
                            key={uc.title}
                            className="rounded-sm border border-[var(--border-hairline)] bg-[#060608] p-3"
                          >
                            <p className="font-serif text-sm font-medium text-[var(--text-ivory)]">
                              {uc.title}
                            </p>
                            <p className="mt-0.5 font-sans text-xs font-light text-platinum/85">
                              {uc.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Impacto de Negocio */}
                      <div className="rounded-sm border border-[var(--border-hairline)] border-l-2 border-l-[var(--accent-gold)] bg-[rgba(197,160,89,0.05)] p-3.5">
                        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--accent-gold-light)]">
                          IMPACTO DE NEGOCIO
                        </p>
                        <p className="mt-1 font-sans text-xs leading-relaxed text-[var(--text-ivory)]">
                          {service.businessImpact}
                        </p>
                      </div>

                      {/* CTA Móvil */}
                      <button
                        type="button"
                        onClick={() => onConsultService(service.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-sm border border-[var(--border-active)] bg-[rgba(197,160,89,0.12)] py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--accent-gold-light)] active:bg-[var(--accent-gold)] active:text-[#040405]"
                      >
                        <span>CONSULTAR SOBRE ESTE PILAR</span>
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
                      </button>
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
