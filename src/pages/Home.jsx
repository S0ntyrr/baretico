import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { m, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Probador from '../mascot/Probador'
import { products } from '../data/products'
import { dur, ease, stagger } from '../motion/tokens'

const word = (w) => w.split('').map((ch, i) => (
  <span className="hero__mask" key={i}>
    <m.span className="hero__char" initial={{ y: '110%' }} animate={{ y: '0%' }}
      transition={{ duration: dur.long, ease: ease.colado, delay: 0.45 + i * stagger.tight }}>{ch}</m.span>
  </span>
))

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__in">
        {/* Jerarquía: 1) nombre 2) personaje cae al escenario 3) controles del probador */}
        <div className="hero__copy">
          <m.p className="mono muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Streetwear parcero · Bogotá</m.p>
          <h1 id="hero-title" className="hero__title"><span className="sr-only">Baretico</span><span aria-hidden="true">{word('BARETICO')}</span></h1>
          <m.p className="hero__lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: dur.base, ease: ease.colado }}>
            Él es Baretico. Escoge una prenda y se cambia frente a ti: lo que ves puesto es lo que te llevas.
          </m.p>
        </div>
        <m.div className="hero__probador"
          initial={{ opacity: 0, y: -220 }} animate={{ opacity: 1, y: 0 }}
          transition={{ y: { type: 'spring', stiffness: 260, damping: 16, delay: 0.7 }, opacity: { duration: 0.2, delay: 0.7 } }}>
          <Probador />
        </m.div>
      </div>
    </section>
  )
}

function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = 'Gris por fuera, color por dentro. La tienda es neutra para que el único que brille sea él: el que se viste, el que salta, el parce.'.split(' ')
  return (
    <section className="section manifesto" ref={ref} aria-label="Manifiesto">
      <div className="wrap">
        <p className="mono muted">Manifiesto</p>
        <p className="manifesto__text">
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>
    </section>
  )
}
function Word({ children, progress, range }) {
  // gris 3.6:1 → tinta: legible aunque el usuario no haga scroll
  const color = useTransform(progress, range, ['#7A7A76', '#151515'])
  return <m.span style={{ color }}>{children} </m.span>
}

export default function Home() {
  const firma = products.filter((p) => p.tag === 'Firma').slice(0, 4)
  return (
    <Page>
      <Hero />
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <div key={k} style={{ display: 'flex' }}>
              {['Pruébatelo en Baretico', '✦', 'Colección 4:20', '✦', 'Hecho en Bogotá', '✦', 'Envíos a todo el país', '✦'].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          ))}
        </div>
      </div>
      <section className="section" aria-labelledby="feat">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" id="feat" className="h2">El look<br />de firma</Reveal>
            <Reveal i={1}><Link to="/catalogo" className="btn btn--ghost">Todo el catálogo</Link></Reveal>
          </div>
          <div className="grid">{firma.map((p, i) => <Reveal key={p.id} i={i}><ProductCard p={p} /></Reveal>)}</div>
        </div>
      </section>
      <Manifesto />
    </Page>
  )
}
