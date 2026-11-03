import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Page from '../components/Page'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import { dur, ease } from '../motion/tokens'

export default function Catalog() {
  const [cat, setCat] = useState('todo')
  const [sort, setSort] = useState('destacado')
  let list = cat === 'todo' ? products : products.filter((p) => p.category === cat)
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <Page title="Catálogo">
      <section className="section section--top">
        <div className="wrap">
          <m.h1 className="h1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur.base, ease: ease.colado, delay: 0.3 }}>
            Catálogo
          </m.h1>
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filtrar por categoría">
              {categories.map((c) => (
                <button key={c.id} className="chip mono" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                  {cat === c.id && <m.span layoutId="chip-bg" className="chip__bg" transition={{ duration: dur.short, ease: ease.colado }} />}
                  <span className="chip__label">{c.label}</span>
                </button>
              ))}
            </div>
            <label className="sort mono">
              Ordenar
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="destacado">Destacado</option>
                <option value="asc">Precio: menor a mayor</option>
                <option value="desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
          <p className="mono muted" aria-live="polite">{list.length} piezas</p>
          {/* layout: al filtrar, las tarjetas se reacomodan en lugar de saltar -> el usuario entiende qué cambió */}
          <m.div className="grid" layout>
            <AnimatePresence mode="popLayout">
              {list.map((p) => <ProductCard key={p.id} p={p} level={2} />)}
            </AnimatePresence>
          </m.div>
        </div>
      </section>
    </Page>
  )
}
