// Configuración de Vite para LegacySport
// Integra el plugin de Tailwind CSS v4
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // Plugin de React
    tailwindcss() // Plugin de Tailwind CSS v4
  ]
})
