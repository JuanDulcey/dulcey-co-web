/**
 * ============================================================================
 * PROYECTOS SELECTOS — DULCEY & CO.
 * ============================================================================
 * La sección permanece OCULTA mientras este arreglo esté vacío y aparece
 * automáticamente al agregar el primer proyecto.
 *
 * Ejemplo:
 *   {
 *     title: 'Plataforma Comercial Hacienda El Roble',
 *     category: 'Arquitectura Web',
 *     year: '2026',
 *     image: '/proyectos/hacienda-el-roble.webp', // archivo dentro de public/
 *     description: 'Comercio electrónico de autor con tiempos de carga inferiores a un segundo.',
 *   },
 *
 * Recomendación: imágenes .webp de 1600×1200 px (proporción 4:3).
 * Todas las imágenes quedan blindadas contra copia, arrastre y descarga.
 * ============================================================================
 */
export interface SelectedProject {
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
}

export const SELECTED_PROJECTS: readonly SelectedProject[] = [];
