import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useAnimationControls, useReducedMotion } from 'framer-motion'
import { Defs, Shadow, Paws, Ears, Head, Chain, garments, puffAt } from './parts'

export const SLOTS = ['tenis', 'pantalon', 'camiseta', 'chaqueta', 'gafas', 'gorra'] // orden de apilado (atrás → adelante)

/* Cómo entra y sale cada prenda: la dirección comunica DE DÓNDE viene la pieza. */
const swap = {
  gorra: { initial: { y: -150, rotate: -18, opacity: 0 }, animate: { y: 0, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 14 } }, exit: { y: -120, x: 90, rotate: 30, opacity: 0, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } } },
  gafas: { initial: { y: -40, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 18 } }, exit: { y: 26, opacity: 0, transition: { duration: 0.18 } } },
  chaqueta: { initial: { scaleX: 0.4, opacity: 0 }, animate: { scaleX: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 16 } }, exit: { scaleX: 1.25, opacity: 0, transition: { duration: 0.2 } } },
  camiseta: { initial: { scaleY: 0.5, opacity: 0 }, animate: { scaleY: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 18 } }, exit: { opacity: 0, transition: { duration: 0.15 } } },
  pantalon: { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 18 } }, exit: { y: 30, opacity: 0, transition: { duration: 0.18 } } },
  tenis: { initial: { y: -36, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 600, damping: 16 } }, exit: { scale: 0.6, opacity: 0, transition: { duration: 0.15 } } },
}
const fade = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.15 } } }

function Layer({ slot, variant, reduced }) {
  const G = garments[slot][variant]
  const t = reduced ? fade : swap[slot]
  return (
    <AnimatePresence initial={false}>
      <m.g key={variant} initial={t.initial} animate={t.animate} exit={t.exit} style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }}>
        <G />
      </m.g>
    </AnimatePresence>
  )
}

/* Nube de "cambio de ropa": tapa el instante del cambio, como en un truco de magia. */
function Puff({ at }) {
  const [cx, cy] = at
  const bits = [[-34, -6, 26], [0, -22, 32], [34, -4, 26], [-18, 18, 22], [20, 18, 24], [0, 4, 30]]
  return (
    <g aria-hidden="true">
      {bits.map(([dx, dy, r], i) => (
        <m.circle key={i} cx={cx + dx} cy={cy + dy} r={r} fill="#F4F4F1" stroke="#151515" strokeWidth="3"
          initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0, 1.15, 1.3], opacity: [1, 1, 0] }}
          transition={{ duration: 0.55, times: [0, 0.4, 1], delay: i * 0.02, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }} />
      ))}
      {[[-60, -40], [64, -30], [-50, 40], [58, 44]].map(([dx, dy], i) => (
        <m.path key={`s${i}`} d={`M${cx + dx} ${cy + dy} l6 -14 l6 14 l-6 14z`} fill="#6BFF2E" stroke="#151515" strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.6, delay: 0.12 + i * 0.04 }}
          style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }} />
      ))}
    </g>
  )
}

/**
 * <Mascot outfit={{ gorra:'camo', gafas:'neon', ... }} />
 * Cuando cambia una prenda: ANTICIPACIÓN (se agacha) → SALTO (estira) → nube +
 * cambio en el punto más alto → CAÍDA (acelera) → ATERRIZAJE (aplasta y rebota) → sonríe.
 */
export default function Mascot({ outfit, className = '', label = 'Baretico, el perro mascota', size }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(outfit)
  const [puff, setPuff] = useState(null)
  const [happy, setHappy] = useState(false)
  const body = useAnimationControls()
  const shadow = useAnimationControls()
  const busy = useRef(false)
  const target = useRef(outfit)
  const shownRef = useRef(outfit)
  target.current = outfit

  useEffect(() => {
    const changed = (a, b) => SLOTS.filter((s) => a[s] !== b[s])
    async function run() {
      if (busy.current) return
      busy.current = true
      while (changed(shownRef.current, target.current).length) {
        const next = target.current
        const diff = changed(shownRef.current, next)
        if (reduced) { shownRef.current = next; setShown(next); break }
        // 1. Anticipación
        shadow.start({ scaleX: 1.1, transition: { duration: 0.14 } })
        await body.start({ scaleY: 0.86, scaleX: 1.08, y: 0, transition: { duration: 0.14, ease: 'easeOut' } })
        // 2. Salto (ease-out: sale disparado y frena arriba)
        shadow.start({ scaleX: 0.55, opacity: 0.5, transition: { duration: 0.28, ease: 'easeOut' } })
        const up = body.start({ y: -64, scaleY: 1.06, scaleX: 0.95, rotate: diff.length > 2 ? 360 : 0, transition: { duration: 0.3, ease: [0.2, 0.9, 0.3, 1] } })
        setTimeout(() => { setPuff({ id: Date.now(), at: puffAt[diff[diff.length - 1]] }); shownRef.current = next; setShown(next) }, 150)
        await up
        // 3. Caída (ease-in: la gravedad acelera)
        shadow.start({ scaleX: 1, opacity: 1, transition: { duration: 0.22, ease: 'easeIn' } })
        await body.start({ y: 0, scaleY: 1.04, scaleX: 0.97, transition: { duration: 0.22, ease: [0.6, 0, 0.9, 0.5] } })
        // 4. Aterrizaje: aplastar y estirar, luego asentarse con resorte
        await body.start({ scaleY: 0.9, scaleX: 1.07, transition: { duration: 0.07 } })
        body.set({ rotate: 0 })
        setHappy(true); setTimeout(() => setHappy(false), 900)
        await body.start({ scaleY: 1, scaleX: 1, transition: { type: 'spring', stiffness: 520, damping: 14 } })
      }
      busy.current = false
    }
    run()
  }, [outfit, reduced, body, shadow])

  return (
    <div className={`mascot ${className}`} style={size ? { width: size } : undefined}>
      <div className="mascot__idle"><svg viewBox="0 0 400 600" role="img" aria-label={label}>
        <Defs />
        <m.g animate={shadow} style={{ transformBox: 'fill-box', originX: '50%', originY: '50%' }}><Shadow /></m.g>
        <m.g animate={body} style={{ transformBox: 'view-box', originX: '50%', originY: '97%' }}>
          <g className="bz-idle">
            <Layer slot="pantalon" variant={shown.pantalon} reduced={reduced} />
            <Layer slot="tenis" variant={shown.tenis} reduced={reduced} />
            <Layer slot="camiseta" variant={shown.camiseta} reduced={reduced} />
            <Chain />
            <Layer slot="chaqueta" variant={shown.chaqueta} reduced={reduced} />
            <Paws />
            <g className="bz-head">
              <Ears />
              <Head happy={happy} />
              <Layer slot="gafas" variant={shown.gafas} reduced={reduced} />
              <Layer slot="gorra" variant={shown.gorra} reduced={reduced} />
            </g>
          </g>
        </m.g>
        <AnimatePresence>{puff && <Puff key={puff.id} at={puff.at} />}</AnimatePresence>
      </svg></div>
    </div>
  )
}
