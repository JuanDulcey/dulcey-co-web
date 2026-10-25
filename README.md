# Dulcey & Co. — Executive Digital Suite

Suite digital interactiva (SPA) para **Dulcey & Co.** — *Computational Engineering & Bespoke Software*. Diseñada bajo una estética que fusiona alta relojería ejecutiva con ingeniería de software de vanguardia.

## Stack Tecnológico

- **Core:** React 18 + TypeScript + Vite 6
- **Estilos & Tokens:** Tailwind CSS + Variables CSS nativas (iluminación metálica dinámica *Spotlight*)
- **Animaciones:** Framer Motion + GSAP (calibración horológica de entrada)
- **Motor Gráfico:** HTML5 `<canvas>` 2D nativo a 60 FPS (`useExecutiveParticles`) adaptativo para Desktop y Mobile
- **Iconografía:** Lucide React (`strokeWidth={1.25}`)

## Comandos Disponibles

```bash
# Iniciar entorno de desarrollo
npm run dev

# Verificación estricta de tipos TypeScript
npm run typecheck

# Compilar versión optimizada para producción
npm run build

# Previsualizar build de producción localmente
npm run preview
```

## Estructura Principal

```text
src/
├── components/
│   ├── BrandLogo.tsx            # Emblema SVG modular con guía para logo definitivo
│   ├── ContactModal.tsx         # Modal ejecutivo con selector de pilar y brief inteligente
│   ├── EngravedCorners.tsx      # Remates geométricos de 8px en oro envejecido
│   ├── ExecutiveFooter.tsx      # Reloj UTC-5 en vivo, telemetría y CTA magnético
│   ├── ExecutivePreloader.tsx   # Secuencia inicial GSAP con memoria de sesión
│   ├── HeroSection.tsx          # Manifiesto de precisión editorial
│   ├── Navbar.tsx               # Cabecera de tarjeta ejecutiva y estado en vivo
│   ├── NoiseOverlay.tsx         # Textura analógica SVG (<feTurbulence>)
│   ├── ParticleCanvas.tsx       # Lienzo de partículas neurales en polvo de oro
│   ├── PhilosophyBar.tsx        # El Estándar Dulcey & Co. (3 axiomas)
│   ├── ServiceBlueprintSvg.tsx  # Esquemas técnicos vectoriales animados por pilar
│   └── ServicesShowcase.tsx     # Consola dual 40/60 (Desktop) y acordeón táctil (Mobile)
├── data/
│   ├── contact.ts               # Credenciales corporativas centralizadas (Email / WhatsApp)
│   └── services.ts              # Datos estructurados de los 4 pilares y filosofía
└── hooks/
    ├── useColombiaClock.ts      # Sincronización horaria America/Bogota (UTC-5)
    ├── useExecutiveParticles.ts # Física de nodos neurales y optimización móvil
    └── useSpotlight.ts          # Iluminación radial por coordenadas de cursor (rAF)
```

## Personalización Rápida

1. **Logo definitivo:** Reemplazar el bloque `<svg>` temporal en `src/components/BrandLogo.tsx` (y opcionalmente `public/favicon.svg`).
2. **Canales de contacto:** Configurar el correo y línea oficial de WhatsApp en `src/data/contact.ts` (`EXECUTIVE_CONTACT_CONFIG`).

---

© 2026 Dulcey & Co. Ingeniería desde Colombia.
