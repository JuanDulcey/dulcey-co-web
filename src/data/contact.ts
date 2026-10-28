import type { ServiceId } from './services';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA DE CONTACTO EJECUTIVO — DULCEY & CO.
 * ============================================================================
 * Edita este único bloque con tus credenciales definitivas de producción:
 * - `websiteUrl`: Dominio principal (alimenta QR, vCard y enlaces compartibles).
 * - `email`: Correo corporativo oficial.
 * - `whatsappNumber`: Solo dígitos en formato internacional sin '+' ni espacios
 *   (Ejemplo Colombia: '573101234567').
 * - `calendarUrl`: (Opcional) Enlace a Cal.com / agenda ejecutiva directa.
 * - `formEndpoint`: (Opcional) Endpoint POST (p. ej. Formspree / Resend Worker)
 *   para habilitar envío directo desde el formulario sin salir de la página.
 * ============================================================================
 */
export const EXECUTIVE_CONTACT_CONFIG = {
  firmName: 'Dulcey & Co.',
  tagline: 'Ingeniería Computacional y Software a Medida',
  websiteUrl: 'https://dulcey.co',
  email: 'contacto@dulcey.co',
  whatsappNumber: '573000000000',
  whatsappEnabled: true,
  calendarUrl: '' as string,
  formEndpoint: '' as string,

  // Membrete e Identidad Regional
  location: 'Villa de Leyva, Boyacá · Colombia',
  locationShort: 'Villa de Leyva · Boyacá',
  cityRegion: 'Villa de Leyva;Boyacá;;Colombia',
  coordinates: '05°38′00″N · 73°31′36″O',
  directActionLabel: 'Contacto Ejecutivo Directo',
  copyright: '© 2026 Dulcey & Co. · Todos los derechos reservados · Ingeniería desde Colombia.',
} as const;

export interface ConsultationBrief {
  serviceId: ServiceId;
  serviceTitle: string;
  serviceShortLabel: string;
  clientName?: string;
  projectNote?: string;
}

/**
 * Indica si hay un número de WhatsApp real configurado (no el marcador `573000000000`).
 * Los accesos de WhatsApp de la interfaz se ocultan automáticamente hasta entonces.
 */
export function hasRealWhatsApp(): boolean {
  const n = EXECUTIVE_CONTACT_CONFIG.whatsappNumber;
  return EXECUTIVE_CONTACT_CONFIG.whatsappEnabled && n.length >= 10 && !n.endsWith('00000000');
}

export function buildDirectWhatsAppUrl(): string {
  const text = 'Estimados señores de Dulcey & Co., quisiera conversar con ustedes.';
  return `https://wa.me/${EXECUTIVE_CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildDirectMailtoUrl(): string {
  return `mailto:${EXECUTIVE_CONTACT_CONFIG.email}?subject=${encodeURIComponent('Contacto | Dulcey & Co.')}`;
}

export function composeExecutiveSubject(brief: ConsultationBrief): string {
  return `Consultoría Privada — ${brief.serviceShortLabel} | Dulcey & Co.`;
}

/**
 * Redacta el mensaje ejecutivo de contacto según el área seleccionada
 * y los datos opcionales ingresados por el visitante.
 */
export function composeExecutiveMessage(brief: ConsultationBrief): string {
  const intro = `Estimados señores de Dulcey & Co., deseo agendar una consultoría privada en el área de ${brief.serviceShortLabel}.`;

  const details: string[] = [];
  if (brief.clientName && brief.clientName.trim().length > 0) {
    details.push(`Nombre / Firma: ${brief.clientName.trim()}`);
  }
  if (brief.projectNote && brief.projectNote.trim().length > 0) {
    details.push(`Contexto: ${brief.projectNote.trim()}`);
  }

  if (details.length === 0) {
    return `${intro}\n\nQuedo atento a su disponibilidad para conversar.`;
  }

  return `${intro}\n\n${details.join('\n')}\n\nQuedo atento a su disponibilidad para conversar.`;
}

export function buildWhatsAppUrl(brief: ConsultationBrief): string {
  const message = composeExecutiveMessage(brief);
  return `https://wa.me/${EXECUTIVE_CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(brief: ConsultationBrief): string {
  const subject = composeExecutiveSubject(brief);
  const body = composeExecutiveMessage(brief);
  return `mailto:${EXECUTIVE_CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildGmailComposeUrl(brief: ConsultationBrief): string {
  const subject = composeExecutiveSubject(brief);
  const body = composeExecutiveMessage(brief);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EXECUTIVE_CONTACT_CONFIG.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Genera el contenido estándar vCard 3.0 (.vcf) para guardar a Dulcey & Co.
 * directamente en la libreta de contactos de iOS, Android o computador.
 */
export function buildExecutiveVCard(): string {
  const hasRealPhone =
    EXECUTIVE_CONTACT_CONFIG.whatsappNumber.length >= 10 &&
    !EXECUTIVE_CONTACT_CONFIG.whatsappNumber.endsWith('00000000');

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:;${EXECUTIVE_CONTACT_CONFIG.firmName};;;`,
    `FN:${EXECUTIVE_CONTACT_CONFIG.firmName}`,
    `ORG:${EXECUTIVE_CONTACT_CONFIG.firmName}`,
    `TITLE:${EXECUTIVE_CONTACT_CONFIG.tagline}`,
    `EMAIL;TYPE=INTERNET,WORK,PREF:${EXECUTIVE_CONTACT_CONFIG.email}`,
    ...(hasRealPhone ? [`TEL;TYPE=CELL,WORK,VOICE:+${EXECUTIVE_CONTACT_CONFIG.whatsappNumber}`] : []),
    `URL:${EXECUTIVE_CONTACT_CONFIG.websiteUrl}`,
    `ADR;TYPE=WORK:;;${EXECUTIVE_CONTACT_CONFIG.cityRegion}`,
    'NOTE:Firma privada de ingeniería computacional, arquitectura web, software propietario, agentes de IA y ciencia de datos.',
    'END:VCARD',
  ];

  return lines.join('\r\n');
}

export function downloadExecutiveVCard(): void {
  const vcardContent = buildExecutiveVCard();
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'Dulcey-Co.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function getCanonicalQrUrl(): string {
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return `${window.location.origin}/`;
  }
  return `${EXECUTIVE_CONTACT_CONFIG.websiteUrl}/`;
}
