// Las funciones de animación de Framer Motion se cargan después del primer render
// (LazyMotion async) para reducir el Total Blocking Time en móvil.
import { domMax } from 'framer-motion'
export default domMax
