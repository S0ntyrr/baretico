# Sistema de movimiento — principios aplicados

Regla del proyecto: **cada animación debe responder "¿qué le comunica al usuario?"**. Si la respuesta es "nada", no se hace.

## Tokens (`src/motion/tokens.js`)
| Token | Valor | Principio | Uso |
|---|---|---|---|
| `dur.micro` | 0.18 s | Tiempo | hover, tap: debe sentirse instantáneo (<200 ms) |
| `dur.short` | 0.32 s | Tiempo | cambios de estado, filtros, salidas |
| `dur.base` | 0.6 s | Tiempo | entrada de secciones al hacer scroll |
| `dur.long` | 0.9 s | Tiempo | hero y transición de página (momentos narrativos) |
| `ease.colado` | `cubic-bezier(.16,1,.3,1)` | Aceleración | entradas: llega rápido y asienta suave |
| `ease.demolicion` | `cubic-bezier(.7,0,.84,0)` | Aceleración | salidas: arranca lento y se va acelerando |
| `ease.carga` | `cubic-bezier(.68,-.6,.32,1.6)` | Anticipación + overshoot | confirmaciones (pedido listo, mensaje enviado) |
| `ease.firme` | `cubic-bezier(.65,0,.35,1)` | Aceleración simétrica | paneles, cortina, vuelo al carrito |
| `stagger` | 0.04 / 0.08 / 0.14 s | Jerarquía | orden de lectura |

Las salidas son siempre **más cortas** que las entradas: al usuario le importa lo que llega, no lo que se va.

## Pieza por pieza
| Animación | Dónde | Principio | Qué comunica |
|---|---|---|---|
| Plano que se traza → letras → prenda → texto/CTA | Hero | **Jerarquía** (secuencia de 1.4 s) | Orden de lectura: concepto, marca, producto, acción |
| Letras que suben desde una máscara | Hero | Tiempo + aceleración | La marca "emerge" del suelo, como una obra |
| Parallax prenda/título | Hero | Jerarquía (profundidad) | Separa capas: producto delante del nombre |
| Manifiesto que pasa de gris a negro | Inicio | Scroll ligado al progreso | El ritmo de lectura del usuario controla la animación |
| Revelado al hacer scroll (`Reveal`) | Todas | Jerarquía con stagger | Agrupa elementos y marca el orden |
| Cortina negra entre páginas | Global | Aceleración (in demolición / out colado) | Cambio de contexto claro; oculta el salto de scroll |
| Indicador de filtro/nav compartido (`layoutId`) | Catálogo, header | Continuidad | Dónde estoy y qué cambió |
| Reacomodo de tarjetas al filtrar (`layout`) | Catálogo | Continuidad espacial | Qué piezas quedan, sin saltos |
| Hover: prenda se eleva y aparece "Ver pieza" | Tarjeta | Micro-interacción | Es clicable y qué pasará |
| Selector de talla que tiembla + mensaje | Producto | Feedback de error | "Falta algo aquí" sin modal |
| Botón cambia a "✓ Agregado" (texto rueda) | Producto | Feedback de estado | La acción se completó |
| **Vuelo al carrito** en arco | Producto → header | Arcos + aceleración | Dónde quedó el producto |
| Badge del carrito se comprime y salta | Header | **Anticipación** | El contador cambió |
| Líneas que entran/salen + `layout` | Carrito | Continuidad | Qué se quitó, cómo se reacomoda |
| Número de cantidad rueda, total cuenta | Carrito | Tiempo | Cuánto cambió |
| Confirmación con overshoot | Carrito, contacto | Anticipación/overshoot | Éxito, cierre de tarea |
| **Sello Lottie** (marco → colado → varilla) | Nosotros, Marca | Anticipación (marco se contrae 6 % antes del colado), follow-through (rebote del colado y la varilla) | Cuenta el concepto de marca: se construye |

## Reducir movimiento
- `<MotionConfig reducedMotion="user">`: Framer Motion desactiva transformaciones y deja solo opacidad.
- La cortina de página se reemplaza por un fundido de 0.15 s.
- El vuelo al carrito no se dibuja; solo cambia el contador (anunciado por `aria-live`).
- La pieza Lottie no se carga: se muestra el sello estático.
- CSS: `@media (prefers-reduced-motion: reduce)` detiene el marquee, la flotación y las transiciones.
