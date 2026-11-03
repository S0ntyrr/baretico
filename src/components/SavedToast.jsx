import { useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'
import Thumb from '../mascot/Thumb'
import { dur, ease } from '../motion/tokens'

// Confirmación "guardado" con opción de deshacer (evita compras por toques accidentales).
export default function SavedToast() {
  const { saved, undo, dismiss } = useCart()
  useEffect(() => { if (!saved) return; const t = setTimeout(dismiss, 3200); return () => clearTimeout(t) }, [saved, dismiss])
  const p = saved && getProduct(saved.id)
  return (
    <div className="toast-wrap">
      <AnimatePresence>
        {p && (
          <m.div key={saved.t} className="toast" role="status"
            initial={{ y: -24, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1, transition: { delay: 0.7, duration: dur.short, ease: ease.colado } }}
            exit={{ y: -16, opacity: 0, transition: { duration: dur.micro } }}>
            <span className="toast__img"><Thumb slot={p.slot} variant={p.variant} /></span>
            <span className="toast__txt"><strong>✓ Guardado en el carrito</strong><span className="mono small">{p.name}</span></span>
            <button className="link mono small" onClick={undo}>Deshacer</button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
