/**
 * BARETICO — personaje vectorial por capas (dibujo original del equipo, basado en
 * la hoja de personaje del autor). Sistema de coordenadas común: viewBox 0 0 400 600.
 * Cada prenda es una capa independiente para poder cambiarla con animación.
 */

// Anillo de "rizos" alrededor de una elipse -> silueta peluda.
const fluff = (cx, cy, rx, ry, n, r, start = 0, end = Math.PI * 2) =>
  Array.from({ length: n }, (_, i) => {
    const a = start + ((end - start) * i) / (n - (end - start >= Math.PI * 2 ? 0 : 1))
    return [+(cx + Math.cos(a) * rx).toFixed(1), +(cy + Math.sin(a) * ry).toFixed(1), r * (0.85 + ((i * 7) % 5) * 0.06)]
  })

const HEAD = fluff(200, 168, 88, 80, 24, 17)
const EAR_L = fluff(112, 232, 28, 70, 14, 12)
const EAR_R = fluff(288, 232, 28, 70, 14, 12)
const BEARD = fluff(200, 226, 40, 26, 10, 11, 0.2, Math.PI - 0.2)
const PAW_L = fluff(84, 444, 14, 14, 8, 10)
const PAW_R = fluff(316, 444, 14, 14, 8, 10)

const Fluffy = ({ pts, fill = 'url(#bz-curl)' }) => pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={fill} />)

// Hoja (7 foliolos) dibujada con elipses rotadas.
export function Leaf({ x, y, s = 1, fill = '#6BFF2E' }) {
  const angles = [-75, -45, -20, 0, 20, 45, 75]
  const len = [0.55, 0.8, 0.95, 1, 0.95, 0.8, 0.55]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      {angles.map((a, i) => <ellipse key={a} cx="0" cy={-11 * len[i]} rx="2.6" ry={11 * len[i]} transform={`rotate(${a})`} />)}
      <rect x="-0.8" y="0" width="1.6" height="7" />
    </g>
  )
}

export function Defs() {
  return (
    <defs>
      <pattern id="bz-curl" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="#4A2C20" />
        <circle cx="4" cy="4" r="3" fill="none" stroke="#6B4331" strokeWidth="1.6" />
        <circle cx="11" cy="10" r="3" fill="none" stroke="#2F1A11" strokeWidth="1.6" />
        <circle cx="11" cy="3" r="1.4" fill="#5C392A" />
      </pattern>
      <pattern id="bz-curl-l" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#5A372A" />
        <circle cx="4" cy="4" r="2.6" fill="none" stroke="#7A4F3B" strokeWidth="1.4" />
        <circle cx="9" cy="9" r="2.4" fill="none" stroke="#3D2318" strokeWidth="1.4" />
      </pattern>
      <pattern id="bz-camo" width="64" height="64" patternUnits="userSpaceOnUse">
        <rect width="64" height="64" fill="#5E7F2F" />
        <path d="M0 10 Q14 0 26 8 Q30 22 14 22 Q2 24 0 10Z M36 30 Q52 22 62 34 Q58 48 44 44 Q32 42 36 30Z" fill="#2F4A19" />
        <path d="M30 2 Q42 0 44 10 Q38 16 30 12Z M4 40 Q16 34 22 44 Q18 58 6 54Z M48 54 Q58 52 62 62 L44 64Z" fill="#9BC34A" />
        <path d="M20 28 Q28 26 30 34 Q24 38 18 34Z" fill="#1E2C10" />
      </pattern>
      <linearGradient id="bz-flag" x1="0" y1="252" x2="0" y2="438" gradientUnits="userSpaceOnUse">
        <stop offset="0.5" stopColor="#FFD21F" /><stop offset="0.5" stopColor="#1F4FBF" />
        <stop offset="0.74" stopColor="#1F4FBF" /><stop offset="0.74" stopColor="#D7262E" />
      </linearGradient>
      <linearGradient id="bz-lens-neon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2A7A12" /><stop offset="1" stopColor="#58E52A" />
      </linearGradient>
    </defs>
  )
}

/* ---------- Cuerpo base (no cambia) ---------- */
export const Shadow = () => <ellipse cx="200" cy="584" rx="112" ry="12" fill="#151515" opacity=".14" />

