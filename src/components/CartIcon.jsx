import { useEffect } from 'react'
import { AnimatePresence, m, useAnimationControls } from 'framer-motion'

/**
 * Carrito de compras del header. Cuando algo cae dentro:
 * ANTICIPACIÓN (la canasta se hunde con el peso) → rebote → rueda un poco hacia adelante y vuelve.
 * Las últimas prendas se ven asomando en la canasta.
 */
export default function CartIcon({ colors = [], bump }) {
  const cart = useAnimationControls()
  const wheels = useAnimationControls()
  useEffect(() => {
    if (!bump) return
    cart.start({ y: [0, 3, -3, 0], x: [0, 0, 4, 0], rotate: [0, 4, -3, 0], transition: { duration: 0.55, times: [0, 0.25, 0.6, 1] } })
    wheels.start({ rotate: [0, 0, 180, 0], transition: { duration: 0.55 } })
  }, [bump, cart, wheels])
  const shown = colors.slice(-3)
  return (
    <m.svg viewBox="0 0 40 34" width="34" height="29" aria-hidden="true" animate={cart} style={{ overflow: 'visible', originX: '60%', originY: '90%' }}>
      <AnimatePresence>
        {shown.map((c, i) => (
          <m.rect key={`${c}-${i}-${colors.length}`} x={12 + i * 6.5} y="4" width="7" height="9" rx="1.5" fill={c} stroke="#151515" strokeWidth="1.5"
            initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 16 }} />
        ))}
      </AnimatePresence>
      <path d="M2 4 H8 L11 9 M11 9 H37 L33 22 H14 Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M16 9 L17 22 M22 9 V22 M28 9 L27 22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 22 L13 26 H34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
      {[16, 31].map((cx) => (
        <m.g key={cx} animate={wheels} style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }}>
          <circle cx={cx} cy="30.5" r="2.8" fill="currentColor" /><rect x={cx - 0.6} y="28" width="1.2" height="2.5" fill="#E6E6E3" />
        </m.g>
      ))}
    </m.svg>
  )
}
