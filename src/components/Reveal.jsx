import { m } from 'framer-motion'
import { reveal } from '../motion/tokens'

// Animación al hacer scroll: entra una vez cuando el 25% es visible.
export default function Reveal({ as = 'div', i = 0, children, ...rest }) {
  const C = m[as]
  return (
    <C variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} custom={i} {...rest}>
      {children}
    </C>
  )
}
