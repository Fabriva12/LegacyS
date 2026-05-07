// Componente Header para LegacySport
// Muestra el logo y la navegación principal con las 3 categorías
// Utiliza React Router NavLink para resaltar la categoría activa

import { NavLink } from 'react-router-dom'

/**
 * Componente Header
 * Renderiza la barra de navegación superior con logo y links a categorías
 */
function Header() {
  return (
    <header className="bg-gunmetal shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo de LegacySport - Logo pequeño + texto al lado */}
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/legacy.png"
            alt="LegacySport Logo"
            className="h-12 w-auto"
          />
          <span className="text-2xl font-bold text-mint-cream hover:text-vibrant-coral transition-colors">
            LegacySport
          </span>
        </NavLink>

        {/* Links de navegación para las 3 categorías */}
        <ul className="flex gap-6 list-none m-0 p-0">
          <li>
            <NavLink
              to="/calzado"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-goldenrod border-b-2 border-goldenrod pb-1' // Estilo para categoría activa (Goldenrod)
                    : 'text-mint-cream hover:text-vibrant-coral'
                }`
              }
            >
              Calzado
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/camisetas"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-goldenrod border-b-2 border-goldenrod pb-1'
                    : 'text-mint-cream hover:text-vibrant-coral'
                }`
              }
            >
              Camisetas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accesorios"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-goldenrod border-b-2 border-goldenrod pb-1'
                    : 'text-mint-cream hover:text-vibrant-coral'
                }`
              }
            >
              Accesorios
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
