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
 * Dulcey & Co. — Executive Digital Suite (SPA)
 * Pliego Ejecutivo con Scroll Fluido sobre fondo de partículas neurales en polvo de oro,
 * textura analógica y bordes iluminados dinámicamente.
 */
export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('web-ecosystems');

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
      {/* Secuencia de Apertura GSAP (Calibración Horológica) */}
      <ExecutivePreloader suiteContainerRef={suiteRef} />

      {/* Motor 2D de Partículas "Gold Dust & Neural Nodes" */}
      <ParticleCanvas />

      {/* Textura Analógica Fija (SVG feTurbulence opacity 0.025) */}
      <NoiseOverlay />

      {/* Marco Perimetral del Pliego Ejecutivo */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-3 py-3 sm:px-6 sm:py-7 lg:px-10 lg:py-10">
        <main
          ref={spotlightRef}
          {...spotlightHandlers}
          className="executive-monolith spotlight-surface rounded-sm"
        >
          {/* Remates Biselados de 8px en las 4 Esquinas Principales */}
          <EngravedCorners active />

          {/* 5.1 Header de la Tarjeta Ejecutiva */}
          <Navbar onOpenContact={handleOpenGeneralContact} />
          <div className="horological-divider" role="separator" />

          {/* 5.2 Sección Hero (Manifiesto de Marca) */}
          <HeroSection />
          <div className="horological-divider" role="separator" />

          {/* 5.3 Núcleo Interactivo: Los 4 Pilares de Servicios */}
          <ServicesShowcase onConsultService={handleConsultSpecificService} />
          <div className="horological-divider" role="separator" />

          {/* 5.4 Sección de Metodología / Filosofía ("El Estándar Dulcey & Co.") */}
          <PhilosophyBar />
          <div className="horological-divider" role="separator" />

          {/* 5.5 Footer Ejecutivo & Acción de Contacto */}
          <ExecutiveFooter onOpenContact={handleOpenGeneralContact} />
        </main>
      </div>

      {/* Modal Ejecutivo de Consultoría Privada */}
      <ContactModal
        isOpen={isContactOpen}
        initialServiceId={selectedServiceId}
        onClose={handleCloseContact}
      />
    </div>
  );
}

export default App;
