import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import {
  EXECUTIVE_CONTACT_CONFIG,
  buildGmailComposeUrl,
  buildMailtoUrl,
  buildWhatsAppUrl,
  composeExecutiveMessage,
  downloadExecutiveVCard,
  getCanonicalQrUrl,
} from '../data/contact';
import { SERVICES_DATA, type ServiceId } from '../data/services';
import { EngravedCorners } from './EngravedCorners';
import { useSpotlight } from '../hooks/useSpotlight';
import { encodeQrMatrix } from '../utils/qrCode';

interface ContactModalProps {
  isOpen: boolean;
  initialServiceId: ServiceId;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Tarjeta de Correspondencia Privada (Esquela Ejecutiva de Contacto)
 * - Focus Trap hermético WAI-ARIA + restauración de foco al cerrar.
 * - Canales sin fricción: WhatsApp, App de Correo, Gmail Web, copiado de mensaje/correo
 *   y soporte opcional automático para `formEndpoint` o `calendarUrl`.
 * - Utilidades presenciales de tarjeta: descarga `vCard (.vcf)` y Código QR SVG autónomo.
 */
export function ContactModal({ isOpen, initialServiceId, onClose }: ContactModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [clientName, setClientName] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<'none' | 'email' | 'brief'>('none');
  const [qrOpen, setQrOpen] = useState(false);
  const [directStatus, setDirectStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { spotlightRef, spotlightHandlers } = useSpotlight<HTMLDivElement>();
  const dialogContainerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedServiceId(initialServiceId);
      setDirectStatus('idle');
    }
  }, [isOpen, initialServiceId]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Trasladar el foco inicial dentro de la esquela
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogContainerRef.current) {
        const focusable = Array.from(
          dialogContainerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first || !dialogContainerRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (!active || active === last || !dialogContainerRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
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
  const gmailUrl = buildGmailComposeUrl(brief);
  const qrTargetUrl = getCanonicalQrUrl();

  const qrMatrix = useMemo(() => {
    if (!qrOpen) return null;
    try {
      return encodeQrMatrix(qrTargetUrl);
    } catch {
      return null;
    }
  }, [qrOpen, qrTargetUrl]);

  const copyTextToClipboard = async (value: string, type: 'email' | 'brief') => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopyFeedback(type);
    window.setTimeout(() => setCopyFeedback('none'), 2600);
  };

  const handleDirectEndpointSubmit = async () => {
    if (!EXECUTIVE_CONTACT_CONFIG.formEndpoint) return;
    setDirectStatus('sending');
    try {
      const response = await fetch(EXECUTIVE_CONTACT_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firma: clientName || 'Sin especificar',
          practica: selectedService.title,
          nota: projectNote || 'Solicitud de consultoría privada',
          mensaje: composeExecutiveMessage(brief),
        }),
      });
      setDirectStatus(response.ok ? 'sent' : 'error');
    } catch {
      setDirectStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={dialogContainerRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dulcey-contact-modal-title"
        >
          {/* Velo oscuro desenfocado */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-[#040405]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Esquela / Tarjeta Privada */}
          <m.div
            ref={spotlightRef}
            {...spotlightHandlers}
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: 6 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="spotlight-module relative z-10 my-auto w-full max-w-[650px] border border-[var(--border-active)] bg-[var(--surface-elevated)] p-5 sm:p-10 shadow-executive"
          >
            <EngravedCorners active />

            <div className="relative z-10">
              {/* Encabezado de Correspondencia */}
              <div className="flex items-start justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 sm:pb-5">
                <div className="min-w-0">
                  <span className="block font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[var(--accent-gold)]">
                    Correspondencia Privada · Dulcey &amp; Co.
                  </span>
                  <h2
                    id="dulcey-contact-modal-title"
                    className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-balance text-[var(--text-ivory)]"
                  >
                    Agendar Consultoría <em className="italic text-[var(--accent-gold)]">Privada</em>
                  </h2>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar ventana"
                  className="shrink-0 px-2 py-1 font-serif text-2xl leading-none text-[var(--text-platinum)] transition-colors hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                >
                  ×
                </button>
              </div>

              {/* Selección de Práctica */}
              <div className="mt-5 sm:mt-6">
                <span className="block font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[var(--text-muted)]">
                  Práctica de Interés
                </span>

                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[var(--border-hairline)]">
                  {SERVICES_DATA.map((service) => {
                    const active = service.id === selectedServiceId;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        aria-pressed={active}
                        className={`flex items-baseline justify-between gap-2.5 border-b border-r border-[var(--border-hairline)] px-3.5 py-3 sm:px-4 sm:py-3.5 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--accent-gold)] ${
                          active
                            ? 'bg-[rgba(197,160,89,0.1)] text-[var(--text-ivory)]'
                            : 'bg-transparent text-[var(--text-platinum)] hover:bg-[rgba(197,160,89,0.05)] hover:text-[var(--text-ivory)]'
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
              <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="dulcey-client-name"
                    className="block font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.17em] sm:tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Nombre o Firma Empresarial (Opcional)
                  </label>
                  <input
                    id="dulcey-client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Su nombre u organización"
                    className="mt-1.5 w-full border-b border-[var(--border-hairline)] bg-transparent py-2 font-sans text-sm font-light text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dulcey-project-note"
                    className="block font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.17em] sm:tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Nota Breve sobre su Iniciativa (Opcional)
                  </label>
                  <input
                    id="dulcey-project-note"
                    type="text"
                    value={projectNote}
                    onChange={(e) => setProjectNote(e.target.value)}
                    placeholder="Propósito o requerimiento general"
                    className="mt-1.5 w-full border-b border-[var(--border-hairline)] bg-transparent py-2 font-sans text-sm font-light text-[var(--text-ivory)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Canales Principales de Contacto */}
              <div className="mt-7 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXECUTIVE_CONTACT_CONFIG.whatsappEnabled && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 border border-[var(--border-active)] bg-[var(--accent-gold)] px-3.5 py-3.5 text-center font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white dark:text-[#040405] transition-colors duration-200 hover:bg-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
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

                {EXECUTIVE_CONTACT_CONFIG.formEndpoint ? (
                  <button
                    type="button"
                    disabled={directStatus === 'sending' || directStatus === 'sent'}
                    onClick={handleDirectEndpointSubmit}
                    className="group flex items-center justify-center gap-2 border border-[var(--border-active)] bg-transparent px-3.5 py-3.5 text-center font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--accent-gold-light)] transition-colors duration-200 hover:bg-[rgba(197,160,89,0.1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    <span>
                      {directStatus === 'sent'
                        ? 'Correspondencia enviada'
                        : directStatus === 'sending'
                          ? 'Enviando nota...'
                          : 'Enviar Nota Directa'}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <a
                    href={mailtoUrl}
                    className="group flex items-center justify-center gap-2 border border-[var(--border-active)] bg-transparent px-3.5 py-3.5 text-center font-sans text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--accent-gold-light)] transition-colors duration-200 hover:bg-[rgba(197,160,89,0.1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold-light)]"
                  >
                    <span>Escribir por Correo</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                )}
              </div>

              {/* Alternativas Sin Fricción para Navegador (Gmail Web · Copiar Mensaje · Agenda Opcional) */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[10px]">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-[var(--border-hairline)] pb-0.5 font-sans uppercase tracking-[0.15em] text-[var(--text-platinum)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    Abrir en Gmail Web ↗
                  </a>

                  <button
                    type="button"
                    onClick={() => copyTextToClipboard(composeExecutiveMessage(brief), 'brief')}
                    className="border-b border-[var(--border-hairline)] pb-0.5 font-sans uppercase tracking-[0.15em] text-[var(--text-platinum)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    {copyFeedback === 'brief' ? 'Mensaje copiado' : 'Copiar mensaje redactado'}
                  </button>

                  {EXECUTIVE_CONTACT_CONFIG.calendarUrl && (
                    <a
                      href={EXECUTIVE_CONTACT_CONFIG.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-[var(--border-active)] pb-0.5 font-sans uppercase tracking-[0.15em] text-[var(--accent-gold-light)] transition-colors hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                    >
                      Reservar horario directo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Pie de Esquela: Correo Directo + Utilidades de Tarjeta Física (vCard y QR) */}
              <div className="mt-5 border-t border-[var(--border-hairline)] pt-4 space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-sans text-xs font-light text-[var(--text-platinum)] break-all sm:break-normal">
                    Dirección directa:{' '}
                    <span className="select-all text-[var(--text-ivory)]">
                      {EXECUTIVE_CONTACT_CONFIG.email}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => copyTextToClipboard(EXECUTIVE_CONTACT_CONFIG.email, 'email')}
                    className="self-start sm:self-auto border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.16em] text-[var(--accent-gold)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    {copyFeedback === 'email' ? 'Dirección copiada' : 'Copiar dirección'}
                  </button>
                </div>

                {/* Herramientas de Tarjeta de Presentación Presencial */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-3.5">
                  <button
                    type="button"
                    onClick={downloadExecutiveVCard}
                    className="border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--accent-gold-light)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    Guardar contacto (.vcf)
                  </button>

                  <button
                    type="button"
                    aria-expanded={qrOpen}
                    onClick={() => setQrOpen((prev) => !prev)}
                    className="border-b border-[var(--border-hairline)] pb-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[var(--text-platinum)] transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--text-ivory)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-gold)]"
                  >
                    {qrOpen ? 'Ocultar código QR −' : 'Código QR de la firma +'}
                  </button>
                </div>

                {/* Sello QR Desplegable (Alto contraste >16:1 sobre marfil cálido para lectura instantánea) */}
                <AnimatePresence initial={false}>
                  {qrOpen && qrMatrix && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 flex flex-col items-center gap-3 border border-[var(--border-hairline)] bg-[var(--surface-card)] p-4 sm:flex-row sm:gap-5">
                        <div className="shrink-0 border border-[var(--border-active)] bg-[#F4F1EA] p-2.5">
                          <svg
                            viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}
                            className="h-28 w-28 sm:h-32 sm:w-32"
                            shapeRendering="crispEdges"
                            role="img"
                            aria-label={`Código QR hacia ${qrTargetUrl}`}
                          >
                            <rect width={qrMatrix.length} height={qrMatrix.length} fill="#F4F1EA" />
                            {qrMatrix.map((row, r) =>
                              row.map((dark, c) =>
                                dark ? (
                                  <rect
                                    key={`${r}-${c}`}
                                    x={c}
                                    y={r}
                                    width={1}
                                    height={1}
                                    fill="#070709"
                                  />
                                ) : null
                              )
                            )}
                          </svg>
                        </div>

                        <div className="text-center sm:text-left">
                          <p className="font-serif text-base italic text-[var(--accent-gold-light)]">
                            Tarjeta Digital Dulcey &amp; Co.
                          </p>
                          <p className="mt-1 font-sans text-xs font-light leading-relaxed text-[var(--text-platinum)]">
                            Escanee este sello con la cámara de cualquier teléfono para abrir
                            directamente la tarjeta institucional de la firma.
                          </p>
                          <p className="mt-1.5 font-sans text-[10.5px] tracking-[0.12em] text-[var(--text-muted)]">
                            {qrTargetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </p>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;
