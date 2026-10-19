import type { ImageMeta } from '../data/types';

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Smart crop. CSS `object-position: X%` aligns the X% point of the image with the X% point of the box,
 * which is NOT the same as centring a focal point. This solves for the exact object-position that puts
 * the image's focal point (img.focus, e.g. "42% 25%") at (tx, ty) of a `ratio` (w/h) box under `object-fit: cover`.
 * tx/ty default to the centre; portrait boxes pass ty ~0.4 so faces sit slightly above centre.
 */
export function focusPosition(img: ImageMeta, ratio: number, ty = 0.42, tx = 0.5): string {
  const [fx, fy] = img.focus.split(' ').map((v) => parseFloat(v) / 100);
  const R = img.w / img.h;
  let px = 0.5;
  let py = 0.5;
  if (R > ratio) {
    // image wider than box: horizontal overflow
    const over = R / ratio - 1;
    px = clamp((fx * (R / ratio) - tx) / over);
  } else if (R < ratio) {
    const over = 1 / R - 1 / ratio;
    py = clamp((fy / R - ty / ratio) / over);
  }
  return `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`;
}
