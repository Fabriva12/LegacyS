// Punto de entrada principal de la aplicación LegacySport
// Renderiza el componente App dentro del elemento con id="app"
// Importa los estilos principales (Tailwind + animaciones CSS)

import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Crear el root de React y renderizar la aplicación
createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
