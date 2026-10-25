import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail, MessageSquare, Shield, X } from 'lucide-react';
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
 * Modal Ejecutivo de Contacto (Sección 5.5 + Decisiones 4 & 5)
 * - Permite elegir el área de interés entre los 4 pilares.
 * - Incluye campos opcionales inteligentes (Nombre/Firma y Contexto Breve) que
 *   pre-redactan automáticamente WhatsApp (`wa.me`) y Email (`mailto:`).
 * - Permite copiar el correo corporativo en un clic con confirmación visual.
 */
export function ContactModal({ isOpen, initialServiceId, onClose }: ContactModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [clientName, setClientName] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [copied, setCopied] = useState(false);

  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLDivElement>();

  // Sincronizar cuando se abre desde un pilar específico en ServicesShowcase
  useEffect(() => {
    if (isOpen) {
      setSelectedServiceId(initialServiceId);
    }
  }, [isOpen, initialServiceId]);

  // Cierre con tecla Escape y bloqueo de scroll del documento
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
    serviceModalLabel: selectedService.modalLabel,
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dulcey-contact-modal-title"
        >
          {/* Fondo desenfocado de obsidiana */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040405]/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Tarjeta Privada de Contacto */}
          <motion.div
            ref={spotlightRef}
            {...spotlightHandlers}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="spotlight-module relative z-10 my-auto w-full max-w-2xl rounded-sm border border-[var(--border-active)] bg-[#09090D]/95 p-5 sm:p-8 shadow-executive"
          >
            <EngravedCorners active />

            <div className="relative z-10 space-y-6">
              {/* Cabecera del Modal */}
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-gold)]">
                    [ CANAL RESERVADO // DULCEY &amp; CO. ]
                  </span>
                  <h2
                    id="dulcey-contact-modal-title"
                    className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[var(--text-ivory)]"
                  >
                    Agendar Consultoría <span className="italic text-[var(--accent-gold)]">Privada</span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar ventana de consultoría"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[var(--border-hairline)] bg-[#060608] text-[var(--text-platinum)] transition-colors hover:border-[var(--border-active)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.25} />
                </button>
              </div>

              {/* Paso 1: Selección de Área de Interés */}
              <div>
                <label className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)] mb-2.5">
                  01 // SELECCIONE EL ÁREA DE INTERÉS
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES_DATA.map((service) => {
                    const active = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        aria-pressed={active}
                        className={`flex items-center justify-between gap-2 rounded-sm border px-3.5 py-3 text-left transition-all duration-200 ${
                          active
                            ? 'border-[var(--border-active)] bg-[rgba(197,160,89,0.12)] text-[var(--text-ivory)]'
                            : 'border-[var(--border-hairline)] bg-[#060609] text-[var(--text-platinum)] hover:border-[rgba(197,160,89,0.35)] hover:text-[var(--text-ivory)]'
                        }`}
                      >
                        <div>
                          <span className="block font-mono text-[10px] tracking-[0.15em] text-[var(--accent-gold)]">
                            [ {service.index} ]
                          </span>
                          <span className="mt-0.5 block font-sans text-xs sm:text-[13px] font-medium">
                            {service.modalLabel}
                          </span>
                        </div>

                        <span
                          className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                            active ? 'bg-[var(--accent-gold-light)] shadow-[0_0_8px_#E5C787]' : 'bg-muted/50'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paso 2: Brief Opcional Inteligente */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                    02 // CONTEXTO EJECUTIVO (OPCIONAL)
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-gold/80">
                    PRE-REDACTA SU MENSAJE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label htmlFor="dulcey-client-name" className="sr-only">
                      Nombre o Firma
                    </label>
                    <input
                      id="dulcey-client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Su nombre o firma empresarial"
                      className="w-full rounded-sm border border-[var(--border-hairline)] bg-[#050508] px-3.5 py-2.5 font-sans text-xs sm:text-sm font-light text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-active)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="dulcey-project-note" className="sr-only">
                      Nota breve del requerimiento
                    </label>
                    <textarea
                      id="dulcey-project-note"
                      rows={2}
                      value={projectNote}
                      onChange={(e) => setProjectNote(e.target.value)}
                      placeholder="Objetivo clave, integración deseada o alcance estimado"
                      className="w-full resize-none rounded-sm border border-[var(--border-hairline)] bg-[#050508] px-3.5 py-2.5 font-sans text-xs sm:text-sm font-light leading-relaxed text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-active)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Paso 3: Canales Directos de Despacho */}
              <div className="space-y-3 pt-1">
                <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                  03 // INICIAR CONVERSACIÓN DIRECTA
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXECUTIVE_CONTACT_CONFIG.whatsappEnabled && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 rounded-sm border border-[var(--border-active)] bg-[var(--accent-gold)] px-4 py-3 font-mono text-[11px] font-medium tracking-[0.13em] uppercase text-[#040405] transition-all duration-200 hover:bg-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold-light)]"
                    >
                      <MessageSquare className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      <span>WHATSAPP EJECUTIVO</span>
                    </a>
                  )}

                  <a
                    href={mailtoUrl}
                    className="flex items-center justify-center gap-2.5 rounded-sm border border-[var(--border-active)] bg-[#0E0E13] px-4 py-3 font-mono text-[11px] tracking-[0.13em] uppercase text-[var(--accent-gold-light)] transition-all duration-200 hover:bg-[rgba(197,160,89,0.14)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                    <span>EMAIL CORPORATIVO</span>
                  </a>
                </div>

                {/* Copiar correo directo al portapapeles */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-sm border border-[var(--border-hairline)] bg-[#050508] px-3.5 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-platinum)]">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      DIRECTO:
                    </span>
                    <span className="select-all text-[var(--text-ivory)]">
                      {EXECUTIVE_CONTACT_CONFIG.email}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-[var(--border-hairline)] bg-[var(--surface-elevated)] px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--accent-gold-light)] transition-colors hover:border-[var(--border-active)]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#10B981]" strokeWidth={1.5} />
                        <span className="text-[#10B981]">CORREO COPIADO</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" strokeWidth={1.25} />
                        <span>COPIAR CORREO</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pie de confidencialidad */}
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] tracking-[0.11em] text-[var(--text-muted)]">
                <Shield
                  className="h-3.5 w-3.5 shrink-0 text-gold/75"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span>
                  TODA COMUNICACIÓN SE RIGE BAJO ESTRICTA RESERVA Y CONFIDENCIALIDAD EJECUTIVA.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
