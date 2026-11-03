// Sello: la cabeza de Baretico (gorra camo + gafas clorofila). Ver docs/BRAND.md
export function Mark({ size = 32, className }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <ellipse cx="50" cy="126" rx="18" ry="37" fill="#4A2C20" /><ellipse cx="150" cy="126" rx="18" ry="37" fill="#4A2C20" />
      <ellipse cx="100" cy="112" rx="59" ry="56" fill="#4A2C20" />
      <ellipse cx="100" cy="144" rx="29" ry="21" fill="#6A4331" />
      <ellipse cx="100" cy="134" rx="12" ry="8" fill="#111" />
      <circle cx="78" cy="106" r="21" fill="#2A7A12" stroke="#6BFF2E" strokeWidth="7" />
      <circle cx="122" cy="106" r="21" fill="#2A7A12" stroke="#6BFF2E" strokeWidth="7" />
      <path d="M44 84 C44 60 70 40 100 40 C130 40 156 60 156 84 Z" fill="#5E7F2F" />
      <rect x="34" y="80" width="132" height="12" rx="6" fill="#3C5420" />
      <rect x="85" y="60" width="30" height="12" rx="6" fill="#6BFF2E" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="logo">
      <Mark size={34} />
      <span className="logo__word">BARETICO</span>
    </span>
  )
}
