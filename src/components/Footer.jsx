import { Link } from 'react-router-dom'
import { Mark } from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div>
          <Mark size={56} />
          <p className="footer__claim">Pruébatelo en Baretico.<br />Hecho en Bogotá.</p>
        </div>
        <nav aria-label="Pie de página" className="footer__nav">
          <Link to="/catalogo">Catálogo</Link><Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link><Link to="/marca">Guía de marca</Link>
        </nav>
        <p className="mono footer__legal">© 2026 BARETICO · Proyecto académico · Tienda simulada, no se realizan cobros.</p>
      </div>
    </footer>
  )
}
