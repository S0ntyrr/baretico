// Catálogo simulado. Las ilustraciones son SVG originales del equipo (src/components/Garment.jsx).
export const products = [
  { id: 'cimiento', name: 'Buzo Cimiento', type: 'hoodie', category: 'superior', price: 189000, color: '#111111', colorName: 'Negro obra', tag: 'Nuevo',
    desc: 'Felpa perchada de 380 g, corte boxy y capucha de doble capa. La base de todo: lo primero que se funde.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'plano-01', name: 'Camiseta Plano 01', type: 'tee', category: 'superior', price: 79000, color: '#D9D6CE', colorName: 'Cemento',
    desc: 'Algodón peinado 240 g, hombro caído y estampado de plano técnico en la espalda.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'andamio', name: 'Pantalón Andamio', type: 'pants', category: 'inferior', price: 169000, color: '#5C5A54', colorName: 'Gris varilla',
    desc: 'Dril pesado con bolsillos cargo y rodilla articulada. Hecho para subir y bajar.', sizes: ['28', '30', '32', '34', '36'] },
  { id: 'formaleta', name: 'Chaqueta Formaleta', type: 'jacket', category: 'superior', price: 249000, color: '#B83A0A', colorName: 'Óxido', tag: 'Edición 50',
    desc: 'Lona encerada, cierre metálico y forro en malla. Estructura que contiene, como la formaleta al concreto.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'varilla', name: 'Camiseta Varilla', type: 'tee', category: 'superior', price: 79000, color: '#FF5A1F', colorName: 'Naranja señal',
    desc: 'Algodón 240 g en color de señalización. Para que te vean desde el andamio.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'casco', name: 'Gorra Casco', type: 'cap', category: 'accesorios', price: 69000, color: '#111111', colorName: 'Negro obra',
    desc: 'Seis paneles, visera plana y bordado tonal del sello.', sizes: ['Única'] },
  { id: 'escombro', name: 'Bolso Escombro', type: 'tote', category: 'accesorios', price: 89000, color: '#D9D6CE', colorName: 'Cemento',
    desc: 'Lona 16 oz reforzada, inspirada en los costales de obra. Aguanta lo que le eches.', sizes: ['Única'] },
  { id: 'fraguado', name: 'Buzo Fraguado', type: 'hoodie', category: 'superior', price: 189000, color: '#5C5A54', colorName: 'Gris varilla',
    desc: 'Misma base del Cimiento con lavado ácido: cada pieza fragua distinto.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'replanteo', name: 'Short Replanteo', type: 'shorts', category: 'inferior', price: 119000, color: '#111111', colorName: 'Negro obra',
    desc: 'Short de dril con cinta métrica impresa en el costado.', sizes: ['S', 'M', 'L', 'XL'] },
]

export const categories = [
  { id: 'todo', label: 'Todo' },
  { id: 'superior', label: 'Superior' },
  { id: 'inferior', label: 'Inferior' },
  { id: 'accesorios', label: 'Accesorios' },
]

export const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export const getProduct = (id) => products.find((p) => p.id === id)
