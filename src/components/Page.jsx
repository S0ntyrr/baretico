import { m, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { CartSVG } from './BigCart'
import { dur, ease } from '../motion/tokens'

/**
 * Transiciones entre páginas.
 *  - Normal ("telón"): panel negro sube cubriendo (ease-in) y se retira revelando (ease-out).
 *  - Hacia el CARRITO ("carrito empuja"): un carrito grande entra rodando y arrastra
 *    la pantalla negra; la página del carrito se destapa hacia la derecha.
 *  AnimatePresence pasa la ruta de destino como `custom` para elegir la salida.
 *  Con reducir movimiento: solo un fundido corto.
 */
const isCart = (to) => to === '/carrito'

export default function Page({ title, children, className = '', enter = 'curtain' }) {
  const reduced = useReducedMotion()
  useEffect(() => { document.title = title ? `${title} — BARETICO` : 'BARETICO — Streetwear parcero' }, [title])

  return (
    <m.main id="main" className={`page ${className}`} tabIndex={-1}
      initial={{ opacity: reduced ? 0 : 1 }} animate="in" exit="out"
      variants={{ in: { opacity: 1, transition: { duration: 0.15 } },
        out: (to) => ({ opacity: reduced ? 0 : 1, transition: { duration: reduced ? 0.15 : isCart(to) ? 0.8 : dur.base } }) }}>
      {!reduced && (<>
        {enter === 'cart' ? (
          <m.div className="curtain" aria-hidden="true" initial={{ x: '0%' }} animate={{ x: '101%', transition: { duration: 0.6, ease: ease.firme, delay: 0.05 } }} />
        ) : (
          <m.div className="curtain" aria-hidden="true" style={{ originY: 0 }}
            initial={{ scaleY: 1 }} animate={{ scaleY: 0, transition: { duration: dur.long, ease: ease.firme, delay: 0.05 } }} />
        )}
        {/* salida normal */}
        <m.div className="curtain" aria-hidden="true" style={{ originY: 1 }} initial="idle" animate="idle" exit="exit"
          variants={{ idle: { scaleY: 0 }, exit: (to) => (isCart(to) ? { scaleY: 0, transition: { duration: 0 } } : { scaleY: 1, transition: { duration: dur.base, ease: ease.demolicion } }) }} />
        {/* salida hacia el carrito */}
        <m.div className="cartrush" aria-hidden="true" initial="idle" animate="idle" exit="exit"
          variants={{ idle: { x: '-101%', visibility: 'hidden' }, exit: (to) => (isCart(to) ? { x: '0%', visibility: 'visible', transition: { duration: 0.75, ease: [0.5, 0, 0.75, 0.3] } } : { x: '-101%', visibility: 'hidden', transition: { duration: 0 } }) }}>
          <div className="cartrush__cart">
            <CartSVG spin={{ rotate: 720, transition: { duration: 0.75, ease: 'easeIn' } }} />
          </div>
        </m.div>
      </>)}
      {children}
    </m.main>
  )
}
