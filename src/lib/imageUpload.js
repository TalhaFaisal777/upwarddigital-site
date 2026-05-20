// Client-side image compression → base64.
// We don't have a separate image host bound yet, so images travel with the
// post payload (base64 data URLs). Each upload is downsized to max 2200px on
// the longest edge and compressed to JPEG ~0.9 quality for sharper hero/detail
// images while still staying well under KV value limits in normal usage.

const MAX_DIMENSION = 2200
const JPEG_QUALITY = 0.9

export async function uploadImage(file) {
  if (!file) throw new Error("No file")
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are supported")
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Image too large (max 12 MB before compression)")
  }

  const dataUrl = await readAsDataURL(file)
  const img = await loadImage(dataUrl)

  const { width, height } = scaledDimensions(img.width, img.height)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  ctx.drawImage(img, 0, 0, width, height)

  // PNG preserves transparency; everything else becomes JPEG.
  const isPng = file.type === "image/png"
  const outputType = isPng ? "image/png" : "image/jpeg"
  const quality = isPng ? undefined : JPEG_QUALITY

  return canvas.toDataURL(outputType, quality)
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

function scaledDimensions(w, h) {
  if (w <= MAX_DIMENSION && h <= MAX_DIMENSION) return { width: w, height: h }
  const ratio = w > h ? MAX_DIMENSION / w : MAX_DIMENSION / h
  return {
    width: Math.round(w * ratio),
    height: Math.round(h * ratio),
  }
}
