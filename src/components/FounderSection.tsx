import { FOUNDER_PROFILE } from '../data/founder';
import { ProtectedImage } from './ProtectedImage';
import { SectionHeader } from './SectionHeader';

/**
 * El Fundador — quién está detrás de la firma.
 * Retrato blindado (o monograma de iniciales en filete dorado si no hay foto),
 * nombre, cargo, trayectoria breve y cita de firma.
 */
export function FounderSection() {
  const { name, initials, role, photo, bio, quote } = FOUNDER_PROFILE;

  return (
    <section aria-labelledby="dulcey-founder-heading" className="relative z-10">
      <SectionHeader id="dulcey-founder-heading" title="El Fundador" aside="Una relación directa con quien construye" />

      <div className="grid grid-cols-1 items-center gap-8 px-5 py-9 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-10 sm:py-11 lg:gap-14 lg:px-14 lg:py-14 print:py-6">
        {/* Retrato o monograma */}
        <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36 lg:h-44 lg:w-44">
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full border border-[var(--border-hairline)] print:hidden"
          />
          {photo ? (
            <ProtectedImage
              src={photo}
              alt={`Retrato de ${name}`}
              loading="lazy"
              wrapperClassName="block h-full w-full rounded-full border border-[var(--border-active)]"
              className="h-full w-full rounded-full object-cover grayscale-[25%]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center rounded-full border border-[var(--border-active)] bg-[radial-gradient(circle_at_30%_25%,rgba(197,160,89,0.14),transparent_65%)]"
            >
              <span className="font-serif text-4xl italic tracking-[0.06em] text-[var(--accent-gold)] sm:text-5xl lg:text-6xl">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className="min-w-0 max-w-3xl">
          <h3 className="font-serif text-[1.9rem] font-normal leading-tight text-[var(--text-ivory)] sm:text-4xl">
            {name}
          </h3>
          <p className="mt-2 font-sans text-[10.5px] uppercase tracking-[0.2em] text-[var(--accent-gold-light)]">
            {role}
          </p>

          <div className="mt-5 space-y-3">
            {bio.map((line) => (
              <p
                key={line}
                className="font-sans text-[15px] font-light leading-[1.78] text-pretty text-[var(--text-platinum)] print:text-[10px]"
              >
                {line}
              </p>
            ))}
          </div>

          <blockquote className="mt-6 border-l border-[var(--accent-gold)] pl-5">
            <p className="font-serif text-lg italic leading-relaxed text-pretty text-[var(--text-ivory)] sm:text-xl">
              «{quote}»
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
