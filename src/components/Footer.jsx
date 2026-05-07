// Componente Footer para LegacySport
// Muestra enlaces de texto a redes sociales: Instagram y WhatsApp
// Sin iconos, solo texto claro y directo

import { Link } from 'react-router-dom'

/**
 * Componente Footer
 * Renderiza el pie de página con enlaces a redes sociales
 */
function Footer() {
  // Obtener datos de las variables de entorno
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL

  return (
    <footer className="bg-gunmetal text-mint-cream py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo pequeño + Copyright */}
        <div className="flex items-center gap-3 text-center md:text-left text-mint-cream/80">
          <img
            src="/legacy.png"
            alt="LegacySport Logo"
            className="h-8 w-auto" // Logo pequeño en el footer (32px)
          />
          <p>© 2026 LegacySport. Todos los derechos reservados.</p>
        </div>

        {/* Enlaces de texto a Redes Sociales - SIN ICONOS */}
        <div className="flex items-center gap-6">
          {/* Instagram - Texto: "Seguinos en Instagram" */}
          <a
            href={instagramUrl || 'https://instagram.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint-cream hover:text-vibrant-coral transition-colors font-medium"
            aria-label="Seguinos en Instagram"
          >
            Seguinos en Instagram
          </a>

          {/* WhatsApp - Texto: "Contacto" */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint-cream hover:text-vibrant-coral transition-colors font-medium"
            aria-label="Contacto por WhatsApp"
          >
            Contacto
          </a>
        </div>

        {/* Enlaces a secciones del sitio */}
        <nav>
          <ul className="flex gap-4 list-none m-0 p-0">
            <li>
              <Link to="/" className="text-mint-cream/80 hover:text-vibrant-coral transition-colors text-sm">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/calzado" className="text-mint-cream/80 hover:text-vibrant-coral transition-colors text-sm">
                Calzado
              </Link>
            </li>
            <li>
              <Link to="/camisetas" className="text-mint-cream/80 hover:text-vibrant-coral transition-colors text-sm">
                Camisetas
              </Link>
            </li>
            <li>
              <Link to="/accesorios" className="text-mint-cream/80 hover:text-vibrant-coral transition-colors text-sm">
                Accesorios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
