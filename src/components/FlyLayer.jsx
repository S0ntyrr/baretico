import { m, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import Thumb from '../mascot/Thumb'

// Micro-interacción: la PRENDA misma vuela en arco y cae dentro del carrito.
// Comunica dónde quedó guardada (no solo decora).
function Flight({ f, onDone, reduced }) {
  useEffect(() => { if (reduced) onDone(f.id) }, [reduced, f.id, onDone])
  if (reduced) return null
  const p = getProduct(f.productId)
  const dx = f.x1 - f.x0, dy = f.y1 - f.y0
  // pico del arco por encima del destino, pero sin salirse de la pantalla
  const peak = Math.max(40 - f.y0, Math.min(0, dy) - 90)
  return (
    <m.div aria-hidden="true" className="fly" style={{ left: f.x0, top: f.y0 }}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={{ x: [0, dx * 0.35, dx * 0.85, dx], y: [0, peak, peak + (dy - peak) * 0.6, dy + 4], scale: [1, 1.15, 0.6, 0.25], rotate: [0, -18, 10, 0] }}
      transition={{ duration: 0.8, ease: 'easeInOut', times: [0, 0.4, 0.8, 1] }}
      onAnimationComplete={() => onDone(f.id)}>
      <Thumb slot={p.slot} variant={p.variant} />
    </m.div>
  )
}

export default function FlyLayer() {
  const { flights, land } = useCart()
  const reduced = useReducedMotion()
  return flights.map((f) => <Flight key={f.id} f={f} onDone={land} reduced={reduced} />)
}