export const Paws = () => (<g><Fluffy pts={PAW_L} /><Fluffy pts={PAW_R} /><circle cx="84" cy="444" r="16" fill="url(#bz-curl)" /><circle cx="316" cy="444" r="16" fill="url(#bz-curl)" /></g>)

export const Ears = () => (
  <g>
    <g className="bz-ear bz-ear--l"><Fluffy pts={EAR_L} /><ellipse cx="112" cy="232" rx="28" ry="70" fill="url(#bz-curl)" /></g>
    <g className="bz-ear bz-ear--r"><Fluffy pts={EAR_R} /><ellipse cx="288" cy="232" rx="28" ry="70" fill="url(#bz-curl)" /></g>
  </g>
)

export const Head = ({ happy }) => (
  <g>
    <Fluffy pts={HEAD} />
    <ellipse cx="200" cy="168" rx="88" ry="80" fill="url(#bz-curl)" />
    <ellipse cx="200" cy="200" rx="58" ry="44" fill="url(#bz-curl-l)" />
    <circle cx="166" cy="166" r="8" fill="#140B07" /><circle cx="234" cy="166" r="8" fill="#140B07" />
    <Fluffy pts={BEARD} fill="url(#bz-curl-l)" />
    <ellipse cx="200" cy="222" rx="40" ry="26" fill="url(#bz-curl-l)" />
    <path d="M184 202 Q200 194 216 202 Q218 214 200 220 Q182 214 184 202Z" fill="#111" />
    <ellipse cx="194" cy="203" rx="5" ry="2.5" fill="#5A5A5A" />
    <path d={happy ? 'M184 232 Q200 248 216 232' : 'M187 236 Q200 240 213 236'} fill="none" stroke="#1E100A" strokeWidth="3.5" strokeLinecap="round" />
  </g>
)

export const Chain = () => (
  <g fill="none" stroke="#D9B44A" strokeWidth="2.6">
    <path d="M176 258 Q200 312 224 258" /><path d="M172 258 Q200 326 228 258" strokeWidth="2" />
    <path d="M196 318 L204 318 L206 328 L200 334 L193 327Z" fill="#D9B44A" stroke="none" />
  </g>
)

/* ---------- PRENDAS ---------- */
const capCrown = 'M106 138 C104 72 148 42 200 42 C252 42 296 72 294 138 Z'
const capBrim = 'M88 134 Q200 116 312 134 L316 150 Q200 136 84 150 Z'

