// Página de categoría para LegacySport
// 100% dinámica: descubre la estructura desde Firebase Storage
// No hay categorías hardcodeadas. Cada carpeta raíz = 1 categoría.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  getCategories,
  getSubcategories,
  getBrands,
  getProducts,
  formatLabel,
} from '../lib/catalog'
import ProductCard from '../components/ProductCard'

function Category() {
  const { category: catSlug, subcategory, brand } = useParams()

  const [state, setState] = useState({ loading: true, error: null })

  // Un solo useEffect maestro que decide qué cargar según la ruta
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setState({ loading: true, error: null })

        // ── Nivel 1: Categorías raíz (sin categoría en URL) ──
        if (!catSlug) {
          const categories = await getCategories()
          if (!cancelled) setState({ loading: false, mode: 'categories', categories })
          return
        }

        // ── Nivel 2: Subcategorías de una categoría ──
        if (!subcategory) {
          const [categories, subs] = await Promise.all([
            getCategories(),
            getSubcategories(catSlug),
          ])
          const category = categories.find((c) => c.name === catSlug) || {
            label: formatLabel(catSlug),
            icon: '📁',
          }
          if (!cancelled) setState({ loading: false, mode: 'subcategories', category, subcategories: subs })
          return
        }

        // ── Nivel 3: ¿Marcas o productos? ──
        if (catSlug && subcategory && !brand) {
          const path = `${catSlug}/${subcategory}`
          const subs = await getSubcategories(path)
          const isHierarchical = subs.length > 0

          if (isHierarchical) {
            const brands = await getBrands(path)
            if (!cancelled) setState({
              loading: false,
              mode: 'brands',
              brands,
              parentLabel: formatLabel(subcategory),
              backPath: `/${catSlug}`,
            })
          } else {
            const products = await getProducts(path)
            if (!cancelled) setState({
              loading: false,
              mode: 'products',
              products,
              title: formatLabel(subcategory),
              backPath: `/${catSlug}`,
            })
          }
          return
        }

        // ── Nivel final: Productos de una marca (calzado) ──
        if (catSlug && subcategory && brand) {
          const path = `${catSlug}/${subcategory}/${brand}`
          const products = await getProducts(path)
          if (!cancelled) setState({
            loading: false,
            mode: 'products',
            products,
            title: `${formatLabel(subcategory)} — ${formatLabel(brand)}`,
            backPath: `/${catSlug}/${subcategory}`,
          })
          return
        }
      } catch (err) {
        if (!cancelled) setState({ loading: false, error: err.message })
      }
    }

    load()
    return () => { cancelled = true }
  }, [catSlug, subcategory, brand])

  // ─── Banner reutilizable de Camisetas ───
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
            <span className="block text-lg font-bold text-gunmetal">₡21.000</span>
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

  // ─── Helpers de render ───
  if (state.loading) {
    return (
      <div className="text-center py-20 bg-mint-cream min-h-screen">
        <p className="text-xl text-gunmetal">Cargando...</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-20 bg-mint-cream min-h-screen">
        <p className="text-xl text-vibrant-coral mb-4">{state.error}</p>
        <p className="text-sm text-gunmetal/50 mb-4">
          Verificá que Firebase Storage esté configurado y que hayas subido las carpetas.
        </p>
        <Link to="/" className="text-goldenrod hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    )
  }

  // ─── RENDER: Categorías raíz ───
  if (state.mode === 'categories') {
    return (
      <div className="slide-up min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold text-gunmetal mb-8 text-center">
          Catálogo
        </h1>

        {state.categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay categorías disponibles. Creá carpetas en Firebase Storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {state.categories.map((cat) => (
              <Link
                key={cat.fullPath}
                to={`/${cat.name}`}
                className="flex flex-col items-center gap-3 p-8 rounded-xl bg-mint-cream shadow-md border border-gunmetal/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-goldenrod/30"
              >
                <span className="text-5xl">{cat.icon}</span>
                <span className="text-xl font-semibold text-gunmetal text-center">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── RENDER: Subcategorías ───
  if (state.mode === 'subcategories') {
    const { category, subcategories } = state

    return (
      <div className="slide-up min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-gunmetal/60 hover:text-goldenrod transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gunmetal">
            {category.label}
          </h1>
        </div>

        <CamisetasBanner />

        {subcategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay secciones disponibles. Creá subcarpetas dentro de "{catSlug}/" en Firebase Storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {subcategories.map((sub) => (
              <Link
                key={sub.fullPath}
                to={`/${catSlug}/${sub.name}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-mint-cream shadow-md border border-gunmetal/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-goldenrod/30"
              >
                <span className="text-4xl">{category.icon}</span>
                <span className="text-lg font-semibold text-gunmetal text-center">
                  {sub.label}
                </span>
                {sub.count > 0 && (
                  <span className="text-sm text-gunmetal/50">
                    {sub.count} producto{sub.count !== 1 ? 's' : ''}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── RENDER: Marcas ───
  if (state.mode === 'brands') {
    const { brands, parentLabel, backPath } = state
    return (
      <div className="slide-up min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Link to={backPath} className="text-gunmetal/60 hover:text-goldenrod transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gunmetal">
            {parentLabel}
          </h1>
        </div>

        <CamisetasBanner />

        {brands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay marcas disponibles. Creá subcarpetas dentro de "{catSlug}/{subcategory}/" en Firebase Storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {brands.map((b) => (
              <Link
                key={b.fullPath}
                to={`/${catSlug}/${subcategory}/${b.name}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-mint-cream shadow-md border border-gunmetal/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-goldenrod/30"
              >
                <span className="text-4xl">👟</span>
                <span className="text-lg font-semibold text-gunmetal text-center">
                  {b.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── RENDER: Productos ───
  if (state.mode === 'products') {
    const { products, backPath, title } = state
    return (
      <div className="slide-up min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <Link to={backPath} className="text-gunmetal/60 hover:text-goldenrod transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gunmetal">
            {title}
          </h1>
        </div>

        <CamisetasBanner />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gunmetal/70">
              No hay productos disponibles en esta sección.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
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
