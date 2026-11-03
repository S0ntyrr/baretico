import { m, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { ease } from '../motion/tokens'

// Micro-interacción: la "pieza" vuela en arco hacia el carrito.
// Comunica DÓNDE quedó el producto (no solo decora).
function Flight({ f, onDone, reduced }) {
  useEffect(() => { if (reduced) onDone(f.id) }, [reduced, f.id, onDone])
  if (reduced) return null
  const dx = f.x1 - f.x0, dy = f.y1 - f.y0
  return (
    <m.span
      aria-hidden="true"
      className="fly"
      style={{ left: f.x0, top: f.y0, background: f.color }}
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={{ x: [0, dx * 0.4, dx], y: [0, dy - 120, dy], scale: [1, 1.2, 0.4] }}
      transition={{ duration: 0.7, ease: ease.firme, times: [0, 0.45, 1] }}
      onAnimationComplete={() => onDone(f.id)}
    />
  )
}

export default function FlyLayer() {
  const { flights, land } = useCart()
  const reduced = useReducedMotion()
  return flights.map((f) => <Flight key={f.id} f={f} onDone={land} reduced={reduced} />)
}
