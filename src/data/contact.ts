import type { ServiceId } from './services';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRALIZADA DE CONTACTO EJECUTIVO — DULCEY & CO.
 * ============================================================================
 * Reemplaza `email` y `whatsappNumber` con las credenciales definitivas
 * de la firma. Toda la tarjeta de correspondencia, enlaces directos y
 * copiado al portapapeles se actualizarán automáticamente.
 *
 * - `whatsappNumber`: Solo dígitos en formato internacional sin '+' ni espacios
 *   (Ejemplo Colombia: '573101234567').
 * - `email`: Correo corporativo oficial.
 * ============================================================================
 */
export const EXECUTIVE_CONTACT_CONFIG = {
  email: 'contacto@dulcey.co',
  whatsappNumber: '573000000000',
  whatsappEnabled: true,

  // Membrete e Identidad Regional
  location: 'Villa de Leyva, Boyacá · Colombia',
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
  const subject = `Consultoría Privada — ${brief.serviceShortLabel} | Dulcey & Co.`;
  const body = composeExecutiveMessage(brief);
  return `mailto:${EXECUTIVE_CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
