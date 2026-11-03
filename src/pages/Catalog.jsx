import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Page from '../components/Page'
import ProductCard from '../components/ProductCard'
import Mascot from '../mascot/Mascot'
import { useLook } from '../context/LookContext'
import { products, categories } from '../data/products'
import { dur, ease } from '../motion/tokens'

export default function Catalog() {
  const [cat, setCat] = useState('todo')
  const [sort, setSort] = useState('destacado')
  const { outfit } = useLook()
  let list = cat === 'todo' ? products : products.filter((p) => p.slot === cat)
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <Page title="Catálogo">
      <section className="section section--top">
        <div className="wrap catalog">
          {/* Probador lateral (escritorio) / flotante (móvil): cada "Probar" lo viste en vivo */}
          <aside className="catalog__mascot" aria-label="Probador">
            <Mascot outfit={outfit} label="Baretico con lo que vas probando" />
            <p className="mono muted small catalog__hint">Toca “Probar” y míralo cambiarse</p>
          </aside>
          <div>
            <m.h1 className="h1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur.base, ease: ease.colado, delay: 0.3 }}>Catálogo</m.h1>
            <div className="toolbar">
              <div className="chips" role="group" aria-label="Filtrar por prenda">
                {categories.map((c) => (
                  <button key={c.id} className="chip mono" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                    {cat === c.id && <m.span layoutId="chip-bg" className="chip__bg" transition={{ duration: dur.short, ease: ease.colado }} />}
                    <span className="chip__label">{c.label}</span>
                  </button>
                ))}
              </div>
              <label className="sort mono">Ordenar
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="destacado">Destacado</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option>
                </select>
              </label>
            </div>
            <p className="mono muted" aria-live="polite">{list.length} piezas</p>
            <m.div className="grid grid--3" layout>
              <AnimatePresence mode="popLayout">
                {list.map((p) => <ProductCard key={p.id} p={p} level={2} tryOn />)}
              </AnimatePresence>
            </m.div>
          </div>
        </div>
      </section>
    </Page>
  )
}
