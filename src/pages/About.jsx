import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import LottiePiece from '../components/LottiePiece'
import Mascot from '../mascot/Mascot'

const fases = [
  { n: '01', t: 'El personaje', d: 'Todo empezó con un dibujo: un perro crespo, con gafas verdes, gorra camuflada y la chaqueta tricolor. Antes de la ropa existió él.' },
  { n: '02', t: 'La ropa', d: 'Cada prenda se diseña primero sobre Baretico. Si no le luce a él, no sale a la venta.' },
  { n: '03', t: 'La confección', d: 'Ediciones cortas, confeccionadas en talleres de Bogotá. Sin logos prestados: todo es diseño propio.' },
  { n: '04', t: 'El probador', d: 'En la tienda no ves maniquíes: ves a Baretico cambiarse. Lo que él tiene puesto es exactamente lo que te llevas.' },
]
const looks = [
  { gorra: 'negra', gafas: 'negras', chaqueta: 'negra', camiseta: 'blanca', pantalon: 'jogger', tenis: 'carbon' },
  { gorra: 'camo', gafas: 'neon', chaqueta: 'tricolor', camiseta: '420', pantalon: 'cargo', tenis: 'selva' },
  { gorra: 'gris', gafas: 'rosa', chaqueta: 'asfalto', camiseta: 'monte', pantalon: 'jean', tenis: 'nube' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Page title="Nosotros">
      <section className="section section--top">
        <div className="wrap about-hero">
          <div>
            <Reveal as="p" className="mono muted">Nosotros</Reveal>
            <Reveal as="h1" i={1} className="h1">Él es<br />la marca</Reveal>
            <Reveal i={2}><p className="lead">BARETICO es un perro de rizos chocolate que se viste mejor que nosotros. Nació en Bogotá como personaje y terminó siendo una tienda: la identidad no está en un logo, está en él.</p></Reveal>
          </div>
          <Reveal i={2} className="about-hero__piece">
            <LottiePiece />
            <p className="mono muted small">Pieza original · Lottie · Baretico se alista</p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="looks">
        <div className="wrap">
          <Reveal as="h2" id="looks" className="h2">Tres días,<br />tres looks</Reveal>
          <div className="looks">
            {looks.map((l, i) => (
              <Reveal key={i} i={i} className="looks__item">
                <Mascot outfit={l} label={`Baretico, look ${['noche', 'de firma', 'neblina'][i]}`} />
                <p className="mono">{['Look noche', 'Look de firma', 'Look neblina'][i]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section fases" ref={ref} aria-labelledby="proc">
        <div className="wrap">
          <Reveal as="h2" id="proc" className="h2">Cómo trabajamos</Reveal>
          <div className="timeline">
            <div className="timeline__rail" aria-hidden="true"><m.div className="timeline__fill" style={{ height: h }} /></div>
            {fases.map((f) => (
              <Reveal key={f.n} className="fase">
                <span className="fase__n mono">{f.n}</span>
                <h3 className="h3">{f.t}</h3>
                <p className="muted">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
