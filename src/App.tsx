import { useCallback, useRef, useState } from 'react';
import { ContactModal } from './components/ContactModal';
import { EngravedCorners } from './components/EngravedCorners';
import { ExecutiveFooter } from './components/ExecutiveFooter';
import { ExecutivePreloader } from './components/ExecutivePreloader';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NoiseOverlay } from './components/NoiseOverlay';
import { ParticleCanvas } from './components/ParticleCanvas';
import { PhilosophyBar } from './components/PhilosophyBar';
import { ServicesShowcase } from './components/ServicesShowcase';
import type { ServiceId } from './data/services';
import { useSpotlight } from './hooks/useSpotlight';

/**
 * Dulcey & Co. — Tarjeta Institucional de Negocios (SPA)
 * Pliego monolítico grabado en obsidiana y oro envejecido sobre constelaciones sutiles.
 */
export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('arquitectura-web');

  const suiteRef = useRef<HTMLDivElement | null>(null);
  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLElement>();

  const handleOpenGeneralContact = useCallback(() => {
    setIsContactOpen(true);
  }, []);

  const handleConsultSpecificService = useCallback((serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    setIsContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  return (
    <div
      ref={suiteRef}
      className="relative min-h-dvh w-full bg-[var(--bg-obsidian)] text-[var(--text-ivory)]"
    >
      {/* Apertura Silenciosa de Monograma */}
      <ExecutivePreloader suiteContainerRef={suiteRef} />

      {/* Fondo Sutil de Polvo de Oro y Nodos */}
      <ParticleCanvas />

      {/* Textura Analógica de Papel Algodón / Metal Cepillado */}
      <NoiseOverlay />

      {/* Marco Perimetral de la Tarjeta Institucional */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-3 py-4 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
        <main
          ref={spotlightRef}
          {...spotlightHandlers}
          className="executive-monolith spotlight-surface"
        >
          {/* Biselado Horológico Exclusivo en las 4 Esquinas Exteriores */}
          <EngravedCorners active />

          {/* Membrete Institucional */}
          <Navbar onOpenContact={handleOpenGeneralContact} />
          <div className="border-t border-[var(--border-hairline)]" role="separator" />

          {/* Manifiesto de la Firma */}
          <HeroSection />
          <div className="border-t border-[var(--border-hairline)]" role="separator" />

          {/* Las Cuatro Áreas de Práctica */}
          <ServicesShowcase onConsultService={handleConsultSpecificService} />
          <div className="border-t border-[var(--border-hairline)]" role="separator" />

          {/* El Estándar Dulcey & Co. */}
          <PhilosophyBar />
          <div className="border-t border-[var(--border-hairline)]" role="separator" />

          {/* Pie Institucional y Consultoría Privada */}
          <ExecutiveFooter onOpenContact={handleOpenGeneralContact} />
        </main>
      </div>

      {/* Tarjeta de Correspondencia Privada */}
      <ContactModal
        isOpen={isContactOpen}
        initialServiceId={selectedServiceId}
        onClose={handleCloseContact}
      />
    </div>
  );
}

export default App;
