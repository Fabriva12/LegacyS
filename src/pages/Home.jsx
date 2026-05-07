// Página principal de LegacySpot
// Muestra hero + categorías descubiertas dinámicamente desde Firebase Storage

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../lib/catalog'

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
          Bienvenido a LegacySport
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.fullPath}
                to={`/${cat.name}`}
                className="flex items-center gap-4 p-6 rounded-xl bg-mint-cream shadow-md border border-gunmetal/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-goldenrod/30"
              >
                <span className="text-5xl">{cat.icon}</span>
                <div>
                  <span className="text-2xl font-bold text-gunmetal block">
                    {cat.label}
                  </span>
                  <span className="text-sm text-gunmetal/60">
                    Hacé clic para explorar
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
