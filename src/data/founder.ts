/**
 * ============================================================================
 * PERFIL DEL FUNDADOR — DULCEY & CO.
 * ============================================================================
 * Textos PROVISIONALES. Reemplázalos con tu información definitiva:
 * - `photo`: ruta en `public/` (p. ej. '/fundador.webp'). Déjalo vacío ('') para
 *   mostrar el monograma de iniciales. La foto queda blindada contra descarga.
 * ============================================================================
 */
export const FOUNDER_PROFILE = {
  name: 'Juan Dulcey',
  initials: 'JD',
  role: 'Fundador e Ingeniero Principal',
  photo: '' as string,
  bio: [
    'Ingeniero dedicado al diseño de arquitecturas de software, inteligencia artificial aplicada y ciencia de datos para empresas que exigen precisión.',
    'Dirige personalmente cada encargo de la firma: una relación directa, sin intermediarios, entre el cliente y quien construye su sistema.',
  ],
  quote:
    'Cada sistema que firmamos debe funcionar con la exactitud de un reloj y la discreción de una notaría.',
} as const;
