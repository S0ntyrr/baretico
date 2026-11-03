import { useCallback, useRef } from 'react'
import { m } from 'framer-motion'
import Mascot from './Mascot'
import Ropero from './Ropero'
import { useLook } from '../context/LookContext'
import { useCart } from '../context/CartContext'
import { getProduct, formatCOP } from '../data/products'

export const midSize = (p) => p.sizes[Math.floor((p.sizes.length - 1) / 2)]

/** Probador: ropero a la derecha, Baretico a la izquierda. Tocar una prenda = se la pone + al carrito. */
export default function Probador() {
  const { look, outfit, wear, reset } = useLook()
  const { add } = useCart()
  const addBtn = useRef(null)
  const items = Object.values(look).map(getProduct)
  const total = items.reduce((s, p) => s + p.price, 0)

  const pick = useCallback((p, el) => { wear(p.id); add(p.id, midSize(p), el) }, [wear, add])
  const addLook = () => items.forEach((p, i) => setTimeout(() => add(p.id, midSize(p), addBtn.current, { silent: i < items.length - 1 }), i * 110))

  return (
    <div className="probador">
      <div className="probador__stage">
        <Mascot outfit={outfit} label={`Baretico vistiendo: ${items.map((p) => p.name).join(', ')}`} />
      </div>
      <div className="probador__panel">
        <Ropero look={look} onPick={pick} />
        <div className="probador__actions">
          <m.button ref={addBtn} className="btn btn--neon" onClick={addLook} whileTap={{ scale: 0.95 }}>Llevar el look · {formatCOP(total)}</m.button>
          <button className="btn btn--ghost" onClick={reset}>Look original</button>
        </div>
        <p className="mono muted small">Se guarda en tallas M · 32 · 40. Las cambias desde cada prenda.</p>
      </div>
    </div>
  )
}
