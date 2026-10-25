import type { ServiceId } from './services';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA DE CONTACTO EJECUTIVO — DULCEY & CO.
 * ============================================================================
 * Reemplaza `email` y `whatsappNumber` con las credenciales definitivas
 * de la firma. Toda la aplicación (Modal de Contacto, enlaces directos y
 * copiado al portapapeles) se actualizará automáticamente.
 *
 * - `whatsappNumber`: Solo dígitos en formato internacional sin '+' ni espacios
 *   (Ejemplo Colombia: '573101234567').
 * - `email`: Correo corporativo oficial.
 * ============================================================================
 */
export const EXECUTIVE_CONTACT_CONFIG = {
  email: 'contacto@dulcey.co',
  whatsappNumber: '573000000000',
  whatsappDisplay: '+57 300 000 0000',
  whatsappEnabled: true,

  // Telemetría e Identidad Regional (Sección 5.1 & 5.5)
  location: 'VILLA DE LEYVA, BOYACÁ — COL',
  coordinates: '05°38′00″N 73°31′36″W',
  statusText: 'SYSTEMS NOMINAL // DISPONIBILIDAD EJECUTIVA',
  copyright:
    '© 2026 DULCEY & CO. TODOS LOS DERECHOS RESERVADOS. INGENIERÍA DESDE COLOMBIA.',
} as const;

export interface ConsultationBrief {
  serviceId: ServiceId;
  serviceTitle: string;
  serviceModalLabel: string;
  clientName?: string;
  projectNote?: string;
}

/**
 * Construye el mensaje ejecutivo pre-redactado según el pilar elegido
 * y los campos opcionales ingresados por el visitante.
 */
export function composeExecutiveMessage(brief: ConsultationBrief): string {
  const header = `Estimado equipo de Dulcey & Co., deseo agendar una consultoría privada sobre [${brief.serviceModalLabel} — ${brief.serviceTitle}].`;

  const details: string[] = [];
  if (brief.clientName && brief.clientName.trim().length > 0) {
    details.push(`Nombre / Firma: ${brief.clientName.trim()}`);
  }
  if (brief.projectNote && brief.projectNote.trim().length > 0) {
    details.push(`Contexto Ejecutivo: ${brief.projectNote.trim()}`);
  }

  if (details.length === 0) {
    return `${header}\n\nQuedo atento a su disponibilidad ejecutiva para conversar.`;
  }

  return `${header}\n\n${details.join('\n')}\n\nQuedo atento a su disponibilidad ejecutiva.`;
}

export function buildWhatsAppUrl(brief: ConsultationBrief): string {
  const message = composeExecutiveMessage(brief);
  return `https://wa.me/${EXECUTIVE_CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(brief: ConsultationBrief): string {
  const subject = `Consultoría Privada — ${brief.serviceModalLabel} | Dulcey & Co.`;
  const body = composeExecutiveMessage(brief);
  return `mailto:${EXECUTIVE_CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
