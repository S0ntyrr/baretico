import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import BigCart from '../components/BigCart'
import Page from '../components/Page'
import Thumb from '../mascot/Thumb'
import Mascot from '../mascot/Mascot'
import { defaultLook, toOutfit } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatCOP } from '../data/products'
import { dur, ease } from '../motion/tokens'

// El total "cuenta" hacia su nuevo valor: comunica que cambió y cuánto.
function Counter({ value }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => formatCOP(Math.round(v)))
  useEffect(() => { const c = animate(mv, value, { duration: 0.5, ease: ease.colado }); return c.stop }, [value, mv])
  return <m.span>{text}</m.span>
}

export default function Cart() {
  const { lines, subtotal, count, dispatch } = useCart()
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()
  // Baretico se viste con lo que hay en el carrito (lo demás, look de fábrica).
  const cartLook = { ...defaultLook }
  lines.forEach((l) => { cartLook[l.product.slot] = l.id })
  const shipping = subtotal > 300000 || subtotal === 0 ? 0 : 12000

  if (done) return (
    <Page title="Pedido simulado" enter="cart">
      <section className="section section--top"><div className="wrap center">
        <m.div className="done" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: dur.base, ease: ease.carga, delay: 0.4 }}>✓</m.div>
        <h1 className="h1">Pedido listo, parce</h1>
        <p className="muted">Esto es una simulación: no se realizó ningún cobro.</p>
        <Link to="/catalogo" className="btn">Seguir viendo</Link>
      </div></section>
    </Page>
  )

  return (
    <Page title="Carrito" enter="cart">
      <section className="section section--top">
        <div className="wrap">
          <div className="cart-hero">
            <h1 className="h1">Carrito <span className="mono muted">({count})</span></h1>
            <BigCart lines={lines} reduced={reduced} />
          </div>
          {lines.length === 0 ? (
            <m.div className="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="muted">Baretico no tiene nada que ponerse todavía.</p>
              <Link to="/catalogo" className="btn btn--neon">Ir al catálogo</Link>
            </m.div>
          ) : (
            <div className="cart">
              <ul className="cart__list">
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <m.li key={l.key} className="line" layout
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 60, transition: { duration: dur.short, ease: ease.demolicion } }}
                      transition={{ duration: dur.short, ease: ease.colado }}>
                      <div className="line__img"><Thumb slot={l.product.slot} variant={l.product.variant} /></div>
                      <div className="line__info">
                        <Link to={`/producto/${l.id}`}><h2 className="h3">{l.product.name}</h2></Link>
                        <p className="mono muted">Talla {l.size} · {l.product.colorName}</p>
                        <div className="stepper" role="group" aria-label={`Cantidad de ${l.product.name}`}>
                          <m.button whileTap={{ scale: 0.85 }} onClick={() => dispatch({ type: 'qty', key: l.key, qty: l.qty - 1 })} aria-label="Restar uno" disabled={l.qty <= 1}>−</m.button>
                          <span className="stepper__val" aria-live="polite">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <m.span key={l.qty} initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: dur.micro }}>{l.qty}</m.span>
                            </AnimatePresence>
                          </span>
                          <m.button whileTap={{ scale: 0.85 }} onClick={() => dispatch({ type: 'qty', key: l.key, qty: l.qty + 1 })} aria-label="Sumar uno" disabled={l.qty >= 9}>+</m.button>
                        </div>
                      </div>
                      <div className="line__end">
                        <span className="mono">{formatCOP(l.qty * l.product.price)}</span>
                        <button className="link mono" onClick={() => dispatch({ type: 'remove', key: l.key })}>Quitar</button>
                      </div>
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
              <m.aside className="summary" layout aria-label="Resumen">
                <div className="summary__mascot"><Mascot outfit={toOutfit(cartLook)} label="Baretico vestido con tu carrito" /></div>
                <p className="mono muted small center-text">Así se ve tu carrito puesto</p>
                <div className="summary__row"><span>Subtotal</span><Counter value={subtotal} /></div>
                <div className="summary__row"><span>Envío</span><span>{shipping ? formatCOP(shipping) : 'Gratis'}</span></div>
                <div className="summary__row summary__total"><span>Total</span><Counter value={subtotal + shipping} /></div>
                <p className="mono muted small">Envío gratis desde $300.000.</p>
                <m.button className="btn btn--neon btn--block" whileTap={{ scale: 0.96 }} onClick={() => { dispatch({ type: 'clear' }); setDone(true) }}>
                  Finalizar compra (simulado)
                </m.button>
              </m.aside>
            </div>
          )}
        </div>
      </section>
    </Page>
  )
}
