import { useId } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { garments, crops } from '../mascot/parts'

// Posiciones dentro de la canasta (de abajo hacia arriba): las prendas se apilan.
const SLOTS_POS = [[180, 150], [290, 150], [380, 146], [150, 92], [250, 88], [350, 90], [200, 34], [310, 30], [400, 36]]

function Wheel({ cx, spin }) {
  return (
    <m.g style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }} animate={spin}>
      <circle cx={cx} cy="290" r="22" fill="#151515" />
      <circle cx={cx} cy="290" r="9" fill="#9A9A96" />
      <path d={`M${cx - 18} 290 H${cx + 18} M${cx} 272 V308`} stroke="#5A5A57" strokeWidth="3" />
    </m.g>
  )
}

/**
 * Carrito de supermercado grande con las prendas reales adentro.
 * - arrive: entra rodando desde la izquierda, frena (se inclina hacia adelante: inercia) y se asienta.
 * - Luego las prendas caen una por una a la canasta (rebote = peso).
 */
export function CartSVG({ lines = [], arrive = false, reduced = false, spin, className }) {
  const clip = `bc-${useId().replace(/:/g, '')}` // id único: hay varios carritos en el DOM
  const shown = lines.slice(0, SLOTS_POS.length)
  const extra = lines.length - shown.length
  const baseDelay = arrive && !reduced ? 1.15 : 0
  return (
    <svg viewBox="0 0 480 320" className={className} role="img" aria-label={`Carrito con ${lines.length} prendas`} style={{ overflow: 'visible' }}>
      <clipPath id={clip}><path d="M96 -120 H462 L422 232 H132 Z" /></clipPath>
      {/* manija */}
      <path d="M14 34 H58 L98 70" fill="none" stroke="#151515" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="26" width="40" height="16" rx="8" fill="#6BFF2E" stroke="#151515" strokeWidth="4" />
      {/* fondo de la canasta */}
      <path d="M96 70 H462 L422 232 H132 Z" fill="#F7F7F5" stroke="#151515" strokeWidth="6" strokeLinejoin="round" />
      {/* prendas */}
      <g clipPath={`url(#${clip})`}>
        <AnimatePresence>
          {shown.map((l, i) => {
            const [x, y] = SLOTS_POS[i]
            const G = garments[l.product.slot][l.product.variant]
            const [vx, vy, vw, vh] = crops[l.product.slot].split(' ').map(Number)
            const w = 118, h = Math.min(100, (vh / vw) * w)
            return (
              <m.g key={l.key}
                initial={reduced ? { opacity: 0 } : { y: -300, rotate: (i % 2 ? 1 : -1) * 25, opacity: 1 }}
                animate={{ x: 0, y: 0, rotate: (i % 3 - 1) * 6, opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { y: -260, x: 120, rotate: 40, opacity: 0, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } }}
                transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 14, delay: baseDelay + i * 0.12 }}
                style={{ transformBox: 'fill-box', originX: '50%', originY: '100%' }}>
                <svg x={x - w / 2} y={y - h / 2 + 30} width={w} height={h} viewBox={`${vx} ${vy} ${vw} ${vh}`} overflow="visible"><G /></svg>
                {l.qty > 1 && (<g><circle cx={x + 38} cy={y + 2} r="15" fill="#6BFF2E" stroke="#151515" strokeWidth="3" />
                  <text x={x + 38} y={y + 7} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#151515">x{l.qty}</text></g>)}
              </m.g>
            )
          })}
        </AnimatePresence>
      </g>
      {/* rejilla frontal (va encima de las prendas) */}
      <g stroke="#151515" strokeWidth="3" opacity=".55">
        {[150, 196, 242, 288, 334, 380, 426].map((x, i) => <path key={x} d={`M${x} 72 L${x - 16 + i * 2} 230`} />)}
        <path d="M108 124 H448 M120 178 H436" />
      </g>
      <path d="M90 70 H468" stroke="#151515" strokeWidth="9" strokeLinecap="round" />
      {extra > 0 && <text x="440" y="56" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="18" fill="#151515">+{extra}</text>}
      {/* chasis */}
      <path d="M132 232 L142 266 H430 M142 266 L130 290 M420 266 L432 290" fill="none" stroke="#151515" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <Wheel cx={150} spin={spin} /><Wheel cx={412} spin={spin} />
    </svg>
  )
}

/** Versión que llega rodando a la página del carrito. */
export default function BigCart({ lines, reduced }) {
  if (reduced) return <div className="bigcart"><CartSVG lines={lines} reduced /></div>
  return (
    <div className="bigcart">
      <m.div className="bigcart__road" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} />
      <m.div
        initial={{ x: '-120vw', rotate: 0 }}
        animate={{ x: ['-120vw', '1.5vw', '0vw', '0vw'], rotate: [0, 0, 5, 0] }}
        transition={{ duration: 1.1, times: [0, 0.62, 0.8, 1], ease: ['easeOut', 'easeOut', 'easeInOut'], delay: 0.1 }}
        style={{ originX: '85%', originY: '95%' }}>
        <CartSVG lines={lines} arrive spin={{ rotate: [0, 900, 960, 960], transition: { duration: 1.1, times: [0, 0.62, 0.8, 1], delay: 0.1 } }} />
      </m.div>
      {/* líneas de velocidad */}
      {[0, 1, 2].map((i) => (
        <m.span key={i} className="bigcart__speed" aria-hidden="true" style={{ top: `${32 + i * 18}%` }}
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0], x: ['-40%', '0%', '10%'] }}
          transition={{ duration: 0.8, delay: 0.25 + i * 0.06 }} />
      ))}
    </div>
  )
}
