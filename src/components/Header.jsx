// Componente Header para LegacySport
// Muestra el logo y la navegación principal con las categorías
// Responsive: menú hamburguesa en mobile, barra horizontal en desktop

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Componente Header
 * Renderiza la barra de navegación superior con logo y links a categorías
 * Incluye menú hamburguesa para dispositivos móviles
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-lg font-medium transition-colors ${isActive
      ? 'text-goldenrod border-b-2 border-goldenrod pb-1'
      : 'text-mint-cream hover:text-vibrant-coral'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-colors ${isActive
      ? 'text-goldenrod bg-gunmetal/50 font-semibold'
      : 'text-mint-cream hover:text-vibrant-coral hover:bg-gunmetal/30'
    }`

  return (
    <header className="bg-gunmetal shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo de LegacySport */}
        <NavLink to="/" className="flex items-center gap-6 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
          <img
            src="/legacy.png"
            alt="LegacySport Logo"
            className="h-14 w-auto"
          />
          <span className="text-2xl font-bold text-mint-cream hover:text-vibrant-coral transition-colors max-sm:hidden">
            Legacy Sports
          </span>
        </NavLink>

        {/* Botón hamburguesa - visible solo en mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-mint-cream p-2 rounded-lg hover:bg-gunmetal/50 transition-colors"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            /* Ícono X para cerrar */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            /* Ícono hamburguesa */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>

        {/* Links de navegación - desktop */}
        <ul className="hidden md:flex gap-6 list-none m-0 p-0">
          <li>
            <NavLink to="/calzado" className={linkClass}>Calzado</NavLink>
          </li>
          <li>
            <NavLink to="/camisetas" className={linkClass}>Camisetas</NavLink>
          </li>
          <li>
            <NavLink to="/accesorios" className={linkClass}>Accesorios</NavLink>
          </li>
          <li>
            <NavLink to="/entrega-inmediata" className={linkClass}>Entrega Inmediata</NavLink>
          </li>
        </ul>
      </nav>

      {/* Menú desplegable - mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-mint-cream/10">
          <ul className="flex flex-col gap-1 list-none m-0 p-3">
            <li>
              <NavLink to="/calzado" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Calzado</NavLink>
            </li>
            <li>
              <NavLink to="/camisetas" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Camisetas</NavLink>
            </li>
            <li>
              <NavLink to="/accesorios" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Accesorios</NavLink>
            </li>
            <li>
              <NavLink to="/entrega-inmediata" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Entrega Inmediata</NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
