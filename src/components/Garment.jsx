// Ilustraciones vectoriales originales (propiedad del equipo). Ligeras (<1 KB c/u)
// en lugar de fotografías: ayudan al puntaje de Lighthouse y a la identidad "plano técnico".
const shapes = {
  tee: 'M130 70 L170 50 Q200 78 230 50 L270 70 L340 130 L302 178 L272 156 L272 440 L128 440 L128 156 L98 178 L60 130 Z',
  hoodie: 'M140 92 Q150 30 200 30 Q250 30 260 92 L300 108 L352 300 L356 380 L318 384 L300 300 L288 200 L290 440 L110 440 L112 200 L100 300 L82 384 L44 380 L48 300 L100 108 Z',
  jacket: 'M150 70 L180 56 L200 80 L220 56 L250 70 L300 96 L348 330 L350 410 L312 412 L296 330 L284 196 L286 440 L114 440 L116 196 L104 330 L88 412 L50 410 L52 330 L100 96 Z',
  pants: 'M128 50 L272 50 L296 456 L218 456 L200 170 L182 456 L104 456 Z',
  shorts: 'M120 120 L280 120 L306 330 L218 340 L200 210 L182 340 L94 330 Z',
  cap: 'M110 250 Q110 140 200 136 Q290 140 290 250 Z M96 250 L330 250 Q350 252 352 266 L352 276 L96 276 Z',
  tote: 'M96 170 L304 170 L318 440 L82 440 Z M150 170 Q150 80 200 80 Q250 80 250 170 L236 170 Q236 96 200 96 Q164 96 164 170 Z',
}

const details = {
  tee: <path d="M170 50 Q200 92 230 50" />,
  hoodie: <><path d="M160 92 Q200 140 240 92" /><path d="M150 330 L250 330 L240 390 L160 390 Z" /><path d="M186 120 L182 180 M214 120 L218 180" /></>,
  jacket: <><path d="M200 80 L200 440" /><path d="M136 300 L176 300 M224 300 L264 300" /></>,
  pants: <><path d="M128 84 L272 84" /><path d="M120 250 L160 250 L160 320 L118 320 M280 250 L240 250 L240 320 L282 320" /></>,
  shorts: <><path d="M120 150 L280 150" /><path d="M290 180 L298 300" strokeDasharray="4 8" /></>,
  cap: <path d="M200 140 L200 250 M150 150 Q140 200 146 250 M250 150 Q260 200 254 250" />,
  tote: <path d="M120 300 L280 300" strokeDasharray="10 8" />,
}

export default function Garment({ type, color, label, className }) {
  const dark = ['#111111', '#5C5A54', '#B83A0A'].includes(color)
  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label={label}>
      <path d={shapes[type]} fill={color} stroke="#111" strokeWidth="3" strokeLinejoin="round" />
      <g fill="none" stroke={dark ? '#ECEAE4' : '#111'} strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round">
        {details[type]}
      </g>
    </svg>
  )
}
