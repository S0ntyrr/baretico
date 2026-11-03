import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import LottiePiece from '../components/LottiePiece'

const fases = [
  { n: '01', t: 'Cimentación', d: 'Elegimos telas pesadas y honestas: felpa, dril, lona. Sin mezclas que no se puedan reparar.' },
  { n: '02', t: 'Estructura', d: 'Patrones rectos, hombro caído, costuras a la vista. La prenda muestra cómo está hecha.' },
  { n: '03', t: 'Colado', d: 'Ediciones cortas de 50 a 200 piezas, confeccionadas en talleres del barrio Restrepo.' },
  { n: '04', t: 'Entrega', d: 'Cada pieza sale "sin terminar": el uso la acaba. Reparamos gratis durante un año.' },
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
            <Reveal as="h1" i={1} className="h1">Ropa en<br />obra negra</Reveal>
            <Reveal i={2}><p className="lead">OBRA NEGRA nace en Bogotá, entre andamios y ladrillo a la vista. En una ciudad que siempre está en construcción, decidimos hacer ropa que tampoco pretende estar terminada.</p></Reveal>
          </div>
          <Reveal i={2} className="about-hero__piece">
            <LottiePiece />
            <p className="mono muted small">Pieza original · Lottie · el sello se construye</p>
          </Reveal>
        </div>
      </section>

      <section className="section fases" ref={ref} aria-labelledby="proc">
        <div className="wrap">
          <Reveal as="h2" id="proc" className="h2">El proceso</Reveal>
          <div className="timeline">
            {/* La línea crece con el scroll: indica en qué fase del proceso va la lectura */}
            <div className="timeline__rail" aria-hidden="true"><m.div className="timeline__fill" style={{ height: h }} /></div>
            {fases.map((f, i) => (
              <Reveal key={f.n} className="fase" i={0}>
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
