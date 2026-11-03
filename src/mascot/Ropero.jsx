import { memo, useRef, useState } from 'react'
import { m } from 'framer-motion'
import Thumb from './Thumb'
import { bySlot, formatCOP } from '../data/products'
import { dur, ease } from '../motion/tokens'

/**
 * ROPERO: simula el mueble de una tienda física.
 *  - Estante arriba (gorras y gafas), dos barras con ganchos (chaquetas, camisetas, pantalones)
 *    y el piso (tenis).
 *  - Pasar el cursor (o el foco del teclado) SELECCIONA: la prenda se balancea en su gancho
 *    como un péndulo, se adelanta y le cae la etiqueta de precio.
 *  - Tocarla la DESCUELGA: Baretico se la pone y vuela al carrito.
 */
const rows = [
  { kind: 'shelf', label: 'Estante', items: [...bySlot('gorra'), ...bySlot('gafas')] },
  { kind: 'rail', label: 'Barra superior', items: [...bySlot('chaqueta'), ...bySlot('camiseta')] },
  { kind: 'rail rail--low', label: 'Barra inferior', items: bySlot('pantalon') },
  { kind: 'floor', label: 'Piso', items: bySlot('tenis') },
]

const hangs = (kind) => kind.startsWith('rail')

function Hanger({ pants }) {
  return (
    <svg className="hanger" viewBox="0 0 100 40" aria-hidden="true">
      <path d="M50 16 V9 a6 6 0 1 1 6 -6" fill="none" stroke="#6E6E6B" strokeWidth="3" strokeLinecap="round" />
      {pants
        ? <><path d="M18 26 H82" stroke="#3A3A38" strokeWidth="4" strokeLinecap="round" /><path d="M50 16 L22 26 M50 16 L78 26" stroke="#6E6E6B" strokeWidth="2.5" /><rect x="20" y="24" width="8" height="10" fill="#3A3A38" /><rect x="72" y="24" width="8" height="10" fill="#3A3A38" /></>
        : <path d="M50 16 L8 36 H92 Z" fill="none" stroke="#3A3A38" strokeWidth="3.5" strokeLinejoin="round" />}
    </svg>
  )
}

// memo: solo se vuelven a pintar las prendas cuyo estado cambia (rendimiento en móvil).
const Item = memo(function Item({ p, kind, selected, dim, worn, onSelect, onPick }) {
  const ref = useRef(null)
  const [picked, setPicked] = useState(0)
  const hanging = hangs(kind)
  const variants = hanging
    ? { idle: { rotate: 0, y: 0, scale: 1 },
        sel: { rotate: [0, -8, 6, -3, 1.5, 0], y: 6, scale: 1.08, transition: { rotate: { duration: 1, ease: 'easeOut' }, default: { duration: dur.short, ease: ease.colado } } } }
    : { idle: { y: 0, scaleY: 1, scaleX: 1 },
        sel: { y: [0, 2, -10, -6], scaleY: [1, 0.9, 1.06, 1], scaleX: [1, 1.06, 0.97, 1], transition: { duration: 0.45 } } }

  const pick = () => {
    onPick(p, ref.current)
    setPicked(Date.now()) // la prenda se descuelga (CSS) y vuelve a aparecer: hay stock
  }

  return (
    <button ref={ref} type="button" className={`rp-item ${selected ? 'is-sel' : ''} ${dim ? 'is-dim' : ''} ${worn ? 'is-worn' : ''}`}
      onMouseEnter={() => onSelect(p.id)} onFocus={() => onSelect(p.id)} onClick={pick}
      aria-label={`${p.name}, ${formatCOP(p.price)}`}>
      <m.span className="rp-swing" variants={variants} initial={false} animate={selected ? 'sel' : 'idle'}>
        {hanging && <Hanger pants={p.slot === 'pantalon'} />}
        <span key={picked} className={`rp-garment ${picked ? 'is-picked' : ''}`}>
          <Thumb slot={p.slot} variant={p.variant} />
        </span>
        {/* etiqueta de precio: cae girando desde el gancho (solo existe en la prenda seleccionada) */}
        {selected && (
          <m.span className="rp-tag mono" aria-hidden="true" style={{ originY: 0 }}
            initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: dur.short, ease: ease.colado }}>
            {formatCOP(p.price).replace(/\s/g, '')}
          </m.span>
        )}
      </m.span>
      {worn && <span className="rp-worn" aria-hidden="true" />}
    </button>
  )
})

export default function Ropero({ look, onPick }) {
  const [sel, setSel] = useState(null)
  const selected = rows.flatMap((r) => r.items).find((p) => p.id === sel)
  return (
    <div className="ropero" onMouseLeave={() => setSel(null)}>
      <p className="sr-only">Toca una prenda para ponérsela a Baretico y guardarla en el carrito.</p>
      <div className="ropero__sign mono" aria-hidden="true">Ropero Baretico</div>
      <div className="ropero__box" role="group" aria-label="Ropero de la tienda">
        {rows.map((r) => (
          <div key={r.label} className={`rp-row rp-row--${r.kind.split(' ')[0]} ${r.kind.includes('low') ? 'rp-row--low' : ''}`} style={{ '--n': r.items.length }} aria-label={r.label} role="group">
            {hangs(r.kind) && <span className="rp-rail" aria-hidden="true" />}
            {r.items.map((p) => (
              <Item key={p.id} p={p} kind={r.kind} selected={sel === p.id} dim={!!sel && sel !== p.id}
                worn={look[p.slot] === p.id} onSelect={setSel} onPick={onPick} />
            ))}
            {!hangs(r.kind) && <span className="rp-plank" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <p className="ropero__info mono" aria-live="polite">
        {selected
          ? <><strong>{selected.name}</strong> · {formatCOP(selected.price)} · <span className="muted">toca para llevarla</span></>
          : <span className="muted">Pasa el cursor por el ropero · toca una prenda para ponérsela y guardarla</span>}
      </p>
    </div>
  )
}
