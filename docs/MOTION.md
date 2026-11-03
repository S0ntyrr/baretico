# Sistema de movimiento — principios aplicados

Regla: **cada animación responde "¿qué le comunica al usuario?"**. La interfaz (gris) se mueve sobria; el personaje es el que actúa.

## Animación principal: Baretico se cambia de ropa (`src/mascot/Mascot.jsx`)
| Fase | Duración / curva | Principio | Qué comunica |
|---|---|---|---|
| 1. Se agacha (scaleY .86, scaleX 1.08) | 140 ms, ease-out | **Anticipación** | "Algo va a pasar" |
| 2. Salta (y −64, estira) | 300 ms, ease-out | **Aceleración**, squash & stretch | Energía, respuesta al clic |
| 3. Nube + cambio en el punto más alto | 550 ms | **Jerarquía / staging** | Tapa el cambio y señala QUÉ prenda cambió (la nube aparece sobre esa prenda) |
| 4. La prenda nueva entra desde su dirección | resorte | **Arcos / follow-through** | La gorra cae desde arriba, el pantalón sube, la chaqueta se abre, los tenis pisan |
| 5. Cae | 220 ms, ease-in | **Aceleración** (gravedad) | Peso del personaje |
| 6. Aterriza (aplasta) y se asienta | 70 ms + resorte | Squash & stretch, **overshoot** | Fin de la acción |
| 7. Sonríe | 900 ms | Personalidad | Confirmación: "le gustó" |

La sombra se encoge cuando salta (comunica altura). Si cambian 3+ prendas a la vez ("Look original"), da un giro de 360°.
Los cambios se encolan: si el usuario hace clic rápido, Baretico termina un salto y hace el siguiente.

## Tokens (`src/motion/tokens.js`)
| Token | Valor | Uso |
|---|---|---|
| `dur.micro` | 0.18 s | hover, tap |
| `dur.short` | 0.32 s | estados, filtros, salidas |
| `dur.base` | 0.6 s | entradas al hacer scroll |
| `dur.long` | 0.9 s | hero, telón de página |
| `ease.colado` (entrada) | `cubic-bezier(.16,1,.3,1)` | llega rápido y asienta |
| `ease.demolicion` (salida) | `cubic-bezier(.7,0,.84,0)` | se va acelerando |
| `ease.carga` (rebote) | `cubic-bezier(.68,-.6,.32,1.6)` | confirmaciones |
| `ease.firme` (panel) | `cubic-bezier(.65,0,.35,1)` | telón, vuelo al carrito |

## Resto de piezas
| Animación | Dónde | Principio | Qué comunica |
|---|---|---|---|
| Letras con máscara → Baretico cae → controles | Hero | **Jerarquía** | Orden de lectura: marca, personaje, acción |
| Respiración idle (translateY 1.2 %) | Personaje | Vida secundaria | Está vivo, invita a interactuar |
| Telón negro entre páginas | Global | Aceleración in/out | Cambio de contexto |
| Indicadores compartidos (`layoutId`) | Probador, filtros, tallas, nav | Continuidad | Qué está seleccionado |
| Reacomodo al filtrar (`layout`) | Catálogo | Continuidad espacial | Qué piezas quedan |
| "Probar en Baretico" → personaje flotante se cambia | Catálogo | Feedback a distancia | El clic tiene efecto inmediato |
| Auto-vestir al entrar a un producto | Detalle | Staging | Cómo se ve la prenda puesta |
| Baretico vestido con el carrito | Carrito | Feedback | Resumen visual de la compra |
| Vuelo al carrito + badge con anticipación | Producto → header | Arcos | Dónde quedó el producto |
| Talla que tiembla | Detalle | Feedback de error | Falta un dato |
| Contador y total que cuentan | Carrito | Tiempo | Cuánto cambió |
| **Lottie: Baretico se alista** | Nosotros, Marca | Anticipación (la gorra sube antes de caer), squash (la cabeza se aplasta), follow-through (orejas) | Presenta al personaje |

## Reducir movimiento
- `<MotionConfig reducedMotion="user">` en toda la app.
- Baretico **cambia la prenda con un fundido**, sin salto, nube ni giro. La respiración se detiene.
- El telón se cambia por un fundido de 0.15 s; el vuelo al carrito no se dibuja (se anuncia por `aria-live`).
- El Lottie no se carga: se muestra el sello estático. El marquee se detiene.
