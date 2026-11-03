import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import Thumb from '../mascot/Thumb'
import { formatCOP } from '../data/products'
import { useLook } from '../context/LookContext'
import { dur, ease } from '../motion/tokens'

export default function ProductCard({ p, level = 3, tryOn = false }) {
  const H = `h${level}`
  const { look, wear } = useLook()
  const worn = look[p.slot] === p.id
  return (
    <m.article className="card" layout initial="rest" whileHover="hover" animate="rest"
      exit={{ opacity: 0, scale: 0.94, transition: { duration: dur.short, ease: ease.demolicion } }}>
      <Link to={`/producto/${p.id}`} className="card__link">
        <div className="card__media">
          <m.div className="card__garment" variants={{ rest: { y: 0, rotate: 0, scale: 1 }, hover: { y: -8, rotate: -3, scale: 1.05 } }}
            transition={{ duration: dur.short, ease: ease.colado }}>
            <Thumb slot={p.slot} variant={p.variant} label={`${p.name}, ${p.colorName}`} />
          </m.div>
          {p.tag && <span className="card__tag mono">{p.tag}</span>}
        </div>
        <div className="card__info">
          <H className="card__name">{p.name}</H>
          <span className="mono">{formatCOP(p.price)}</span>
        </div>
        <span className="mono muted">{p.colorName}</span>
      </Link>
      {tryOn && (
        <m.button className={`card__try mono ${worn ? 'is-on' : ''}`} onClick={() => wear(p.id)} aria-pressed={worn}
          whileTap={{ scale: 0.94 }}>
          {worn ? '✓ Puesto en Baretico' : 'Probar en Baretico'}
        </m.button>
      )}
    </m.article>
  )
}
