/**
 * Tokens de movimiento de BARETICO.
 * Cada valor responde a un principio de animación (ver docs/MOTION.md):
 *  - TIEMPO: duraciones cortas para feedback, largas solo para narrativa.
 *  - ACELERACIÓN: "colado" (ease-out fuerte) para entradas, "demolición" (ease-in) para salidas.
 *  - ANTICIPACIÓN: "carga" retrocede un poco antes de avanzar.
 *  - JERARQUÍA: stagger que guía la lectura de lo importante a lo secundario.
 */
export const dur = {
  micro: 0.18,   // feedback inmediato (hover, tap)
  short: 0.32,   // cambios de estado (botón agregado, filtros)
  base: 0.6,     // entradas de sección
  long: 0.9,     // hero / transición de página
}

export const ease = {
  colado: [0.16, 1, 0.3, 1],      // entra rápido y asienta (ease-out expo)
  demolicion: [0.7, 0, 0.84, 0],  // sale acelerando (ease-in)
  carga: [0.68, -0.6, 0.32, 1.6], // anticipación + overshoot (back in-out)
  firme: [0.65, 0, 0.35, 1],      // in-out para paneles
}

export const stagger = { tight: 0.04, base: 0.08, loose: 0.14 }

export const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: dur.base, ease: ease.colado, delay: i * stagger.base },
  }),
}
