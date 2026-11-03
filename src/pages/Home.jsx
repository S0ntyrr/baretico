import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Page from '../components/Page'
import Garment from '../components/Garment'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products } from '../data/products'
import { dur, ease, stagger } from '../motion/tokens'

const word = (w, offset) => w.split('').map((ch, i) => (
  <span className="hero__mask" key={i}>
    <m.span className="hero__char"
      initial={{ y: '110%' }} animate={{ y: '0%' }}
      transition={{ duration: dur.long, ease: ease.colado, delay: 0.55 + (offset + i) * stagger.tight }}>
      {ch}
    </m.span>
  </span>
))

function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Parallax: la prenda baja más lento que el texto -> profundidad, comunica capas.
  const gy = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '30%'])
  const ty = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-15%'])

  return (
    <section className="hero blueprint" ref={ref} aria-labelledby="hero-title">
      {/* 1. Jerarquía: primero se traza el plano (líneas), luego la marca, luego el mensaje y la acción */}
      <svg className="hero__lines" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        {[['M0 140 H1000', 0], ['M0 460 H1000', 0.1], ['M180 0 V600', 0.2], ['M820 0 V600', 0.3]].map(([d, dl]) => (
          <m.path key={d} d={d} stroke="#111" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: ease.firme, delay: dl }} />
        ))}
      </svg>

      <div className="wrap hero__in">
        <m.p className="mono hero__kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Colección 01 — Fase de cimentación
        </m.p>
        <m.h1 id="hero-title" className="hero__title" style={{ y: ty }} aria-label="OBRA NEGRA">
          <span className="hero__line" aria-hidden="true">{word('OBRA', 0)}</span>
          <span className="hero__line hero__line--out" aria-hidden="true">{word('NEGRA', 4)}</span>
        </m.h1>

        <m.div className="hero__garment" style={{ y: gy }}
          initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: dur.long, ease: ease.colado, delay: 0.9 }}>
          {/* Flotación en CSS (compositor) en lugar de JS: no consume hilo principal */}
          <div className="float">
            <Garment type="hoodie" color="#FF5A1F" label="Buzo Cimiento en naranja señal" />
          </div>
        </m.div>

        <m.div className="hero__foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.base, ease: ease.colado, delay: 1.25 }}>
          <p className="hero__lead">Streetwear de autor hecho en Bogotá. Prendas sin terminar, como la ciudad: estructura a la vista y nada de adornos.</p>
          <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} transition={{ duration: dur.micro }}>
            <Link to="/catalogo" className="btn btn--senal">Ver colección <span aria-hidden="true">→</span></Link>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}

function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const text = 'No terminamos las prendas. Las dejamos en obra negra: costuras expuestas, cortes rectos y colores de señalización. Lo demás lo construyes tú.'
  const words = text.split(' ')
  return (
    <section className="section manifesto" ref={ref} aria-label="Manifiesto">
      <div className="wrap">
        <p className="mono muted">Manifiesto</p>
        {/* Scroll: cada palabra "fragua" (gris 3.2:1 → negro; legible aun sin avanzar) según avanza la lectura -> el progreso de scroll ES el ritmo de lectura */}
        <p className="manifesto__text">
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>
    </section>
  )
}
function Word({ children, progress, range }) {
  const color = useTransform(progress, range, ['#86837C', '#111111'])
  return <m.span style={{ color }}>{children} </m.span>
}

export default function Home() {
  const featured = products.slice(0, 4)
  return (
    <Page>
      <Hero />
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: 'flex' }}>
              {['En construcción', '■', 'Colección 01', '■', 'Hecho en Bogotá', '■', 'Ediciones limitadas', '■'].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          ))}
        </div>
      </div>
      <section className="section" aria-labelledby="feat">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" id="feat" className="h2">Piezas<br />destacadas</Reveal>
            <Reveal i={1}><Link to="/catalogo" className="btn btn--ghost">Todo el catálogo</Link></Reveal>
          </div>
          <div className="grid">
            {featured.map((p, i) => <Reveal key={p.id} i={i}><ProductCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>
      <Manifesto />
    </Page>
  )
}
