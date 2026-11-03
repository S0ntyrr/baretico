import { Link } from 'react-router-dom'
import Page from '../components/Page'

export default function NotFound() {
  return (
    <Page title="No encontrado">
      <section className="section section--top"><div className="wrap center">
        <p className="mono muted">Error 404</p>
        <h1 className="h1">Zona sin construir</h1>
        <p className="muted">Esta página todavía no existe.</p>
        <Link to="/" className="btn">Volver al inicio</Link>
      </div></section>
    </Page>
  )
}
