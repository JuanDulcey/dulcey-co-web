import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import { EngravedCorners } from './components/EngravedCorners';
import { ExecutiveFooter } from './components/ExecutiveFooter';
import { ExecutivePreloader } from './components/ExecutivePreloader';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NoiseOverlay } from './components/NoiseOverlay';
import { ParticleCanvas } from './components/ParticleCanvas';
import { PhilosophyBar } from './components/PhilosophyBar';
import { ServicesShowcase } from './components/ServicesShowcase';
import { isServiceId, type ServiceId } from './data/services';
import { useMediaProtection } from './hooks/useMediaProtection';
import { useSpotlight } from './hooks/useSpotlight';

const ContactModal = lazy(() => import('./components/ContactModal'));

function readInitialRouteState(): { serviceId: ServiceId; openModal: boolean } {
  if (typeof window === 'undefined') {
    return { serviceId: 'arquitectura-web', openModal: false };
  }
  const rawHash = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  if (rawHash === 'contacto' || rawHash === 'consultoria') {
    return { serviceId: 'arquitectura-web', openModal: true };
  }
  if (isServiceId(rawHash)) {
    return { serviceId: rawHash, openModal: false };
  }
  return { serviceId: 'arquitectura-web', openModal: false };
}

/**
 * Dulcey & Co. — Tarjeta Institucional de Negocios (SPA · Edición 10/10)
 * Pliego monolítico grabado en obsidiana y oro envejecido con soporte de enlaces
 * profundos (`#hash`), accesibilidad `reducedMotion` / `inert` y modo Dossier PDF.
 */
export function App() {
  const initial = readInitialRouteState();
  const [activeServiceId, setActiveServiceId] = useState<ServiceId>(initial.serviceId);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(initial.openModal);

  // Blindaje automático de activos multimedia (bloquea descarga, clic derecho y arrastre de imágenes)
  useMediaProtection();

  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLElement>();

  // Bloqueo semántico nativo (`HTMLElement.inert`) mientras la esquela modal está abierta
  useEffect(() => {
    const mainEl = spotlightRef.current;
    if (!mainEl) return;
    mainEl.inert = isContactOpen;
  }, [isContactOpen, spotlightRef]);

  // Sincronización con navegación de historial / enlaces profundos (#agentes-ia, #contacto, etc.)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '').trim().toLowerCase();
      if (hash === 'contacto' || hash === 'consultoria') {
        setIsContactOpen(true);
      } else if (isServiceId(hash)) {
        setActiveServiceId(hash);
        setIsContactOpen(false);
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleSelectService = useCallback((serviceId: ServiceId) => {
    setActiveServiceId(serviceId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${serviceId}`);
    }
  }, []);

  const handleOpenGeneralContact = useCallback(() => {
    setIsContactOpen(true);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#contacto');
    }
  }, []);

  const handleConsultSpecificService = useCallback((serviceId: ServiceId) => {
    setActiveServiceId(serviceId);
    setIsContactOpen(true);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#contacto');
    }
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#contacto') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-dvh w-full bg-[var(--bg-obsidian)] text-[var(--text-ivory)]">
          {/* Apertura Silenciosa de Monograma */}
          <ExecutivePreloader />

          {/* Fondo Sutil de Polvo de Oro y Nodos */}
          <ParticleCanvas />

          {/* Textura Analógica Estática (0 costo de filtro GPU) */}
          <NoiseOverlay />

          {/* Marco Perimetral de la Tarjeta Institucional */}
          <div className="relative z-10 mx-auto w-full max-w-[1360px] px-2.5 py-3 sm:px-6 sm:py-8 lg:px-10 lg:py-12 print:max-w-none print:p-0">
            <main
              ref={spotlightRef}
              {...spotlightHandlers}
              aria-hidden={isContactOpen || undefined}
              className="executive-monolith spotlight-surface"
            >
              {/* Biselado Horológico Exclusivo en las 4 Esquinas Exteriores */}
              <EngravedCorners active />

              {/* Membrete Institucional */}
              <Navbar onOpenContact={handleOpenGeneralContact} />
              <hr
                aria-hidden="true"
                className="border-0 border-t border-[var(--border-hairline)]"
              />

              {/* Manifiesto y Garantías Ejecutivas */}
              <HeroSection />
              <hr
                aria-hidden="true"
                className="border-0 border-t border-[var(--border-hairline)]"
              />

              {/* Las Cuatro Áreas de Práctica */}
              <ServicesShowcase
                activeServiceId={activeServiceId}
                onSelectService={handleSelectService}
                onConsultService={handleConsultSpecificService}
              />
              <hr
                aria-hidden="true"
                className="border-0 border-t border-[var(--border-hairline)]"
              />

              {/* El Estándar Dulcey & Co. */}
              <PhilosophyBar />
              <hr
                aria-hidden="true"
                className="border-0 border-t border-[var(--border-hairline)]"
              />

              {/* Pie Institucional y Consultoría Privada */}
              <ExecutiveFooter onOpenContact={handleOpenGeneralContact} />
            </main>
          </div>

          {/* Tarjeta de Correspondencia Privada (Carga diferida bajo demanda) */}
          <Suspense fallback={null}>
            <ContactModal
              isOpen={isContactOpen}
              initialServiceId={activeServiceId}
              onClose={handleCloseContact}
            />
          </Suspense>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
