import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { getProduct } from '../data/products'

const CartCtx = createContext(null)
const KEY = 'obra-negra-cart'

function reducer(state, a) {
  switch (a.type) {
    case 'add': {
      const key = `${a.id}-${a.size}`
      const found = state.find((i) => i.key === key)
      return found
        ? state.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { key, id: a.id, size: a.size, qty: 1 }]
    }
    case 'qty':
      return state.map((i) => (i.key === a.key ? { ...i, qty: Math.max(1, Math.min(9, a.qty)) } : i))
    case 'remove':
      return state.filter((i) => i.key !== a.key)
    case 'clear':
      return []
    default:
      return state
  }
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load)
  const [flights, setFlights] = useState([])
  const [announce, setAnnounce] = useState('')
  const [bump, setBump] = useState(0)
  const iconRef = useRef(null)

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* modo privado */ } }, [items])

  const add = useCallback((id, size, fromEl) => {
    dispatch({ type: 'add', id, size })
    const p = getProduct(id)
    setAnnounce(`${p.name} talla ${size} agregado al carrito`)
    const to = iconRef.current?.getBoundingClientRect()
    const from = fromEl?.getBoundingClientRect()
    if (to && from) {
      const f = { id: Date.now(), color: p.color,
        x0: from.left + from.width / 2, y0: from.top + from.height / 2,
        x1: to.left + to.width / 2, y1: to.top + to.height / 2 }
      setFlights((fs) => [...fs, f])
    } else setBump((b) => b + 1)
  }, [])

  const land = useCallback((fid) => { setFlights((fs) => fs.filter((f) => f.id !== fid)); setBump((b) => b + 1) }, [])

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product)
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0)
    return { lines, count, subtotal, add, dispatch, iconRef, flights, land, bump, announce }
  }, [items, add, flights, land, bump, announce])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
