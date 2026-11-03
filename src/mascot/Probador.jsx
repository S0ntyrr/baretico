import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import Mascot from './Mascot'
import Thumb from './Thumb'
import { useLook } from '../context/LookContext'
import { useCart } from '../context/CartContext'
import { slots, bySlot, getProduct, formatCOP } from '../data/products'
import { dur, ease } from '../motion/tokens'

const midSize = (p) => p.sizes[Math.floor((p.sizes.length - 1) / 2)]

/**
 * Probador: eliges prenda → Baretico se cambia con animación.
 * El movimiento confirma la elección mejor que cualquier texto.
 */
export default function Probador({ initialSlot = 'gorra', compact = false }) {
  const { look, outfit, wear, reset } = useLook()
  const { add } = useCart()
  const [slot, setSlot] = useState(initialSlot)
  const addBtn = useRef(null)
  const current = getProduct(look[slot])
  const items = Object.values(look).map(getProduct)
  const total = items.reduce((s, p) => s + p.price, 0)

  const addLook = () => items.forEach((p, i) => setTimeout(() => add(p.id, midSize(p), addBtn.current), i * 90))

  return (
    <div className={`probador ${compact ? 'probador--compact' : ''}`}>
      <div className="probador__stage">
        <Mascot outfit={outfit} label={`Baretico vistiendo: ${items.map((p) => p.name).join(', ')}`} />
      </div>

      <div className="probador__panel">
        <div className="probador__tabs" role="group" aria-label="Elige qué prenda cambiar">
          {slots.map((s) => (
            <button key={s.id} className="ptab mono" aria-pressed={slot === s.id} onClick={() => setSlot(s.id)}>
              {slot === s.id && <m.span layoutId={`ptab-${compact ? 'c' : 'f'}`} className="ptab__bg" transition={{ duration: dur.short, ease: ease.colado }} />}
              <span className="ptab__label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="probador__opts" role="group" aria-label={`Opciones de ${slot}`}>
          {bySlot(slot).map((p) => {
            const on = look[slot] === p.id
            return (
              <m.button key={p.id} className="popt" aria-pressed={on} onClick={() => wear(p.id)}
                whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} transition={{ duration: dur.micro }}>
                <Thumb slot={p.slot} variant={p.variant} className="popt__img" />
                <span className="popt__name">{p.name}</span>
                {on && <m.span layoutId={`popt-${compact ? 'c' : 'f'}`} className="popt__ring" transition={{ duration: dur.short, ease: ease.colado }} />}
              </m.button>
            )
          })}
        </div>

        <div className="probador__info">
          <p className="mono muted">Puesto: <Link to={`/producto/${current.id}`}>{current.name}</Link> · {formatCOP(current.price)}</p>
          {!compact && (
            <div className="probador__actions">
              <m.button ref={addBtn} className="btn btn--neon" onClick={addLook} whileTap={{ scale: 0.95 }}>
                Llevar el look · {formatCOP(total)}
              </m.button>
              <button className="btn btn--ghost" onClick={reset}>Look original</button>
            </div>
          )}
          {!compact && <p className="mono muted small">Se agrega en tallas M · 32 · 40. Las cambias desde cada prenda.</p>}
        </div>
      </div>
    </div>
  )
}
