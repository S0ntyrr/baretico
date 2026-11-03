import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import Garment from './Garment'
import { formatCOP } from '../data/products'
import { dur, ease } from '../motion/tokens'

export default function ProductCard({ p, level = 3 }) {
  const H = `h${level}`
  return (
    <m.article className="card" layout initial="rest" whileHover="hover" whileFocus="hover" animate="rest"
      exit={{ opacity: 0, scale: 0.94, transition: { duration: dur.short, ease: ease.demolicion } }}>
      <Link to={`/producto/${p.id}`} className="card__link">
        <div className="card__media blueprint">
          <m.div className="card__garment" variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -10, rotate: -2 } }}
            transition={{ duration: dur.short, ease: ease.colado }}>
            <Garment type={p.type} color={p.color} label={`${p.name}, ${p.colorName}`} />
          </m.div>
          {p.tag && <span className="card__tag mono">{p.tag}</span>}
          <m.span className="card__cta mono" aria-hidden="true"
            variants={{ rest: { y: '100%' }, hover: { y: 0 } }} transition={{ duration: dur.short, ease: ease.colado }}>
            Ver pieza →
          </m.span>
        </div>
        <div className="card__info">
          <H className="card__name">{p.name}</H>
          <span className="mono">{formatCOP(p.price)}</span>
        </div>
        <span className="mono muted">{p.colorName}</span>
      </Link>
    </m.article>
  )
}
