# Decisiones de diseño y desarrollo

## Diseño
| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| Concepto "obra negra" (ciudad en construcción) | Streetwear genérico | Da un vocabulario propio para nombres, tono, paleta y **movimiento** (trazar, colar, fraguar) |
| Paleta de obra: cal, cemento, negro + naranja de señalización | Negro total con neón | Minimalismo legible; el naranja tiene un rol único (acción/foco) y contraste 6:1 con negro |
| Archivo variable (eje de ancho) | Dos familias (condensada + texto) | Una sola fuente para títulos condensados y texto: menos KB y coherencia |
| Ilustraciones SVG en lugar de fotos | Fotos de stock | Material 100 % propio, <1 KB por prenda, look "plano técnico", sin LCP pesado |
| Bordes 2 px, radio 0, retícula visible | Tarjetas con sombra y radio | Estética de plano/estructura; minimalismo de autor |
| Mobile-first, breakpoints 420 / 640 / 900 px | — | Menú a pantalla completa en móvil, grid 1→2→4 columnas |

## Desarrollo
| Decisión | Por qué |
|---|---|
| React + Vite | Componentes reutilizables, build rápido, code-splitting nativo |
| Framer Motion (`m` + `LazyMotion` asíncrono) | `AnimatePresence` para salidas, `layout`/`layoutId` para continuidad, `useScroll` para scroll; las features se cargan después del primer render |
| CSS para animaciones infinitas (marquee, flotación) | Corren en el compositor, no en el hilo principal |
| `HashRouter` + `base: './'` | Funciona en GitHub Pages sin reescrituras de servidor |
| Rutas con `React.lazy` | El inicio no descarga el código de carrito, contacto, etc. |
| Lottie con `lottie_light` cargado por `IntersectionObserver` | El reproductor (47 KB gz) solo se descarga si la pieza entra en pantalla; se pausa al salir |
| Lottie generado por script (`design/build-lottie.py`) | Fuente versionable y editable; 3.7 KB |
| Carrito con `useReducer` + `localStorage` (con try/catch) | Simulado, persiste entre recargas, no se rompe en modo privado |
| Fuentes auto-hospedadas (Fontsource, `font-display: swap`) | Sin bloqueo por terceros; solo se descarga el subconjunto latino |

## Rendimiento — proceso de medición
Medido con Lighthouse 12 (móvil, throttling por defecto) sobre `npm run preview`.

| Iteración | Inicio: rendimiento | TBT | Cambio |
|---|---|---|---|
| 1 | 78 | 760 ms | Primera versión |
| 2 | 91 | 240 ms | `LazyMotion` asíncrono (−80 KB del bundle inicial), flotación del hero movida de JS a CSS |

Resto de páginas: 89–94. Accesibilidad: 100 en todas.

## Accesibilidad
- `prefers-reduced-motion` respetado en Framer Motion (`MotionConfig`), CSS y Lottie (ver `docs/MOTION.md`).
- Contraste verificado: textos ≥ 4.5:1; el manifiesto parte de gris 3.1:1 (texto grande, mínimo 3:1) y llega a negro.
- Primer hallazgo de Lighthouse: el manifiesto usaba `opacity: .18` (1.46:1) → se cambió a interpolación de color.
- Segundo hallazgo: orden de encabezados en catálogo (h1 → h3) → la tarjeta recibe nivel de encabezado por prop.
- Enlace "Saltar al contenido", foco visible naranja de 3 px, foco movido a `<main>` al cambiar de página.
- `aria-live` anuncia productos agregados, cantidades y número de piezas filtradas.
- Objetivos táctiles ≥ 44 px; formularios con `label`, `aria-invalid` y mensajes de error asociados.
