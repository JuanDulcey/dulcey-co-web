# Dulcey & Co.

Tarjeta digital institucional de **Dulcey & Co.** — *Ingeniería Computacional y Software a Medida*. Diseñada bajo estándares de papelería ejecutiva suiza, tipografía clásica auto-hospedada, cero dependencias externas de rastreo y utilidades reales para reuniones directivas.

## Arquitectura y Capacidades

- **Núcleo Ultraligero:** React 18 + TypeScript estricto + Vite 6 + Tailwind CSS
- **Tipografía Auto-Hospedada (`.woff2`):** *EB Garamond* (`400`, `400i`) e *Inter* (`300–500`) precargadas localmente para cero parpadeo tipográfico (*FOUT*) y cero bloqueo externo
- **Movimiento Unificado:** `LazyMotion` + `MotionConfig reducedMotion="user"` de Framer Motion
- **Lienzo Ambiental Adaptativo:** `<canvas>` 2D nativo (`useExecutiveParticles`) con ahorro energético en dispositivos móviles y textura analógica estática de costo cero en GPU
- **Herramientas Ejecutivas Integradas:**
  - Vista previa grabada **Open Graph (`1200×630`)** para WhatsApp, LinkedIn, iMessage y X (`public/og-dulcey.png`)
  - Descarga directa de contacto **`vCard 3.0 (.vcf)`** (*Guardar en Contactos*)
  - **Código QR institucional en SVG** codificado localmente bajo ISO/IEC 18004 (cero APIs externas)
  - **Modo Dossier Impreso / PDF (`@media print`)** que despliega automáticamente las 4 áreas de práctica completas en formato A4 limpio
  - **Enlaces profundos (`#hash`)** hacia cada práctica (`#arquitectura-web`, `#software-medida`, `#agentes-ia`, `#ciencia-datos`, `#contacto`)

## Comandos

```bash
# Entorno de desarrollo
npm run dev

# Revisión estricta de tipos TypeScript
npm run typecheck

# Compilación optimizada de producción
npm run build

# Previsualización local de producción
npm run preview
```

## Personalización Rápida para Producción

1. **Credenciales corporativas:** Edita `src/data/contact.ts` (`EXECUTIVE_CONTACT_CONFIG`) con tu dominio final, correo, número de WhatsApp y (opcionalmente) `calendarUrl` o `formEndpoint`. Tanto `vCard`, como el QR, WhatsApp y los enlaces de correo se actualizarán automáticamente.
2. **Emblema oficial:** Ya se encuentra integrado el isotipo oficial desde `public/logo.png` con variantes optimizadas WebP/PNG y tamaños para PWA/Favicon. Para futuras actualizaciones de marca, basta con sustituir `public/logo.png`.
3. **Blindaje de propiedad intelectual para imágenes:** El sistema incluye protección global activa (`useMediaProtection` + reglas CSS) que bloquea silenciosamente clic derecho, arrastre y menús de guardado en cualquier etiqueta `<img>` o `<picture>`. Para máxima protección en futuras imágenes y galerías, puedes usar directamente el componente `<ProtectedImage src="..." alt="..." />` (`src/components/ProtectedImage.tsx`), el cual añade un escudo frontal transparente contra pulsaciones largas en dispositivos móviles iOS y Android.

---

© 2026 Dulcey & Co. · Ingeniería desde Colombia.
