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

## Ropero (`src/mascot/Ropero.jsx`)
| Animación | Principio | Qué comunica |
|---|---|---|
| Pasar el cursor/foco: la prenda se balancea en su gancho (péndulo amortiguado), se adelanta y las demás se atenúan | Arcos, follow-through, **jerarquía** | Cuál prenda está seleccionada, como en una tienda física |
| Cae la etiqueta de precio girando desde el gancho | Staging | El precio aparece justo donde miras |
| Gorras, gafas y tenis "saltan" del estante con squash | Squash & stretch | Mismo feedback para objetos que no cuelgan |
| Clic: la prenda se descuelga y vuelve a aparecer | Anticipación de salida | Se la llevaron, pero hay stock |

## Guardar en el carrito
| Animación | Principio | Qué comunica |
|---|---|---|
| La prenda real vuela en arco hasta el ícono del carrito, girando y encogiéndose | Arcos, aceleración | Dónde quedó guardada |
| El carrito del header se hunde con el peso, rebota y rueda (ruedas giran); la prenda asoma en la canasta | **Anticipación**, follow-through | "Ya está adentro" |
| Aviso "Guardado en el carrito" con **Deshacer** | Feedback | Confirmación y salida a un toque accidental |

## Transición hacia el carrito ("carrito empuja")
| Fase | Duración / curva | Principio |
|---|---|---|
| Un carrito gigante entra rodando y arrastra una pantalla negra sobre la página actual | 750 ms, ease-in | Aceleración: gana velocidad |
| La pantalla negra se retira hacia la derecha | 600 ms, in-out | Continuidad de dirección (izquierda → derecha) |
| El carrito de la página llega rodando, **frena inclinándose hacia adelante** (inercia) y se asienta; líneas de velocidad | 1.1 s | Follow-through / overshoot |
| Las prendas caen una por una dentro de la canasta con rebote | resorte, stagger 120 ms | Peso; muestra el contenido |
| Quitar una prenda: sale volando fuera del carrito | 400 ms, ease-in | Qué se eliminó |

La ruta de destino se pasa con `AnimatePresence custom` para elegir la salida correcta.

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
- El telón y el "carrito empuja" se cambian por un fundido de 0.15 s; el carrito grande aparece quieto y las prendas con fundido.
- El vuelo al carrito no se dibuja (se anuncia por `aria-live`); el ropero no balancea las prendas.
- El Lottie no se carga: se muestra el sello estático. El marquee se detiene.
