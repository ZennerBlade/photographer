import type { ImageMeta } from '../data/types';

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

/**
 * Smart crop. CSS `object-position: X%` aligns the X% point of the image with the X% point of the box,
 * which is NOT the same as centring a focal point. This solves for the exact object-position that places the
 * image's focal point (img.focus, e.g. "42% 25%") at (tx, ty) of a `ratio` (w/h) box under `object-fit: cover`,
 * then nudges the window so the detected face box (img.box) stays fully inside whenever the crop is large enough.
 * Portrait boxes pass ty ~0.4 so faces sit slightly above centre.
 */
export function focusPosition(img: ImageMeta, ratio: number, ty = 0.42, tx = 0.5): string {
  const [fx, fy] = img.focus.split(' ').map((v) => parseFloat(v) / 100);
  const R = img.w / img.h;
  let px = 0.5;
  let py = 0.5;
  const box = img.box;
  if (R > ratio) {
    const win = ratio / R; // visible fraction of image width
    let s = fx - tx * win;
    if (box) {
      const lo = Math.max(0, box[2] - win), hi = Math.min(1 - win, box[0]);
      s = lo <= hi ? clamp(s, lo, hi) : (box[0] + box[2]) / 2 - win / 2;
    }
    px = clamp(s / (1 - win));
  } else if (R < ratio) {
    const win = R / ratio; // visible fraction of image height
    let s = fy - ty * win;
    if (box) {
      const lo = Math.max(0, box[3] - win), hi = Math.min(1 - win, box[1]);
      s = lo <= hi ? clamp(s, lo, hi) : (box[1] + box[3]) / 2 - win / 2;
    }
    py = clamp(s / (1 - win));
  }
  return `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`;
}
