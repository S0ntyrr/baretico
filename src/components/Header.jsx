import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useAnimationControls } from 'framer-motion'
import CartIcon from './CartIcon'
import SavedToast from './SavedToast'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { dur, ease, stagger } from '../motion/tokens'

const links = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/marca', label: 'Marca' },
]

export default function Header() {
  const { count, iconRef, bump, lines } = useCart()
  const colors = lines.flatMap((l) => Array(Math.min(l.qty, 3)).fill(l.product.color))
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const badge = useAnimationControls()

  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    // Anticipación: el contador se comprime antes de saltar.
    if (bump) badge.start({ scale: [1, 0.7, 1.35, 1], transition: { duration: 0.45, ease: 'easeOut' } })
  }, [bump, badge])

  return (
    <header className="header">
      <div className="wrap header__in">
        <Link to="/" className="header__logo" aria-label="Baretico, inicio"><Logo /></Link>
        <nav className="header__nav" aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="navlink">
              {({ isActive }) => (<>
                {l.label}
                {isActive && <m.span layoutId="nav-underline" className="navlink__bar" transition={{ duration: dur.short, ease: ease.colado }} />}
              </>)}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Link to="/carrito" className="cartbtn" ref={iconRef} aria-label={`Carrito, ${count} artículos`}>
            <CartIcon colors={colors} bump={bump} />
            <m.span className="cartbtn__count" animate={badge}>{count}</m.span>
          </Link>
          <button className="burger" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
            <m.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
            <m.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </div>
      <SavedToast />
      <AnimatePresence>
        {open && (
          <m.nav id="mobile-nav" className="mnav" aria-label="Menú móvil"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: dur.short, ease: ease.demolicion } }}
            transition={{ duration: dur.base, ease: ease.colado }}>
            {[{ to: '/', label: 'Inicio' }, ...links, { to: '/carrito', label: 'Carrito' }].map((l, i) => (
              <m.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * stagger.base, duration: dur.base, ease: ease.colado }}>
                <NavLink to={l.to} end>{l.label}</NavLink>
              </m.div>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
