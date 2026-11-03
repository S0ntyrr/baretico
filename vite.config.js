import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' + HashRouter => funciona en GitHub Pages sin configurar rutas en el servidor.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { target: 'es2020', cssCodeSplit: true },
})
