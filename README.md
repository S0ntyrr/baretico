# OBRA NEGRA — tienda de ropa con motion design

> Streetwear minimalista de autor hecho en Bogotá. *Prendas en construcción.*

Sitio de e-commerce **simulado** construido con **React + Vite + Framer Motion**, con una pieza
original animada en **Lottie**. Proyecto académico de motion design para la web.

- **Sitio publicado:** `https://<tu-usuario>.github.io/obra-negra/` *(se activa al hacer push, ver "Publicación")*
- **Guía de marca (1 página):** ruta `/#/marca` del sitio y [`docs/BRAND.md`](docs/BRAND.md)

## Páginas
| Ruta | Página | Motion destacado |
|---|---|---|
| `/` | Inicio | Hero: plano que se traza → letras que suben con máscara → prenda con parallax; marquee; manifiesto que "fragua" con el scroll |
| `/catalogo` | Catálogo | Filtros con indicador compartido (`layoutId`), tarjetas que se reacomodan (`layout` + `AnimatePresence`), hover con elevación y CTA |
| `/producto/:id` | Detalle | Revelado con `clip-path`, selector de talla animado, error que "tiembla", botón con cambio de estado y **vuelo al carrito** |
| `/carrito` | Carrito (simulado) | Líneas que entran/salen, contador que rueda, total que cuenta, badge del carrito con anticipación |
| `/nosotros` | Nosotros | **Pieza Lottie original**, línea de tiempo que crece con el scroll |
| `/contacto` | Contacto | Validación con feedback animado, envío simulado con estado de carga y confirmación |
| `/marca` | Guía de marca | Logo, paleta con contrastes, tipografía, tono y tokens de movimiento |

Transición entre todas las páginas: panel negro "colado" (`AnimatePresence mode="wait"`).

## Cómo correrlo
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/ para medir con Lighthouse
```
Regenerar la pieza Lottie: `python3 design/build-lottie.py`.

## Publicación (GitHub Pages)
1. Crea el repositorio vacío `obra-negra` en GitHub.
2. `git remote add origin https://github.com/<tu-usuario>/obra-negra.git && git push -u origin main`
3. En GitHub → *Settings → Pages → Source:* **GitHub Actions**. El workflow
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compila y publica en cada push a `main`.

Se usa `HashRouter` + `base: './'`, así que las rutas funcionan en Pages sin configuración extra.

## Resultados medidos (Lighthouse móvil, build de producción)
| Página | Rendimiento | Accesibilidad | Buenas prácticas |
|---|---|---|---|
| Inicio | 91 | 100 | 100 |
| Catálogo | 94 | 100 | 100 |
| Producto | 92 | 100 | 100 |
| Carrito | 94 | 100 | 100 |
| Nosotros | 89 | 100 | 100 |
| Contacto | 94 | 100 | 100 |
| Marca | 92 | 100 | 100 |

Detalle de mediciones y optimizaciones en [`docs/DECISIONES.md`](docs/DECISIONES.md).

## Documentación
- [`docs/BRAND.md`](docs/BRAND.md) — guía de marca de una página
- [`docs/MOTION.md`](docs/MOTION.md) — principios de animación aplicados, pieza por pieza
- [`docs/DECISIONES.md`](docs/DECISIONES.md) — decisiones de diseño y desarrollo, rendimiento y accesibilidad
- [`docs/EQUIPO.md`](docs/EQUIPO.md) — roles, fases de entrega y flujo de Git
- [`docs/CREDITOS.md`](docs/CREDITOS.md) — origen y licencia de todo el material

## Estructura
```
src/
  App.jsx               rutas + transiciones + MotionConfig(reducedMotion="user")
  motion/tokens.js      duraciones, curvas y stagger (sistema de movimiento)
  components/           Header, Page (transición), Reveal (scroll), ProductCard,
                        Garment (ilustraciones SVG), LottiePiece, FlyLayer, Logo
  pages/                Home, Catalog, Product, Cart, About, Contact, Brand, NotFound
  context/CartContext   carrito simulado (useReducer + localStorage)
  assets/obra-negra-mark.json   pieza Lottie original
design/build-lottie.py  fuente de la pieza Lottie
```
