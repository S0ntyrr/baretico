import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Mark } from './Logo'

/**
 * PIEZA ORIGINAL: animación Lottie de Baretico "alistándose"
 * (src/assets/baretico-mark.json, generada por design/build-lottie.py).
 * - El reproductor (lottie_light, solo SVG) y el JSON se cargan bajo demanda
 *   cuando la pieza entra en pantalla -> no penaliza la carga inicial.
 * - Con reducir movimiento se muestra el sello estático.
 */
export default function LottiePiece({ loop = true, size = 280, label = 'Animación de Baretico alistándose: gafas y gorra' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduced || !ref.current) return
    let anim, cancelled = false
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) { anim?.pause(); return }
      if (anim) { anim.play(); return }
      const [{ default: lottie }, { default: data }] = await Promise.all([
        import('lottie-web/build/player/lottie_light'),
        import('../assets/baretico-mark.json'),
      ])
      if (cancelled) return
      anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop, autoplay: true, animationData: data })
      setReady(true)
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => { cancelled = true; io.disconnect(); anim?.destroy() }
  }, [reduced, loop])

  return (
    <div className="lottie" style={{ width: size, height: size }} role="img" aria-label={label}>
      {(reduced || !ready) && <Mark size={size} className="lottie__static" />}
      {!reduced && <div ref={ref} className="lottie__canvas" />}
    </div>
  )
}
