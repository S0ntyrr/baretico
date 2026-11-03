// Sello: formaleta (marco) + colado (naranja) + varilla (barra). Ver docs/BRAND.md
export function Mark({ size = 32, className }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <rect x="36" y="36" width="128" height="128" fill="none" stroke="currentColor" strokeWidth="14" />
      <rect x="48" y="106" width="104" height="52" fill="#FF5A1F" />
      <rect x="48" y="79" width="104" height="10" fill="currentColor" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="logo">
      <Mark size={30} />
      <span className="logo__word">OBRA<span aria-hidden="true">/</span><span className="sr-only"> </span>NEGRA</span>
    </span>
  )
}
