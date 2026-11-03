# Trabajo en equipo

## Roles
| Rol | Responsable | Entregables |
|---|---|---|
| Dirección de arte / UI | _(nombre)_ | Guía de marca, hoja de personaje, UI en Figma, ilustración por capas de Baretico |
| Motion designer | _(nombre)_ | Animación de cambio de ropa, tokens, pieza Lottie, micro-interacciones |
| Front-end | _(nombre)_ | Componentes React, rutas, carrito, integración de animaciones |
| QA · rendimiento · accesibilidad | _(nombre)_ | Lighthouse por página, pruebas en dispositivos, reducir movimiento, contraste |
| Documentación / PM | _(nombre)_ | README, decisiones, tablero de tareas, sustentación |

## Fases de entrega
| Fase | Contenido | Rama / etiqueta |
|---|---|---|
| F1 · Identidad | Concepto, guía de marca, moodboard, wireframes móvil y escritorio | `v0.1-identidad` |
| F2 · Maqueta | Estructura React, 6 páginas estáticas responsive, datos de catálogo | `v0.2-maqueta` |
| F3 · Motion | Hero, transiciones, scroll, micro-interacciones, pieza Lottie | `v0.3-motion` |
| F4 · Optimización | Lighthouse ≥ 80 móvil, reducir movimiento, contraste, correcciones | `v0.4-optimizacion` |
| F5 · Publicación | Deploy en GitHub Pages, documentación final | `v1.0` |
| F6 · Rediseño Baretico | Personaje como identidad, probador animado, paleta gris, nuevo Lottie, nueva medición | `v2.0` |

## Flujo de Git
- `main` siempre publicable (se despliega automáticamente).
- Una rama por tarea: `feat/hero-animado`, `fix/contraste-manifiesto`, `docs/motion`.
- Commits convencionales: `feat:`, `fix:`, `perf:`, `a11y:`, `docs:`, `chore:`.
- Pull request con la plantilla (`.github/pull_request_template.md`) y revisión de al menos otro rol.
- Al cerrar cada fase: `git tag v0.X-nombre && git push --tags`.
