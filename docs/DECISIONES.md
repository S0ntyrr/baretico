# Decisiones de diseño y desarrollo

## Diseño
| Decisión | Alternativa descartada | Por qué |
|---|---|---|
| El personaje ES la identidad (v2) | Logo abstracto "OBRA NEGRA" (v1) | Un personaje genera vínculo y da una razón al motion: la ropa se ve puesta y cambiar de prenda es un acto con personalidad |
| Tienda en grises + un solo acento (clorofila) | Interfaz colorida | El personaje ya es muy cromático; la interfaz neutra evita competir y mejora la legibilidad |
| Personaje en vector por capas | Usar los renders 3D | Cada prenda debe poder cambiarse por separado y animarse; los renders son imágenes planas, pesadas (>1 MB) y no permiten cambiar ropa |
| Miniaturas = recorte del mismo dibujo | Fotos de producto | Una sola fuente de verdad: lo que ves en la tarjeta es exactamente lo que se pone Baretico |
| Tenis de diseño propio | Copiar los de la hoja de personaje | La hoja original tiene logos de una marca deportiva; se reemplazaron por un diseño propio |
| Mobile-first; probador flotante en el catálogo móvil | Ocultar el personaje en móvil | En celular el personaje sigue reaccionando a cada "Probar" |

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
| `LookContext`: el look se comparte entre páginas y se guarda | Lo que pruebas en el catálogo sigue puesto en el detalle y el carrito |
| Definiciones SVG (patrones) en un único `<svg>` global | Varios SVG ocultos con los mismos `id` dejaban sin textura al personaje y vacío el carrito |
| "Deshacer" al guardar en el carrito | En celular tocar = agregar; deshacer evita compras accidentales |
| Cola de animaciones en `Mascot` | Clics rápidos no rompen la secuencia: termina un salto y hace el siguiente |
| Respiración idle en un `div` HTML (no en el SVG) | Se anima en el compositor; animar grupos del SVG repintaba el personaje cada frame (TBT 980 → 360 ms) |
| Carrito con `useReducer` + `localStorage` (con try/catch) | Simulado, persiste entre recargas, no se rompe en modo privado |
| Fuentes auto-hospedadas (Fontsource, `font-display: swap`) | Sin bloqueo por terceros; solo se descarga el subconjunto latino |

## Rendimiento — proceso de medición
Lighthouse 12, móvil, throttling por defecto, sobre `npm run preview`.

| Iteración | Inicio | TBT | Cambio |
|---|---|---|---|
| v1.1 | 78 | 760 ms | Primera versión |
| v1.2 | 91 | 240 ms | `LazyMotion` asíncrono, animaciones infinitas a CSS |
| v2.0 | 73 | 980 ms | Entra Baretico; orejas y cabeza animadas con CSS dentro del SVG |
| v2.1 | 87–90 | 360 ms | Idle movido a un `div` (compositor), sin animar nodos del SVG |
| v2.2 | 75 | 830 ms | Entra el ropero: 18 prendas con ~70 componentes animados |
| v2.3 | 84–87 | 340–450 ms | `memo` por prenda, etiqueta solo en la seleccionada, descolgar con CSS |

Resto de páginas: 89–94. Accesibilidad 100 en todas.

## Accesibilidad
- `prefers-reduced-motion` respetado en Framer Motion (`MotionConfig`), en el cambio de ropa de Baretico (fundido sin salto), CSS y Lottie.
- El personaje tiene `aria-label` que lista lo que lleva puesto; los botones del probador usan `aria-pressed`.
- Contraste verificado: textos ≥ 4.5:1; el manifiesto parte de gris 3.6:1 (texto grande, mínimo 3:1) y llega a negro.
- Primer hallazgo de Lighthouse: el manifiesto usaba `opacity: .18` (1.46:1) → se cambió a interpolación de color.
- Segundo hallazgo: orden de encabezados en catálogo (h1 → h3) → la tarjeta recibe nivel de encabezado por prop.
- Enlace "Saltar al contenido", foco visible naranja de 3 px, foco movido a `<main>` al cambiar de página.
- `aria-live` anuncia productos agregados, cantidades y número de piezas filtradas.
- Objetivos táctiles ≥ 44 px; formularios con `label`, `aria-invalid` y mensajes de error asociados.
