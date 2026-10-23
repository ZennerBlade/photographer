/** Client-side downscale so a 12 MB phone photo becomes a ~150 KB WebP (JPEG where WebP encoding is unavailable). */
export interface Scaled { blob: Blob; w: number; h: number }

async function decode(file: Blob): Promise<{ src: CanvasImageSource; w: number; h: number; close: () => void }> {
  if (typeof createImageBitmap === 'function') {
    try {
      const b = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { src: b, w: b.width, h: b.height, close: () => b.close() };
    } catch { /* fall through to <img> */ }
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await img.decode();
  return { src: img, w: img.naturalWidth, h: img.naturalHeight, close: () => URL.revokeObjectURL(url) };
}

export async function downscale(file: Blob, max = 1200): Promise<Scaled> {
  const d = await decode(file);
  try {
    if (!d.w || !d.h) throw new Error('empty image');
    const k = Math.min(1, max / Math.max(d.w, d.h));
    const w = Math.max(1, Math.round(d.w * k));
    const h = Math.max(1, Math.round(d.h * k));
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d')!.drawImage(d.src, 0, 0, w, h);
    const toBlob = (type: string, q: number) => new Promise<Blob | null>((r) => c.toBlob(r, type, q));
    let blob = await toBlob('image/webp', 0.82);
    if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg', 0.86);
    if (!blob) throw new Error('encode failed');
    return { blob, w, h };
  } finally {
    d.close();
  }
}
