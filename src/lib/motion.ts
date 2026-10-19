import { cubicOut } from 'svelte/easing';
import { animate, spring } from 'motion';

export const reduced = (): boolean => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Page enter: soft fade + 14px rise. */
export function pageIn(_node: Element, { delay = 0 } = {}) {
  const r = reduced();
  return { delay, duration: r ? 0 : 520, easing: cubicOut, css: (t: number) => `opacity:${t};transform:translateY(${(1 - t) * 14}px)` };
}

/** Bottom sheet slide-up. */
export function sheetIn(_node: Element, { duration = 420 } = {}) {
  const r = reduced();
  return { duration: r ? 0 : duration, easing: cubicOut, css: (t: number, u: number) => `transform:translateY(${u * 100}%)` };
}
export function fadeIn(_node: Element, { duration = 300 } = {}) {
  const r = reduced();
  return { duration: r ? 0 : duration, css: (t: number) => `opacity:${t}` };
}

/** Spring "pop" used by the save heart. */
export function pop(el: Element) {
  if (reduced()) return;
  animate(el, { scale: [1, 1.35, 1] }, { type: spring, stiffness: 420, damping: 14 } as never);
}
