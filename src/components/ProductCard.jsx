// Componente ProductCard para LegacySport
// Muestra imagen del producto desde Firebase Storage
// Al hacer clic, abre WhatsApp con info del producto

/**
 * Componente ProductCard — imagen + WhatsApp
 * @param {Object} props
 * @param {Object} props.product - { name, fullPath, imageUrl }
 */
function ProductCard({ product }) {
  const { imageUrl, name } = product

  if (!imageUrl) return null

  // Construir enlace de WhatsApp con nombre + imagen
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '0000000000'
  const message = `Hola, me interesa este producto:\n${name}\n${imageUrl}`

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="product-card rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block group"
      >
        {/* Imagen del producto */}
        <div className="aspect-square overflow-hidden bg-gunmetal/5">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Overlay con botón de compra al hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-mint-cream hover:bg-white rounded-full shadow-lg flex items-center gap-2 p-2">
            <img
              src="/legacy.png"
              alt="Logo LegacySport"
              className="w-8 h-8 object-contain"
            />
            <span className="text-gunmetal font-semibold pr-2">Comprar</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default ProductCard
