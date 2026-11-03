import { Defs, garments, crops } from './parts'

// Miniatura de una prenda sola, recortando el mismo dibujo del personaje.
export default function Thumb({ slot, variant, label, className }) {
  const G = garments[slot][variant]
  return (
    <svg viewBox={crops[slot]} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <Defs /><G />
    </svg>
  )
}
