// Componente ProductCard para LegacySport
// Muestra la imagen del producto + botón de WhatsApp en la parte inferior
// La imagen NO es un link directo para evitar aperturas accidentales en mobile

/**
 * Componente ProductCard — imagen + botón WhatsApp
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
    <div className="product-card rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white">
      {/* Imagen del producto — SIN link directo a WhatsApp */}
      <div className="aspect-square overflow-hidden bg-gunmetal/5">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Botón WhatsApp en la parte inferior */}
      <div className="p-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-vibrant-coral hover:bg-vibrant-coral/80 text-mint-cream font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300"
        >
          <img
            src="/legacy.png"
            alt="LegacySport"
            className="w-5 h-5 object-contain"
          />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </div>
  )
}

export default ProductCard
