import { Link } from 'react-router-dom'
import Page from '../components/Page'

export default function NotFound() {
  return (
    <Page title="No encontrado">
      <section className="section section--top"><div className="wrap center">
        <p className="mono muted">Error 404</p>
        <h1 className="h1">Baretico se perdió</h1>
        <p className="muted">Esta página no existe. Él tampoco sabe cómo llegó aquí.</p>
        <Link to="/" className="btn">Volver al inicio</Link>
      </div></section>
    </Page>
  )
}
