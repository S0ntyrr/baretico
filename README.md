# BARETICO — tienda de ropa con motion design

> Streetwear parcero de Bogotá. **Pruébatelo en Baretico.**

E-commerce **simulado** con **React + Vite + Framer Motion**. La identidad es el personaje: **Baretico**, un perro de rizos chocolate con gafas verde clorofila.
Eliges una prenda y Baretico **se cambia de ropa con una animación**: se agacha, salta, aparece una nube, cambia la prenda en el aire y aterriza.
La tienda es gris y minimalista para que el color lo ponga él.

- **Sitio publicado:** `https://<tu-usuario>.github.io/baretico/` *(se activa al hacer push, ver "Publicación")*
- **Guía de marca (1 página):** ruta `/#/marca` y [`docs/BRAND.md`](docs/BRAND.md)

## Páginas
| Ruta | Página | Motion destacado |
|---|---|---|
| `/` | Inicio | Título con máscara, Baretico cae al escenario con resorte, **probador** con 6 prendas × 3 opciones, manifiesto ligado al scroll |
| `/catalogo` | Catálogo | Probador lateral (flotante en móvil), botón "Probar en Baretico" en cada tarjeta, filtros con `layoutId` y reacomodo con `layout` |
| `/producto/:id` | Detalle | Al entrar, **Baretico se pone la prenda**; selector de talla, error que tiembla, botón con cambio de estado y vuelo al carrito |
| `/carrito` | Carrito (simulado) | Baretico se viste **con lo que hay en el carrito**; líneas que entran/salen, contador que rueda, total que cuenta |
| `/nosotros` | Nosotros | **Pieza Lottie original** (Baretico se alista), tres looks, línea de tiempo con scroll |
| `/contacto` | Contacto | Validación animada y envío simulado |
| `/marca` | Guía de marca | Personaje, logo, paletas, tipografía, tono y tokens de movimiento |

## Cómo correrlo
```bash
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview   # para medir con Lighthouse
```
Regenerar la pieza Lottie: `python3 design/build-lottie.py`.

## Publicación (GitHub Pages)
1. Crea el repositorio `baretico` en GitHub.
2. `git remote add origin https://github.com/<tu-usuario>/baretico.git && git push -u origin main --tags`
3. GitHub → *Settings → Pages → Source:* **GitHub Actions**. El workflow `.github/workflows/deploy.yml` publica en cada push.

## Resultados (Lighthouse móvil, build de producción)
| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Inicio | 90 | 100 | 100 | 100 |
| Catálogo | 92 | 100 | 100 | 100 |
| Producto | 91 | 100 | 100 | 100 |
| Carrito | 94 | 100 | 100 | 100 |
| Nosotros | 89 | 100 | 100 | 100 |
| Contacto | 94 | 100 | 100 | 100 |
| Marca | 89 | 100 | 100 | 100 |

## Estructura
```
src/mascot/parts.jsx     Baretico dibujado por capas (cuerpo + 6 prendas × 3 variantes)
src/mascot/Mascot.jsx    Animación de cambio de ropa (anticipación → salto → nube → aterrizaje)
src/mascot/Probador.jsx  Selector de prendas
src/mascot/Thumb.jsx     Miniatura de una prenda (recorta el mismo dibujo)
src/context/LookContext  Lo que Baretico tiene puesto (compartido entre páginas)
src/context/CartContext  Carrito simulado
src/motion/tokens.js     Duraciones, curvas y stagger
design/build-lottie.py   Fuente de la pieza Lottie
docs/                    Marca, motion, decisiones, equipo, créditos
```
