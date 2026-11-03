// Catálogo simulado: cada producto es una prenda que Baretico puede ponerse.
// slot = capa del personaje · variant = dibujo dentro de esa capa (src/mascot/parts.jsx)
const T = { ropa: ['S', 'M', 'L', 'XL'], pant: ['28', '30', '32', '34', '36'], tenis: ['38', '39', '40', '41', '42', '43'], unica: ['Única'] }

export const products = [
  { id: 'gorra-camo', slot: 'gorra', variant: 'camo', name: 'Gorra 4:20 Camo', price: 89000, color: '#5E7F2F', colorName: 'Camuflado', tag: 'Firma', sizes: T.unica, desc: 'Snapback de seis paneles en camuflado con bordado 4:20 en verde neón. La gorra con la que nació Baretico.' },
  { id: 'gorra-humo', slot: 'gorra', variant: 'negra', name: 'Gorra Humo', price: 79000, color: '#1B1B1B', colorName: 'Negro', sizes: T.unica, desc: 'Negra total con la hoja bordada en blanco. Discreta, hasta que te das la vuelta.' },
  { id: 'gorra-neblina', slot: 'gorra', variant: 'gris', name: 'Gorra Neblina', price: 79000, color: '#9A9A96', colorName: 'Gris', sizes: T.unica, desc: 'Gris niebla bogotana, 4:20 en negro. Para los días de llovizna.' },
  { id: 'gafas-clorofila', slot: 'gafas', variant: 'neon', name: 'Gafas Clorofila', price: 69000, color: '#6BFF2E', colorName: 'Verde neón', tag: 'Firma', sizes: T.unica, desc: 'Montura redonda verde neón y lente verde. Protección UV400.' },
  { id: 'gafas-noche', slot: 'gafas', variant: 'negras', name: 'Gafas Noche', price: 59000, color: '#151515', colorName: 'Negro', sizes: T.unica, desc: 'Redondas, negras, lente ahumado. Van con todo.' },
  { id: 'gafas-atardecer', slot: 'gafas', variant: 'rosa', name: 'Gafas Atardecer', price: 69000, color: '#E04FA8', colorName: 'Rosa / neón', sizes: T.unica, desc: 'Montura neón con lente rosa: el atardecer sobre los cerros.' },
  { id: 'chaqueta-tricolor', slot: 'chaqueta', variant: 'tricolor', name: 'Chaqueta Tricolor', price: 289000, color: '#FFD21F', colorName: 'Amarillo / azul / rojo', tag: 'Firma', sizes: T.ropa, desc: 'Bomber en cuero sintético con los tres colores de la bandera, puños en rib negro y parche en la manga.' },
  { id: 'chaqueta-bomber', slot: 'chaqueta', variant: 'negra', name: 'Bomber Negra', price: 249000, color: '#1C1C1C', colorName: 'Negro', sizes: T.ropa, desc: 'Bomber negra con cremallera neón. La básica que no es básica.' },
  { id: 'chaqueta-asfalto', slot: 'chaqueta', variant: 'asfalto', name: 'Chaqueta Asfalto', price: 259000, color: '#8E8E8A', colorName: 'Gris', sizes: T.ropa, desc: 'Gris pavimento con franja negra en las mangas. Repelente al agua.' },
  { id: 'camiseta-420', slot: 'camiseta', variant: '420', name: 'Camiseta 4:20', price: 89000, color: '#1C1C1C', colorName: 'Negro', tag: 'Firma', sizes: T.ropa, desc: 'Algodón 240 g, estampado frontal de hoja y 420 en tinta neón.' },
  { id: 'camiseta-monte', slot: 'camiseta', variant: 'monte', name: 'Camiseta Monte', price: 89000, color: '#23862E', colorName: 'Verde', sizes: T.ropa, desc: 'Verde monte con líneas amarillas inspiradas en tejidos andinos.' },
  { id: 'camiseta-basica', slot: 'camiseta', variant: 'blanca', name: 'Camiseta Básica', price: 69000, color: '#F2F2EF', colorName: 'Blanco', sizes: T.ropa, desc: 'Blanca con el nombre BARETICO al pecho. La de todos los días.' },
  { id: 'pantalon-cargo', slot: 'pantalon', variant: 'cargo', name: 'Cargo Oliva', price: 179000, color: '#566B38', colorName: 'Oliva', tag: 'Firma', sizes: T.pant, desc: 'Cargo de dril con bolsillos laterales, correas y bota jogger.' },
  { id: 'pantalon-jean', slot: 'pantalon', variant: 'jean', name: 'Jean Roto', price: 169000, color: '#4F73A0', colorName: 'Azul', sizes: T.pant, desc: 'Denim de 13 oz con rotos hechos a mano. Cada uno distinto.' },
  { id: 'pantalon-jogger', slot: 'pantalon', variant: 'jogger', name: 'Jogger Gris', price: 149000, color: '#6E6E6B', colorName: 'Gris', sizes: T.pant, desc: 'Felpa liviana con franja blanca lateral.' },
  { id: 'tenis-selva', slot: 'tenis', variant: 'selva', name: 'Tenis Selva', price: 329000, color: '#2DB34A', colorName: 'Verde / amarillo', tag: 'Firma', sizes: T.tenis, desc: 'Suela chunky neón, paneles verde y amarillo. Diseño propio, sin logos de terceros.' },
  { id: 'tenis-carbon', slot: 'tenis', variant: 'carbon', name: 'Tenis Carbón', price: 299000, color: '#1C1C1C', colorName: 'Negro', sizes: T.tenis, desc: 'Negros con suela blanca. Para la calle y para la noche.' },
  { id: 'tenis-nube', slot: 'tenis', variant: 'nube', name: 'Tenis Nube', price: 299000, color: '#F4F4F1', colorName: 'Blanco', sizes: T.tenis, desc: 'Blancos, limpios, suela gris. Minimalismo puro.' },
]

export const slots = [
  { id: 'gorra', label: 'Gorra' }, { id: 'gafas', label: 'Gafas' }, { id: 'chaqueta', label: 'Chaqueta' },
  { id: 'camiseta', label: 'Camiseta' }, { id: 'pantalon', label: 'Pantalón' }, { id: 'tenis', label: 'Tenis' },
]
export const categories = [{ id: 'todo', label: 'Todo' }, ...slots]

// Look de fábrica = el de la hoja de personaje.
export const defaultLook = { gorra: 'gorra-camo', gafas: 'gafas-clorofila', chaqueta: 'chaqueta-tricolor', camiseta: 'camiseta-420', pantalon: 'pantalon-cargo', tenis: 'tenis-selva' }

export const formatCOP = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
export const getProduct = (id) => products.find((p) => p.id === id)
export const bySlot = (slot) => products.filter((p) => p.slot === slot)
// look {slot: productId} -> outfit {slot: variant} para el personaje
export const toOutfit = (look) => Object.fromEntries(Object.entries(look).map(([s, id]) => [s, getProduct(id).variant]))
