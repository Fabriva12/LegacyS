// Catálogo dinámico con Firebase Storage
// Evita el bug de listar la raíz en buckets nuevos (.firebasestorage.app).
// Las categorías raíz se definen aquí, pero todo lo demás se descubre dinámicamente.

import { ref, listAll } from 'firebase/storage'
import { storage } from './firebase'

// ─── Presentación: labels e iconos (solo estética) ───
export const CATEGORY_META = {
  camisetas: { label: 'Camisetas', icon: '👕' },
  calzado: { label: 'Calzado', icon: '👟' },
  accesorios: { label: 'Accesorios', icon: '🎒' },
  'entrega-inmediata': { label: 'Entrega Inmediata', icon: '⚡' },
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif'])

/**
 * Convierte un slug en un label legible.
 * Soporta caracteres Unicode (ñ, tildes, etc.) correctamente.
 */
export function formatLabel(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Construye la URL pública de una imagen en Firebase Storage.
 */
export function getImageUrl(fullPath) {
  const bucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(fullPath)}?alt=media`
}

/**
 * Lista las subcarpetas de una ruta.
 */
async function listFolders(path) {
  try {
    const folderRef = ref(storage, path)
    const result = await listAll(folderRef)
    return result.prefixes.map((p) => ({
      name: p.name,
      label: CATEGORY_META[p.name]?.label || formatLabel(p.name),
      icon: CATEGORY_META[p.name]?.icon || '📁',
      fullPath: p.fullPath,
    }))
  } catch (e) {
    console.error(`ERROR listando carpetas en "${path}":`, e.code, e.message, e)
    return []
  }
}

/**
 * Lista las imágenes de una carpeta.
 */
async function listImages(path) {
  try {
    const folderRef = ref(storage, path)
    const result = await listAll(folderRef)

    return result.items
      .filter((item) => {
        const ext = item.name.split('.').pop().toLowerCase()
        return IMAGE_EXTENSIONS.has(ext)
      })
      .map((item) => ({
        name: item.name.replace(/\.[^/.]+$/, ''),
        fullPath: item.fullPath,
        imageUrl: getImageUrl(item.fullPath),
      }))
  } catch (e) {
    console.warn(`Error listando imágenes en ${path}:`, e.message)
    return []
  }
}

// ═══════════════════════════════════════════
// API PÚBLICA
// ═══════════════════════════════════════════

/**
 * Obtiene todas las categorías raíz.
 * Usamos la lista definida en CATEGORY_META para evitar el bug 400 de la raíz.
 */
export async function getCategories() {
  // Verificamos si las carpetas existen en Storage
  const results = await Promise.all(
    Object.entries(CATEGORY_META).map(async ([slug, meta]) => {
      try {
        const folderRef = ref(storage, slug)
        await listAll(folderRef)
        return { name: slug, label: meta.label, icon: meta.icon, fullPath: slug }
      } catch {
        return null // La carpeta no existe aún
      }
    })
  )
  return results.filter(Boolean)
}

/**
 * Obtiene las subcarpetas de una categoría con detección automática de tipo.
 */
export async function getSubcategories(categoryPath) {
  const subs = await listFolders(categoryPath)

  // Detectar tipo y contar productos para cada subcarpeta
  const withDetails = await Promise.all(
    subs.map(async (sub) => {
      const subSubs = await listFolders(sub.fullPath)
      const hasSubFolders = subSubs.length > 0
      let count = 0

      if (hasSubFolders) {
        // Hierarchical: contar en sub-subcarpetas
        for (const ss of subSubs) {
          count += (await listImages(ss.fullPath)).length
        }
      } else {
        // Flat: contar imágenes directas
        count = (await listImages(sub.fullPath)).length
      }

      return {
        ...sub,
        type: hasSubFolders ? 'hierarchical' : 'flat',
        count,
      }
    })
  )

  return withDetails
}

/**
 * Obtiene las marcas (sub-subcarpetas) dentro de una subcategoría de calzado.
 */
export async function getBrands(subcategoryPath) {
  const brands = await listFolders(subcategoryPath)

  const withCount = await Promise.all(
    brands.map(async (b) => {
      const count = (await listImages(b.fullPath)).length
      return { ...b, count }
    })
  )

  return withCount
}

/**
 * Obtiene los productos (imágenes) de una carpeta.
 */
export async function getProducts(folderPath) {
  return listImages(folderPath)
}
