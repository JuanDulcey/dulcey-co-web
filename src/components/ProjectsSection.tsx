import { SELECTED_PROJECTS } from '../data/projects';
import { ProtectedImage } from './ProtectedImage';
import { SectionHeader } from './SectionHeader';

/**
 * Proyectos Selectos — Galería editorial blindada.
 * Se oculta por completo mientras `SELECTED_PROJECTS` esté vacío (cero secciones vacías).
 * Cada imagen usa `<ProtectedImage />` (doble capa anticopia y antidescarga).
 */
export function ProjectsSection() {
  if (SELECTED_PROJECTS.length === 0) return null;

  return (
    <section aria-labelledby="dulcey-projects-heading" className="relative z-10 border-t border-[var(--border-hairline)]">
      <SectionHeader
        id="dulcey-projects-heading"
        title="Proyectos Selectos"
        aside="Una muestra discreta de encargos realizados"
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-5 py-8 sm:grid-cols-2 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        {SELECTED_PROJECTS.map((project) => (
          <article key={project.title} className="group break-inside-avoid">
            <div className="overflow-hidden border border-[var(--border-hairline)] transition-colors duration-500 group-hover:border-[var(--border-active)]">
              <ProtectedImage
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                wrapperClassName="block w-full"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.025]"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                {project.category}
              </p>
              <span className="font-serif text-sm italic text-[var(--text-muted)]">{project.year}</span>
            </div>
            <h3 className="mt-1.5 font-serif text-xl font-normal text-[var(--text-ivory)]">{project.title}</h3>
            {project.description && (
              <p className="mt-2 font-sans text-sm font-light leading-[1.7] text-[var(--text-platinum)]">
                {project.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
