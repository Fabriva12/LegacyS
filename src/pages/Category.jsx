import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  getSubcategories,
  getProducts,
  formatLabel,
  CATEGORY_META,
} from '../lib/catalog'
import ProductCard from '../components/ProductCard'

function Category() {
  const { category: catSlug, '*': splat } = useParams()
  const segments = splat ? splat.split('/').filter(Boolean) : []
  const currentPath = [catSlug, ...segments].join('/')
  const categoryIcon = CATEGORY_META[catSlug]?.icon || '📂'
  const title = formatLabel(segments[segments.length - 1] || catSlug)
  const backPath = segments.length === 0 ? '/' : `/${catSlug}/${segments.slice(0, -1).join('/')}`

  const [state, setState] = useState({ loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setState({ loading: true, error: null })

        const subs = await getSubcategories(currentPath)

        if (subs.length > 0) {
          if (!cancelled) setState({ loading: false, mode: 'folders', folders: subs })
        } else {
          const products = await getProducts(currentPath)
          if (!cancelled) setState({ loading: false, mode: 'products', products })
        }
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err.message })
      }
    }

    load()
    return () => { cancelled = true }
  }, [currentPath])

  function CamisetasBanner() {
    if (catSlug !== 'camisetas') return null
    return (
      <div className="mb-8 p-6 bg-gunmetal/5 rounded-xl border border-gunmetal/10 text-center">
        <h2 className="text-2xl font-bold text-goldenrod mb-2">
          👕 100% Personalizables
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4 max-w-lg mx-auto">
          <div>
            <span className="block text-sm text-gunmetal/60">Jugador</span>
            <span className="block text-lg font-bold text-gunmetal">₡23.000</span>
          </div>
          <div>
            <span className="block text-sm text-gunmetal/60">Retro</span>
            <span className="block text-lg font-bold text-gunmetal">₡23.000</span>
          </div>
          <div>
            <span className="block text-sm text-gunmetal/60">Fan</span>
            <span className="block text-lg font-bold text-gunmetal">₡22.000</span>
          </div>
        </div>
        <p className="text-gunmetal/80">
          ¿No encontrás la camiseta que andás buscando?{' '}
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '0000000000'}?text=${encodeURIComponent('Hola, busco una camiseta que no está en el catálogo. ¿Me ayudan?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-goldenrod font-semibold hover:underline"
          >
            Envianos una foto y la conseguimos 👉
          </a>
        </p>
      </div>
    )
  }

  function CalzadoBanner() {
    if (catSlug !== 'calzado') return null
    return (
      <div className="mb-8 p-6 bg-gunmetal/5 rounded-xl border border-gunmetal/10 text-center">
        <h2 className="text-2xl font-bold text-goldenrod mb-2">
          👟 Precios de Calzado
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4 max-w-sm mx-auto">
          <div>
            <span className="block text-sm text-gunmetal/60">Adultos</span>
            <span className="block text-lg font-bold text-gunmetal">₡65.000</span>
          </div>
          <div>
            <span className="block text-sm text-gunmetal/60">Niños</span>
            <span className="block text-lg font-bold text-gunmetal">₡45.000</span>
          </div>
        </div>
      </div>
    )
  }

  function CalzadoExpressBanner() {
    if (catSlug !== 'entrega-inmediata' || !segments.includes('calzado')) return null
    return (
      <div className="mb-8 p-6 bg-gunmetal/5 rounded-xl border border-gunmetal/10 text-center">
        <h2 className="text-2xl font-bold text-goldenrod mb-2">
          ⚡ Entrega Inmediata
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4 max-w-sm mx-auto">
          <div>
            <span className="block text-sm text-gunmetal/60">Adultos</span>
            <span className="block text-lg font-bold text-gunmetal">₡60.000</span>
          </div>
          <div>
            <span className="block text-sm text-gunmetal/60">Niños</span>
            <span className="block text-lg font-bold text-gunmetal">₡42.000</span>
          </div>
        </div>
      </div>
    )
  }

  if (state.loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gunmetal">Cargando...</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-vibrant-coral mb-4">{state.error}</p>
        <p className="text-sm text-gunmetal/50 mb-4">
          Verificá que Firebase Storage esté configurado.
        </p>
        <Link to="/" className="text-goldenrod hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    )
  }

  if (state.mode === 'folders') {
    return (
      <div className="slide-up">
        <div className="flex items-center gap-4 mb-8">
          <Link to={backPath} className="text-gunmetal/60 hover:text-goldenrod transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gunmetal">{title}</h1>
        </div>

        <CamisetasBanner />
        <CalzadoBanner />
        <CalzadoExpressBanner />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {state.folders.map((folder) => (
            <Link
              key={folder.fullPath}
              to={`/${catSlug}${segments.length > 0 ? '/' + segments.join('/') : ''}/${folder.name}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-mint-cream shadow-md border border-gunmetal/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-goldenrod/30"
            >
              <span className="text-4xl">{categoryIcon}</span>
              <span className="text-lg font-semibold text-gunmetal text-center">
                {folder.label}
              </span>
              {folder.count > 0 && (
                <span className="text-sm text-gunmetal/50">
                  {folder.count} producto{folder.count !== 1 ? 's' : ''}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (state.mode === 'products') {
    return (
      <div className="slide-up">
        <div className="flex items-center gap-4 mb-8">
          <Link to={backPath} className="text-gunmetal/60 hover:text-goldenrod transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gunmetal">{title}</h1>
        </div>

        <CamisetasBanner />
        <CalzadoBanner />
        <CalzadoExpressBanner />

        {state.products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay productos disponibles en esta sección.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.products.map((product, index) => (
              <div
                key={product.fullPath}
                className="slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}

export default Category
