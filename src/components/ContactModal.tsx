import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EXECUTIVE_CONTACT_CONFIG,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/contact';
import { SERVICES_DATA, type ServiceId } from '../data/services';
import { EngravedCorners } from './EngravedCorners';
import { useSpotlight } from '../hooks/useSpotlight';

interface ContactModalProps {
  isOpen: boolean;
  initialServiceId: ServiceId;
  onClose: () => void;
}

/**
 * Tarjeta de Correspondencia Privada (Modal Ejecutivo de Contacto)
 * Estética de esquela grabada sobre obsidiana, selección por filetes finos
 * y líneas de escritura abiertas (`border-b`) en español íntegro.
 */
export function ContactModal({ isOpen, initialServiceId, onClose }: ContactModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [clientName, setClientName] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [copied, setCopied] = useState(false);

  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLDivElement>();

  useEffect(() => {
    if (isOpen) {
      setSelectedServiceId(initialServiceId);
    }
  }, [isOpen, initialServiceId]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const selectedService =
    SERVICES_DATA.find((item) => item.id === selectedServiceId) ?? SERVICES_DATA[0];

  const brief = {
    serviceId: selectedService.id,
    serviceTitle: selectedService.title,
    serviceShortLabel: selectedService.shortLabel,
    clientName,
    projectNote,
  };

  const whatsappUrl = buildWhatsAppUrl(brief);
  const mailtoUrl = buildMailtoUrl(brief);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EXECUTIVE_CONTACT_CONFIG.email);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EXECUTIVE_CONTACT_CONFIG.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
    }

    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dulcey-contact-modal-title"
        >
          {/* Velo oscuro desenfocado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040405]/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Esquela / Tarjeta Privada */}
          <motion.div
            ref={spotlightRef}
            {...spotlightHandlers}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="spotlight-module relative z-10 my-auto w-full max-w-[640px] border border-[var(--border-active)] bg-[#08080B]/95 p-6 sm:p-10 shadow-executive"
          >
            <EngravedCorners active />

            <div className="relative z-10">
              {/* Encabezado de Correspondencia */}
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                <div>
                  <span className="font-sans text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent-gold)]">
                    Correspondencia Privada · Dulcey &amp; Co.
                  </span>
                  <h2
                    id="dulcey-contact-modal-title"
                    className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[var(--text-ivory)]"
                  >
                    Agendar Consultoría <em className="italic text-[var(--accent-gold)]">Privada</em>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar ventana"
                  className="px-2 py-1 font-serif text-2xl leading-none text-[var(--text-platinum)] transition-colors hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                >
                  ×
                </button>
              </div>

              {/* Selección de Práctica */}
              <div className="mt-6">
                <span className="block font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Práctica de Interés
                </span>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[var(--border-hairline)]">
                  {SERVICES_DATA.map((service) => {
                    const active = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        aria-pressed={active}
                        className={`flex items-baseline justify-between gap-3 border-b border-r border-[var(--border-hairline)] px-4 py-3.5 text-left transition-colors duration-200 ${
                          active
                            ? 'bg-[rgba(197,160,89,0.09)] text-[var(--text-ivory)]'
                            : 'bg-transparent text-[var(--text-platinum)] hover:bg-[rgba(255,255,255,0.02)] hover:text-[var(--text-ivory)]'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="font-serif text-sm italic text-[var(--accent-gold)]">
                            {service.index}.
                          </span>
                          <span className="ml-2 font-sans text-xs font-light">
                            {service.shortLabel}
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            active ? 'bg-[var(--accent-gold-light)]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Líneas de Escritura (Opcionales) */}
              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="dulcey-client-name"
                    className="block font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Nombre o Firma Empresarial (Opcional)
                  </label>
                  <input
                    id="dulcey-client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Escriba su nombre o el de su organización"
                    className="mt-1.5 w-full border-b border-[var(--border-hairline)] bg-transparent py-2 font-sans text-sm font-light text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dulcey-project-note"
                    className="block font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Nota Breve sobre su Iniciativa (Opcional)
                  </label>
                  <input
                    id="dulcey-project-note"
                    type="text"
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    placeholder="Propósito principal o requerimiento general"
                    className="mt-1.5 w-full border-b border-[var(--border-hairline)] bg-transparent py-2 font-sans text-sm font-light text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Canales Directos */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXECUTIVE_CONTACT_CONFIG.whatsappEnabled && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 whitespace-nowrap border border-[var(--border-active)] bg-[var(--accent-gold)] px-4 py-3.5 font-sans text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#040405] transition-colors duration-200 hover:bg-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    <span>Conversar por WhatsApp</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                )}

                <a
                  href={mailtoUrl}
                  className="group flex items-center justify-center gap-2 whitespace-nowrap border border-[var(--border-active)] bg-transparent px-4 py-3.5 font-sans text-[10.5px] sm:text-[11px] font-normal uppercase tracking-[0.14em] text-[var(--accent-gold-light)] transition-colors duration-200 hover:bg-[rgba(197,160,89,0.1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                >
                  <span>Escribir por Correo</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>

              {/* Dirección Directa y Copiado */}
              <div className="mt-6 flex flex-col gap-2 border-t border-[var(--border-hairline)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-xs font-light text-[var(--text-platinum)]">
                  Dirección directa:{' '}
                  <span className="select-all text-[var(--text-ivory)]">
                    {EXECUTIVE_CONTACT_CONFIG.email}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="self-start sm:self-auto border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10.5px] uppercase tracking-[0.18em] text-[var(--accent-gold)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)]"
                >
                  {copied ? 'Dirección copiada' : 'Copiar dirección'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
