import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, MotionConfig } from 'framer-motion'
import { CartProvider, useCart } from './context/CartContext'
import { LookProvider } from './context/LookContext'
import Header from './components/Header'
import Footer from './components/Footer'
import FlyLayer from './components/FlyLayer'
import Home from './pages/Home'

// Code-splitting por ruta: el inicio carga primero, el resto bajo demanda (rendimiento).
const Catalog = lazy(() => import('./pages/Catalog'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Brand = lazy(() => import('./pages/Brand'))
const NotFound = lazy(() => import('./pages/NotFound'))
const loadFeatures = () => import('./motion/features').then((r) => r.default)

function AnimatedRoutes() {
  const location = useLocation()
  const onExitComplete = () => {
    window.scrollTo(0, 0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      <Suspense fallback={<div className="loading" aria-hidden="true" />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<Product />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/marca" element={<Brand />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function LiveRegion() {
  const { announce } = useCart()
  return <p className="sr-only" aria-live="polite" role="status">{announce}</p>
}

export default function App() {
  return (
    // reducedMotion="user": si el sistema pide reducir movimiento, Framer Motion
    // desactiva transformaciones y conserva solo opacidad/color.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <HashRouter>
          <LookProvider><CartProvider>
            <a href="#main" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Saltar al contenido</a>
            <Header />
            <AnimatedRoutes />
            <Footer />
            <FlyLayer />
            <LiveRegion />
          </CartProvider></LookProvider>
        </HashRouter>
      </LazyMotion>
    </MotionConfig>
  )
}
