import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, m, useAnimationControls } from 'framer-motion'
import Page from '../components/Page'
import Garment from '../components/Garment'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { getProduct, products, formatCOP } from '../data/products'
import { useCart } from '../context/CartContext'
import { dur, ease } from '../motion/tokens'
import NotFound from './NotFound'

export default function Product() {
  const { id } = useParams()
  const p = getProduct(id)
  const { add } = useCart()
  const [size, setSize] = useState(null)
  const [state, setState] = useState('idle') // idle | added
  const [err, setErr] = useState(false)
  const btn = useRef(null)
  const sizesCtl = useAnimationControls()
  if (!p) return <NotFound />

  const single = p.sizes.length === 1
  const chosen = single ? p.sizes[0] : size

  const onAdd = () => {
    if (!chosen) {
      // Feedback de error con movimiento: el selector "tiembla" y se anuncia el error.
      setErr(true)
      sizesCtl.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } })
      return
    }
    add(p.id, chosen, btn.current)
    setState('added')
    setTimeout(() => setState('idle'), 1600)
  }

  const related = products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3)

  return (
    <Page title={p.name}>
      <section className="section section--top">
        <div className="wrap pdp">
          <m.div className="pdp__media blueprint"
            initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: dur.long, ease: ease.colado, delay: 0.35 }}>
            <m.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: ease.colado, delay: 0.45 }}>
              <Garment type={p.type} color={p.color} label={`${p.name} en ${p.colorName}`} className="pdp__garment" />
            </m.div>
            <span className="mono pdp__ref">REF. {p.id.toUpperCase()}</span>
          </m.div>

          <div className="pdp__info">
            <nav className="mono muted crumbs" aria-label="Ruta"><Link to="/catalogo">Catálogo</Link> / {p.category}</nav>
            <Reveal as="h1" className="h1 pdp__title">{p.name}</Reveal>
            <Reveal i={1} className="pdp__price">{formatCOP(p.price)}</Reveal>
            <Reveal i={2}><p className="muted">{p.desc}</p></Reveal>
            <Reveal i={3}><p className="mono">Color: {p.colorName}</p></Reveal>

            <Reveal i={4}>
              <fieldset className="sizes" aria-describedby={err ? 'size-err' : undefined}>
                <legend className="mono">Talla</legend>
                <m.div className="sizes__row" animate={sizesCtl}>
                  {p.sizes.map((s) => (
                    <label key={s} className="size">
                      <input type="radio" name="size" value={s} checked={chosen === s} onChange={() => { setSize(s); setErr(false) }} />
                      {chosen === s && <m.span layoutId="size-bg" className="size__bg" transition={{ duration: dur.short, ease: ease.colado }} />}
                      <span className="size__txt">{s}</span>
                    </label>
                  ))}
                </m.div>
                <AnimatePresence>
                  {err && (
                    <m.p id="size-err" role="alert" className="error mono" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      Elige una talla antes de agregar.
                    </m.p>
                  )}
                </AnimatePresence>
              </fieldset>
            </Reveal>

            <Reveal i={5}>
              <m.button ref={btn} className={`btn btn--add ${state === 'added' ? 'btn--senal' : ''}`} onClick={onAdd}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.94 }} transition={{ duration: dur.micro }}
                aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span key={state} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: dur.micro, ease: ease.colado }}>
                    {state === 'added' ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                  </m.span>
                </AnimatePresence>
              </m.button>
            </Reveal>
            <Reveal i={6}><p className="mono muted small">Envío en Bogotá 24–48 h · Cambios 30 días · Tienda simulada</p></Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel">
          <div className="wrap">
            <Reveal as="h2" id="rel" className="h2">También en obra</Reveal>
            <div className="grid grid--3">
              {related.map((r, i) => <Reveal key={r.id} i={i}><ProductCard p={r} /></Reveal>)}
            </div>
          </div>
        </section>
      )}
    </Page>
  )
}