export const garments = {
  gorra: {
    camo: () => (<g>
      <path d={capCrown} fill="url(#bz-camo)" stroke="#1A2410" strokeWidth="3" />
      <path d="M200 44 V136 M150 54 Q140 96 142 136 M250 54 Q260 96 258 136" stroke="#1A2410" strokeWidth="2" fill="none" opacity=".5" />
      <text x="200" y="118" textAnchor="middle" fontFamily="Archivo Variable, sans-serif" fontWeight="900" fontStretch="70%" fontSize="44" fill="#6BFF2E" stroke="#163009" strokeWidth="2.5" paintOrder="stroke">4:20</text>
      <Leaf x={132} y={124} s={1.05} /><Leaf x={268} y={124} s={1.05} />
      <path d={capBrim} fill="#3C5420" stroke="#1A2410" strokeWidth="3" /><circle cx="200" cy="44" r="6" fill="#2F4A19" />
    </g>),
    negra: () => (<g>
      <path d={capCrown} fill="#1B1B1B" stroke="#000" strokeWidth="3" />
      <path d="M200 44 V136" stroke="#333" strokeWidth="2" />
      <Leaf x={200} y={112} s={1.9} fill="#F4F4F1" />
      <path d={capBrim} fill="#111" stroke="#000" strokeWidth="3" /><circle cx="200" cy="44" r="6" fill="#333" />
    </g>),
    gris: () => (<g>
      <path d={capCrown} fill="#9A9A96" stroke="#3A3A38" strokeWidth="3" />
      <path d="M200 44 V136" stroke="#7A7A76" strokeWidth="2" />
      <text x="200" y="118" textAnchor="middle" fontFamily="Archivo Variable, sans-serif" fontWeight="900" fontStretch="70%" fontSize="40" fill="#151515">4:20</text>
      <path d={capBrim} fill="#6E6E6B" stroke="#3A3A38" strokeWidth="3" /><circle cx="200" cy="44" r="6" fill="#6E6E6B" />
    </g>),
  },
  gafas: {
    neon: () => <Glasses frame="#6BFF2E" lens="url(#bz-lens-neon)" />,
    negras: () => <Glasses frame="#151515" lens="#1E1E1E" />,
    rosa: () => <Glasses frame="#6BFF2E" lens="#E04FA8" />,
  },
  camiseta: {
    '420': () => (<g>
      <path d="M132 258 L268 258 L280 424 L120 424 Z" fill="#1C1C1C" />
      <Leaf x={200} y={336} s={2.3} fill="#6BFF2E" />
      <text x="200" y="392" textAnchor="middle" fontFamily="Archivo Variable, sans-serif" fontWeight="900" fontStretch="75%" fontSize="40" fill="#6BFF2E" stroke="#0E2A06" strokeWidth="2" paintOrder="stroke">420</text>
    </g>),
    monte: () => (<g>
      <path d="M132 258 L268 258 L280 424 L120 424 Z" fill="#23862E" />
      <path d="M130 300 L270 300 M128 340 L272 340 M126 380 L274 380" stroke="#FFD21F" strokeWidth="3" strokeDasharray="14 8" />
      <Leaf x={200} y={336} s={2.2} fill="#FFD21F" />
    </g>),
    blanca: () => (<g>
      <path d="M132 258 L268 258 L280 424 L120 424 Z" fill="#F2F2EF" />
      <text x="200" y="360" textAnchor="middle" fontFamily="Archivo Variable, sans-serif" fontWeight="900" fontStretch="62%" fontSize="19" fill="#151515">BARETICO</text>
    </g>),
  },
  chaqueta: {
    tricolor: () => <Jacket fill="url(#bz-flag)" trim="#151515" patch />,
    negra: () => <Jacket fill="#1C1C1C" trim="#0A0A0A" zip="#6BFF2E" />,
    asfalto: () => <Jacket fill="#8E8E8A" trim="#2A2A28" zip="#151515" stripe="#151515" />,
  },
  pantalon: {
    cargo: () => (<g>
      <Pants fill="#566B38" dark="#3F5027" />
      <rect x="118" y="468" width="28" height="36" rx="3" fill="#4A5D30" stroke="#33421F" strokeWidth="2" />
      <rect x="254" y="468" width="28" height="36" rx="3" fill="#4A5D30" stroke="#33421F" strokeWidth="2" />
      <path d="M130 446 L190 452 M270 446 L210 452" stroke="#1C1C1C" strokeWidth="6" />
    </g>),
    jean: () => (<g>
      <Pants fill="#4F73A0" dark="#3A5A82" cuff="#6C8DB6" />
      <path d="M140 480 Q154 474 168 482 M232 500 Q246 494 258 502" stroke="#DDE6F0" strokeWidth="4" strokeLinecap="round" />
      <path d="M150 512 Q160 508 170 514" stroke="#DDE6F0" strokeWidth="3" strokeLinecap="round" />
    </g>),
    jogger: () => (<g>
      <Pants fill="#6E6E6B" dark="#4E4E4B" />
      <path d="M125 430 L130 534 M275 430 L270 534" stroke="#F4F4F1" strokeWidth="5" />
    </g>),
  },
  tenis: {
    selva: () => <Shoes base="#2DB34A" panel="#FFD21F" sole="#6BFF2E" lace="#151515" />,
    carbon: () => <Shoes base="#1C1C1C" panel="#3A3A38" sole="#F4F4F1" lace="#F4F4F1" />,
    nube: () => <Shoes base="#F4F4F1" panel="#D6D6D2" sole="#BDBDB9" lace="#151515" />,
  },
}

