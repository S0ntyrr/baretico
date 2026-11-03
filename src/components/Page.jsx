import { m, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { dur, ease } from '../motion/tokens'

/**
 * Transición entre páginas: "colado".
 * Un panel negro sube cubriendo la página que sale (ease-in: demolición) y
 * se retira hacia arriba revelando la nueva (ease-out: colado).
 * Con reducir movimiento: solo un fundido corto.
 */
export default function Page({ title, children, className = '' }) {
  const reduced = useReducedMotion()
  useEffect(() => { document.title = title ? `${title} — OBRA NEGRA` : 'OBRA NEGRA — Prendas en construcción' }, [title])

  return (
    <m.main id="main" className={`page ${className}`} tabIndex={-1}
      initial={{ opacity: reduced ? 0 : 1 }} animate={{ opacity: 1 }}
      exit={{ opacity: reduced ? 0 : 1, transition: { duration: reduced ? 0.15 : dur.base } }}
      transition={{ duration: 0.15 }}>
      {!reduced && (<>
        <m.div className="curtain" aria-hidden="true" style={{ originY: 0 }}
          initial={{ scaleY: 1 }} animate={{ scaleY: 0, transition: { duration: dur.long, ease: ease.firme, delay: 0.05 } }}
          exit={{ scaleY: 0 }} />
        <m.div className="curtain curtain--in" aria-hidden="true" style={{ originY: 1 }}
          initial={{ scaleY: 0 }} animate={{ scaleY: 0 }}
          exit={{ scaleY: 1, transition: { duration: dur.base, ease: ease.demolicion } }} />
      </>)}
      {children}
    </m.main>
  )
}
