// Página principal de LegacySpot
// Muestra hero + categorías descubiertas dinámicamente desde Firebase Storage

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../lib/catalog'

// Mapeo de categorías a imágenes del catálogo en /public
const CATEGORY_IMAGE = {
  calzado: '/calzadobaner.png',
  camisetas: '/banercamiseta.png',
  accesorios: '/accesoriosbaner.png',
  'entrega-inmediata': '/entregainmediata.png',
}

function Home() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const cats = await getCategories()
        setCategories(cats)
      } catch (err) {
        console.error('Error al cargar catálogo:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="fade-in">
      {/* Sección Hero TRANSPARENTE para ver el fondo fondo.png */}
      <section className="text-center py-12 mb-6 bg-gunmetal/30 text-mint-cream rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-mint-cream/95 drop-shadow-lg">
          Bienvenido a Legacy Sports
        </h1>
        <p className="text-xl text-mint-cream/90 max-w-2xl mx-auto">
          Tu tienda de confianza para camisetas exclusivas y calzado deportivo
        </p>
      </section>

      {/* Banner del Mundial - Redirige a camisetas/mundial */}
      <section className="mb-8">
        <Link to="/camisetas/mundial" className="block hover:opacity-90 transition-opacity">
          <img
            src="/banner.png"
            alt="Camisetas del Mundial - Haz clic para ver catálogo"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </Link>
      </section>

      {/* Categorías principales */}
      <section className="pt-4">
        <h2 className="text-3xl font-bold text-gunmetal mb-8 text-center">
          Explorá nuestro catálogo
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-lg text-gunmetal/60">Cargando catálogo...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-vibrant-coral mb-2">{error}</p>
            <p className="text-sm text-gunmetal/50">
              Verificá que Firebase Storage esté configurado.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-goldenrod text-mint-cream px-6 py-2 rounded-lg hover:bg-goldenrod/80 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay categorías disponibles. Creá carpetas en Firebase Storage para comenzar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const categoryImage = CATEGORY_IMAGE[cat.name]
              return (
                <Link
                  key={cat.fullPath}
                  to={`/${cat.name}`}
                  className="relative group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <img
                    src={categoryImage}
                    alt={cat.label}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div>
                      <span className="text-2xl font-bold text-black block">
                        {cat.label}
                      </span>
                      <span className="text-sm text-black/80">
                        Hacé clic para explorar
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
