// Images are stored as base64 inside the post JSON (KV).
// Aggressive compression keeps the payload small so pages load fast.
// Hero: 1200px max, quality 0.70 — covers any screen at 2x density.
// Detail: 900px max, quality 0.68 — side-by-side blocks, never full-width.

export async function uploadHeroImage(file) {
  return compress(file, 1200, 0.70)
}

export async function uploadDetailImage(file) {
  return compress(file, 900, 0.68)
}

// Legacy single export — treated as hero by default.
export async function uploadImage(file) {
  return uploadHeroImage(file)
}

async function compress(file, maxDimension, jpegQuality) {
  if (!file) throw new Error("No file")
  if (!file.type.startsWith("image/")) throw new Error("Only image files are supported")
  if (file.size > 12 * 1024 * 1024) throw new Error("Image too large (max 12 MB)")

  const dataUrl = await readAsDataURL(file)
  const img = await loadImage(dataUrl)

  const { width, height } = scaledDimensions(img.width, img.height, maxDimension)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  canvas.getContext("2d").drawImage(img, 0, 0, width, height)

  const isPng = file.type === "image/png"
  return canvas.toDataURL(isPng ? "image/png" : "image/jpeg", isPng ? undefined : jpegQuality)
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = () => reject(new Error("Image could not be decoded"))
    img.onload = () => resolve(img)
    img.src = src
  })
}

function scaledDimensions(w, h, max) {
  if (w <= max && h <= max) return { width: w, height: h }
  const ratio = w > h ? max / w : max / h
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) }
}
