import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLook, getProduct, toOutfit } from '../data/products'

// Lo que Baretico lleva puesto. Se comparte entre páginas: lo que pruebas en el
// catálogo sigue puesto en el detalle, en el carrito y al volver.
const LookCtx = createContext(null)
const KEY = 'baretico-look'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved && Object.values(saved).every(getProduct)) return { ...defaultLook, ...saved }
  } catch { /* sin storage */ }
  return defaultLook
}

export function LookProvider({ children }) {
  const [look, setLook] = useState(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(look)) } catch { /* modo privado */ } }, [look])
  const wear = useCallback((id) => { const p = getProduct(id); if (p) setLook((l) => (l[p.slot] === id ? l : { ...l, [p.slot]: id })) }, [])
  const reset = useCallback(() => setLook(defaultLook), [])
  const value = useMemo(() => ({ look, outfit: toOutfit(look), wear, reset, setLook }), [look, wear, reset])
  return <LookCtx.Provider value={value}>{children}</LookCtx.Provider>
}
export const useLook = () => useContext(LookCtx)
