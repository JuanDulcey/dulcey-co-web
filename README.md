# Dulcey & Co.

Tarjeta digital institucional de **Dulcey & Co.** — *Ingeniería Computacional y Software a Medida*. Diseñada bajo criterios de papelería ejecutiva privada, tipografía clásica de alto contraste y precisión técnica.

## Tecnologías

- **Núcleo:** React 18 + TypeScript + Vite 6
- **Estilos:** Tailwind CSS + Variables CSS nativas con iluminación perimetral dinámica
- **Movimiento:** Framer Motion + GSAP (apertura silenciosa de monograma)
- **Lienzo Ambiental:** HTML5 `<canvas>` 2D nativo a 60 FPS (`useExecutiveParticles`) adaptativo según el dispositivo

## Comandos

```bash
# Entorno de desarrollo
npm run dev

# Revisión estricta de tipos TypeScript
npm run typecheck

# Compilación de producción
npm run build

# Previsualización local de producción
npm run preview
```

## Estructura

```text
src/
├── components/
│   ├── BrandLogo.tsx          # Sello octogonal modular con guía para emblema definitivo
│   ├── ContactModal.tsx       # Tarjeta de correspondencia privada (WhatsApp y Correo)
│   ├── EngravedCorners.tsx    # Remates biselados de 8px en oro envejecido
│   ├── ExecutiveFooter.tsx    # Derechos, hora local de Colombia y acción principal
│   ├── ExecutivePreloader.tsx # Apertura silenciosa de monograma con memoria de sesión
│   ├── HeroSection.tsx        # Manifiesto institucional en EB Garamond
│   ├── Navbar.tsx             # Membrete superior con contacto directo
│   ├── NoiseOverlay.tsx       # Textura analógica fija (<feTurbulence>)
│   ├── ParticleCanvas.tsx     # Lienzo ambiental en polvo de oro
│   ├── PhilosophyBar.tsx      # El Estándar Dulcey & Co. (tres principios)
│   └── ServicesShowcase.tsx   # Retícula editorial de las cuatro áreas de práctica
├── data/
│   ├── contact.ts             # Credenciales corporativas centralizadas
│   └── services.ts            # Textos institucionales de las cuatro áreas y principios
└── hooks/
    ├── useColombiaClock.ts      # Hora local en Colombia (America/Bogota)
    ├── useExecutiveParticles.ts # Física ambiental y ahorro energético en móvil
    └── useSpotlight.ts          # Iluminación de borde metálico por cursor
```

## Personalización

1. **Emblema definitivo:** Sustituir el bloque `<svg>` temporal en `src/components/BrandLogo.tsx` (y opcionalmente `public/favicon.svg`).
2. **Datos de contacto:** Actualizar correo y número de WhatsApp en `src/data/contact.ts` (`EXECUTIVE_CONTACT_CONFIG`).

---

© 2026 Dulcey & Co. · Ingeniería desde Colombia.
