// Componente WhatsAppButton para LegacySport
// Botón reutilizable que genera un link a WhatsApp con mensaje pre-llenado
// El mensaje incluye el nombre, precio (en Colones ₡) y la URL de la imagen del producto
// Utiliza la variable de entorno VITE_WHATSAPP_NUMBER para el número de teléfono

import { Link } from 'react-router-dom'

/**
 * Componente WhatsAppButton
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.product - Objeto producto con name y price
 * @param {string} [props.className] - Clases CSS adicionales (opcional)
 * @param {string} [props.icon='whatsapp'] - Tipo de ícono: 'whatsapp' o 'store' (tienda)
 */
function WhatsAppButton({ product, className = '', icon = 'whatsapp' }) {
  // Validar que el producto exista (manejo de edge case)
  if (!product || !product.name) {
    return null // No renderizar nada si no hay datos del producto
  }

  // Obtener el número de WhatsApp desde las variables de entorno
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

  // Formatear el precio a Colones Costarricenses (₡)
  const formattedPrice = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC'
  }).format(product.price || 0)

  // Crear el mensaje para WhatsApp
  // Incluye: saludo, nombre del producto, precio en Colones, y URL de la imagen
  let message = `Hola, me interesa este producto:\n${product.name} - ${formattedPrice}`
  
  // Agregar la URL de la imagen si existe (product.images es un string)
  if (product.images) {
    message += `\n${product.images}`
  }

  // Codificar el mensaje para URL y generar el link de wa.me
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-vibrant-coral hover:bg-vibrant-coral/80 text-mint-cream font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ${className}`}
    >
      {/* Ícono dinámico: Tienda (store) o WhatsApp */}
      {icon === 'store' ? (
        // Ícono de tienda (shopping bag)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 1 1-8 0" />
        </svg>
      ) : (
        // Ícono de WhatsApp (por defecto)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.569-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.056 21.806c-1.303 0-2.588-.34-3.712-.993l-4.124 1.083 1.1-4.021c-.69-1.186-1.104-2.556-1.104-4.018 0-4.425 3.598-8.023 8.023-8.023s8.023 3.598 8.023 8.023-3.598 8.023-8.023 8.023zm8.023-18.698c-4.947 0-8.975 4.028-8.975 8.975 0 1.742.5 3.357 1.368 4.727l-1.83 6.693 6.865-1.802c1.272.69 2.709 1.057 4.157 1.057 4.947 0 8.975-4.028 8.975-8.975s-4.028-8.975-8.975-8.975h-.573z" />
        </svg>
      )}

      <span>Contacto</span>
    </a>
  )
}

export default WhatsAppButton