function Glasses({ frame, lens }) {
  return (
    <g>
      <path d="M134 158 L104 150 M266 158 L296 150" stroke={frame} strokeWidth="6" strokeLinecap="round" />
      <circle cx="166" cy="164" r="30" fill={lens} opacity=".88" stroke={frame} strokeWidth="9" />
      <circle cx="234" cy="164" r="30" fill={lens} opacity=".88" stroke={frame} strokeWidth="9" />
      <path d="M192 160 Q200 152 208 160" fill="none" stroke={frame} strokeWidth="7" />
      <path d="M150 150 Q158 144 166 146" stroke="#fff" strokeOpacity=".55" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M218 150 Q226 144 234 146" stroke="#fff" strokeOpacity=".55" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Jacket({ fill, trim, zip = '#9A9A96', patch, stripe }) {
  const L = 'M128 260 Q152 250 170 256 L168 426 L110 426 Q104 338 128 260 Z'
  const R = 'M272 260 Q248 250 230 256 L232 426 L290 426 Q296 338 272 260 Z'
  const SL = 'M128 262 Q92 276 82 330 L68 420 L104 424 L114 344 Q118 300 128 262 Z'
  const SR = 'M272 262 Q308 276 318 330 L332 420 L296 424 L286 344 Q282 300 272 262 Z'
  return (
    <g stroke="#151515" strokeWidth="3" strokeLinejoin="round">
      <path d={SL} fill={fill} /><path d={SR} fill={fill} />
      <path d={L} fill={fill} /><path d={R} fill={fill} />
      {stripe && <path d="M96 300 L82 410 M304 300 L318 410" stroke={stripe} strokeWidth="8" />}
      <rect x="66" y="416" width="40" height="16" rx="4" fill={trim} /><rect x="294" y="416" width="40" height="16" rx="4" fill={trim} />
      <rect x="110" y="420" width="58" height="16" fill={trim} /><rect x="232" y="420" width="58" height="16" fill={trim} />
      <path d="M146 256 L164 234 L172 262 Z M254 256 L236 234 L228 262 Z" fill={trim} />
      <path d="M168 262 V420 M232 262 V420" stroke={zip} strokeWidth="3" strokeDasharray="3 3" />
      {patch && <g stroke="none"><rect x="92" y="300" width="22" height="14" fill="#FFD21F" /><rect x="92" y="307" width="22" height="4" fill="#1F4FBF" /><rect x="92" y="311" width="22" height="3" fill="#D7262E" /></g>}
      <rect x="138" y="360" width="4" height="34" fill="#151515" stroke="none" /><rect x="258" y="360" width="4" height="34" fill="#151515" stroke="none" />
    </g>
  )
}

function Pants({ fill, dark, cuff }) {
  return (
    <g stroke="#151515" strokeWidth="3" strokeLinejoin="round">
      <path d="M118 420 H282 L278 538 H206 L200 466 L194 538 H122 Z" fill={fill} />
      <path d="M200 424 V466" stroke={dark} strokeWidth="2" />
      <rect x="120" y="526" width="76" height="14" rx="3" fill={cuff || dark} /><rect x="204" y="526" width="76" height="14" rx="3" fill={cuff || dark} />
    </g>
  )
}

function Shoes({ base, panel, sole, lace }) {
  const shoe = (m) => (
    <g transform={m ? 'translate(400 0) scale(-1 1)' : undefined}>
      <path d="M114 566 Q110 540 140 536 L184 536 Q204 540 204 562 L206 572 Q160 584 110 576 Z" fill={base} stroke="#151515" strokeWidth="3" strokeLinejoin="round" />
      <path d="M126 552 Q150 544 168 552 L160 566 Q140 566 124 564 Z" fill={panel} />
      <path d="M108 572 Q160 586 208 572 L208 582 Q160 594 106 584 Z" fill={sole} stroke="#151515" strokeWidth="3" strokeLinejoin="round" />
      <path d="M168 542 L186 546 M166 550 L186 554" stroke={lace} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
  return <g>{shoe(false)}{shoe(true)}</g>
}

/* Recortes de viewBox para mostrar una prenda sola (miniaturas del catálogo). */
export const crops = {
  gorra: '78 32 244 128', gafas: '96 128 208 76', camiseta: '108 250 184 184',
  chaqueta: '58 228 284 214', pantalon: '104 410 192 140', tenis: '96 528 208 70',
}

/* Punto donde aparece la nube de cambio, por prenda. */
export const puffAt = { gorra: [200, 92], gafas: [200, 164], camiseta: [200, 320], chaqueta: [200, 340], pantalon: [200, 480], tenis: [200, 566] }
