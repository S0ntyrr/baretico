import Page from '../components/Page'
import Reveal from '../components/Reveal'
import LottiePiece from '../components/LottiePiece'
import Mascot from '../mascot/Mascot'
import { Mark } from '../components/Logo'
import { dur, ease } from '../motion/tokens'

const tienda = [
  { n: 'Tinta', hex: '#151515', fg: '#F7F7F5', use: 'Texto, bordes, botones', c: '14.6:1 sobre Niebla' },
  { n: 'Niebla', hex: '#E6E6E3', fg: '#151515', use: 'Fondo principal', c: '14.6:1 con Tinta' },
  { n: 'Concreto', hex: '#D6D6D2', fg: '#151515', use: 'Superficies, tarjetas', c: '12.5:1 con Tinta' },
  { n: 'Asfalto', hex: '#5A5A57', fg: '#F7F7F5', use: 'Texto secundario', c: '5.5:1 sobre Niebla' },
  { n: 'Clorofila', hex: '#6BFF2E', fg: '#151515', use: 'Único acento: CTA y foco. Siempre con Tinta', c: '13.9:1 con Tinta' },
]
const personaje = [
  ['Rizo chocolate', '#4A2C20'], ['Hocico', '#6A4331'], ['Camuflado', '#5E7F2F'],
  ['Bandera · amarillo', '#FFD21F'], ['Bandera · azul', '#1F4FBF'], ['Bandera · rojo', '#D7262E'],
]
const fmt = (a) => `cubic-bezier(${a.join(', ')})`
const firma = { gorra: 'camo', gafas: 'neon', chaqueta: 'tricolor', camiseta: '420', pantalon: 'cargo', tenis: 'selva' }

export default function Brand() {
  return (
    <Page title="Guía de marca" className="brand">
      <section className="section section--top">
        <div className="wrap">
          <Reveal as="p" className="mono muted">Guía de marca · v2.0 · una página</Reveal>
          <Reveal as="h1" i={1} className="h1">BARETICO</Reveal>
          <Reveal i={2}><p className="lead">Streetwear parcero de Bogotá. <strong>La identidad es el personaje</strong>: la tienda es gris y silenciosa para que el color, el humor y el movimiento vengan solo de él.</p></Reveal>

          <div className="bg-grid">
            <Reveal className="bg-cell bg-cell--char">
              <h2 className="h3">01 · Personaje</h2>
              <Mascot outfit={firma} size="min(260px, 70%)" label="Baretico con el look de firma" />
              <p className="muted small">Perro de rizos chocolate, cabeza grande (1/3 del cuerpo), gafas redondas verde clorofila siempre puestas. Look de firma: gorra 4:20 camo, chaqueta tricolor, camiseta 420, cargo oliva y tenis selva. Nunca se dibuja con logos de otras marcas.</p>
            </Reveal>
            <Reveal className="bg-cell" i={1}>
              <h2 className="h3">02 · Logo y sello animado</h2>
              <div className="logo-demo"><Mark size={96} /><span className="logo-demo__word">BARETICO</span></div>
              <LottiePiece size={150} />
              <p className="muted small">Sello = cabeza con gafas y gorra. Mínimo 24 px. El Lottie (pieza original) lo arma: cabeza con rebote → gafas → gorra con anticipación y aplastamiento → orejas que siguen moviéndose.</p>
            </Reveal>
          </div>

          <Reveal as="h2" className="h3 bg-title">03 · Paleta de la tienda (grises)</Reveal>
          <div className="swatches">
            {tienda.map((p, i) => (
              <Reveal key={p.hex} i={i} className="swatch" style={{ background: p.hex, color: p.fg }}>
                <strong>{p.n}</strong><span className="mono">{p.hex}</span><span className="small">{p.use}</span><span className="mono small">{p.c}</span>
              </Reveal>
            ))}
          </div>
          <Reveal as="h2" className="h3 bg-title">04 · Colores del personaje (solo en él)</Reveal>
          <div className="swatches swatches--sm">
            {personaje.map(([n, hex], i) => (
              <Reveal key={hex} i={i} className="swatch swatch--sm"><span className="swatch__dot" style={{ background: hex }} /><strong>{n}</strong><span className="mono small">{hex}</span></Reveal>
            ))}
          </div>

          <div className="bg-grid">
            <Reveal className="bg-cell">
              <h2 className="h3">05 · Tipografía</h2>
              <p className="type-a">Archivo Condensed 900</p>
              <p>Archivo variable (peso y ancho) para títulos condensados y texto. SIL OFL.</p>
              <p className="mono">IBM Plex Mono — etiquetas, precios, datos. SIL OFL.</p>
            </Reveal>
            <Reveal className="bg-cell" i={1}>
              <h2 className="h3">06 · Tono</h2>
              <ul className="tone">
                <li><strong>Parcero:</strong> cercano y bogotano. “Pruébatelo en Baretico.”</li>
                <li><strong>Con humor:</strong> Baretico tiene personalidad; la tienda habla de él en tercera persona.</li>
                <li><strong>Corto:</strong> frases de una línea, sin tecnicismos.</li>
                <li><strong>Nunca:</strong> superlativos falsos, urgencias, ni mensajes que inviten al consumo; 4:20 es estética, no consigna.</li>
              </ul>
            </Reveal>
          </div>

          <Reveal as="h2" className="h3 bg-title">07 · Movimiento</Reveal>
          <div className="motion-tokens">
            {[['Entrada', ease.colado, 'Rápido al inicio, asienta suave.'], ['Salida', ease.demolicion, 'Acelera y se va.'],
              ['Rebote', ease.carga, 'Anticipación + overshoot: confirmaciones.'], ['Panel', ease.firme, 'Telón entre páginas.']].map(([n, e, d], i) => (
              <Reveal key={n} i={i} className="mt"><strong>{n}</strong><code className="mono small">{fmt(e)}</code><span className="small muted">{d}</span></Reveal>
            ))}
          </div>
          <p className="mono muted small">Cambio de ropa: anticipación (se agacha 140 ms) → salto (300 ms, ease-out) → nube y cambio en el punto alto → caída (220 ms, ease-in) → aterrizaje con squash y resorte → sonríe. Duraciones: micro {dur.micro}s · corta {dur.short}s · base {dur.base}s · larga {dur.long}s.</p>
        </div>
      </section>
    </Page>
  )
}
