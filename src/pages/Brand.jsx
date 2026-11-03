import Page from '../components/Page'
import Reveal from '../components/Reveal'
import LottiePiece from '../components/LottiePiece'
import { Mark } from '../components/Logo'
import { dur, ease } from '../motion/tokens'

const palette = [
  { n: 'Negro obra', hex: '#111111', fg: '#ECEAE4', use: 'Texto, estructura, botones primarios', c: '15.7:1 sobre Cal' },
  { n: 'Cal', hex: '#ECEAE4', fg: '#111111', use: 'Fondo principal', c: '15.7:1 con Negro' },
  { n: 'Cemento', hex: '#D9D6CE', fg: '#111111', use: 'Superficies, retícula de plano', c: '13:1 con Negro' },
  { n: 'Gris varilla', hex: '#5C5A54', fg: '#ECEAE4', use: 'Texto secundario', c: '5.7:1 sobre Cal' },
  { n: 'Naranja señal', hex: '#FF5A1F', fg: '#111111', use: 'Acento, CTA, foco. Siempre con texto negro', c: '6.1:1 con Negro' },
  { n: 'Óxido', hex: '#B83A0A', fg: '#ECEAE4', use: 'Acento como texto, errores', c: '4.8:1 sobre Cal' },
]

const fmt = (a) => `cubic-bezier(${a.join(', ')})`

export default function Brand() {
  return (
    <Page title="Guía de marca" className="brand">
      <section className="section section--top">
        <div className="wrap">
          <Reveal as="p" className="mono muted">Guía de marca · v1.0 · una página</Reveal>
          <Reveal as="h1" i={1} className="h1">OBRA / NEGRA</Reveal>
          <Reveal i={2}><p className="lead">Streetwear minimalista de autor. Concepto: la ciudad en construcción. La “obra negra” es la etapa en la que una edificación tiene estructura pero no acabados — honesta, cruda, en proceso.</p></Reveal>

          <div className="bg-grid">
            <Reveal className="bg-cell">
              <h2 className="h3">01 · Logo</h2>
              <div className="logo-demo"><Mark size={120} /><span className="logo-demo__word">OBRA/NEGRA</span></div>
              <p className="muted small">Sello = formaleta (marco) + colado (naranja) + varilla (barra). Área de respeto: el grosor del marco. Mínimo 24 px. Nunca rotar ni cambiar el naranja.</p>
            </Reveal>
            <Reveal className="bg-cell" i={1}>
              <h2 className="h3">02 · Sello animado</h2>
              <LottiePiece size={160} />
              <p className="muted small">Pieza original Lottie: se traza el marco, entra el colado con anticipación y rebote, cae la varilla.</p>
            </Reveal>
          </div>

          <Reveal as="h2" className="h3 bg-title">03 · Paleta</Reveal>
          <div className="swatches">
            {palette.map((p, i) => (
              <Reveal key={p.hex} i={i} className="swatch" style={{ background: p.hex, color: p.fg }}>
                <strong>{p.n}</strong>
                <span className="mono">{p.hex}</span>
                <span className="small">{p.use}</span>
                <span className="mono small">{p.c}</span>
              </Reveal>
            ))}
          </div>

          <div className="bg-grid">
            <Reveal className="bg-cell">
              <h2 className="h3">04 · Tipografía</h2>
              <p className="type-a">Archivo Condensed 850</p>
              <p>Archivo (variable, ejes peso y ancho) para títulos condensados y texto. Licencia SIL OFL.</p>
              <p className="mono">IBM Plex Mono — etiquetas, precios, datos técnicos. SIL OFL.</p>
            </Reveal>
            <Reveal className="bg-cell" i={1}>
              <h2 className="h3">05 · Tono</h2>
              <ul className="tone">
                <li><strong>Directo:</strong> frases cortas, sin adornos. “Hecho para subir y bajar.”</li>
                <li><strong>Técnico:</strong> vocabulario de obra — cimiento, formaleta, colado.</li>
                <li><strong>Bogotano, no turístico:</strong> barrio, taller, calle.</li>
                <li><strong>Nunca:</strong> superlativos (“el mejor”), urgencias falsas, emojis.</li>
              </ul>
            </Reveal>
          </div>

          <Reveal as="h2" className="h3 bg-title">06 · Movimiento</Reveal>
          <div className="motion-tokens">
            {[
              ['Colado', ease.colado, 'Entradas: rápido al inicio, asienta suave.'],
              ['Demolición', ease.demolicion, 'Salidas: acelera y se va.'],
              ['Carga', ease.carga, 'Anticipación: retrocede antes de avanzar. Solo confirmaciones.'],
              ['Firme', ease.firme, 'Paneles y transiciones de página.'],
            ].map(([n, e, d], i) => (
              <Reveal key={n} i={i} className="mt">
                <strong>{n}</strong>
                <code className="mono small">{fmt(e)}</code>
                <span className="small muted">{d}</span>
              </Reveal>
            ))}
          </div>
          <p className="mono muted small">Duraciones: micro {dur.micro}s · corta {dur.short}s · base {dur.base}s · larga {dur.long}s. Con “reducir movimiento” solo quedan fundidos.</p>
        </div>
      </section>
    </Page>
  )
}
