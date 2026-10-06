# Punto Kinesio — sitio web

Sitio estático en Astro para Punto Kinesio (Kinesiología & Fisioterapia, Mendoza).

## Comandos

| Comando           | Qué hace                                                   |
| :---------------- | :--------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`          |
| `npm run build`   | Genera el sitio de producción en `dist/`                   |
| `npm run preview` | Sirve `dist/` localmente                                   |
| `npm run check`   | Revisión de tipos y plantillas                             |
| `npm run qa`      | QA en 375–1440 px: scroll horizontal, consola, H1, anclas  |
| `npm run assets`  | Regenera favicons e imagen para redes (`public/`)          |

## Cómo editar

- **Datos del negocio:** todo está en `src/data/business.ts` (nombre, WhatsApp, Instagram,
  servicios, equipo, galería, preguntas frecuentes). Para reutilizar el sitio con otro negocio,
  cambiá ese archivo y las fotos de `src/assets/images/`.
- **Diseño:** colores, tipografía y animaciones en `src/styles/global.css`.
- **Secciones:** un componente por sección en `src/components/`.

## Pendiente antes de publicar

- `siteUrl` en `business.ts` es provisorio: reemplazar por el dominio real.
- Dirección exacta: completar `location.street` (y `mapsQuery` si hace falta).
- Equipo: cargar profesionales en `team` (la sección muestra "Próximamente" mientras esté vacía).
- Fotos: las actuales son de stock (Unsplash, licencia libre). Reemplazar por fotos reales.
- Duración de servicios y más tratamientos: completar en `services`.
- Logo: está recreado en código (`src/components/Logo.astro`); se puede cambiar por el SVG oficial.
# punto-kinesio
