import type { CategoryId, City, Filters, ImageMeta, Package, Photographer, PortfolioImage, SortKey } from './types';
import { CATEGORIES, CITIES } from './seed/categories';
import { PHOTOGRAPHERS_RAW } from './seed/photographers';
import { PACKAGES } from './seed/packages';
import { PORTFOLIO } from './seed/portfolio';
import { IMAGES } from './seed/images';
import { PRICE_BANDS } from '../lib/filters';
import { loadProfiles, PREVIEW_ID, type Runtime } from './userProfiles';

/** The only module the UI imports for data. Promise-shaped so a real API can replace it later. */
const phones = (n: number) => `+91 99999 ${String(n).padStart(5, '0')}`;
const SEED: Photographer[] = PHOTOGRAPHERS_RAW.map(({ n, ...p }) => ({
  ...p,
  startingPrice: Math.min(...PACKAGES.filter((k) => k.photographerId === p.id).map((k) => k.price)),
  contact: { phone: phones(n), whatsapp: phones(n), email: `${p.id}@example.com` },
}));

/** Profiles created through onboarding (IndexedDB), merged with the seed data. `ready` resolves once they are loaded; main.ts waits for it before mounting. */
let USER: Runtime[] = [];
let PREVIEW: Runtime | null = null;
const userImages: Record<string, ImageMeta> = {};
let PHOTOGRAPHERS: Photographer[] = SEED;
export let totalPhotographers = SEED.length;
export async function refreshUserProfiles(): Promise<void> {
  Object.values(userImages).forEach((m) => URL.revokeObjectURL(m.src));
  for (const k of Object.keys(userImages)) delete userImages[k];
  USER = await loadProfiles();
  USER.forEach((u) => Object.assign(userImages, u.images));
  PHOTOGRAPHERS = [...USER.map((u) => u.p), ...SEED];
  totalPhotographers = PHOTOGRAPHERS.length;
}
export const ready: Promise<void> = refreshUserProfiles().catch(() => {});
export const getMyProfiles = () => USER.map((u) => u.stored);
/** The review step renders the real Profile route against this unsaved draft (id PREVIEW_ID). */
export function setPreview(rt: Runtime | null) {
  if (PREVIEW) Object.keys(PREVIEW.images).forEach((k) => { URL.revokeObjectURL(PREVIEW!.images[k].src); delete userImages[k]; });
  PREVIEW = rt;
  if (rt) Object.assign(userImages, rt.images);
}
const rt = (id: string): Runtime | undefined => (id === PREVIEW_ID ? PREVIEW ?? undefined : USER.find((u) => u.p.id === id));

const delay = <T>(v: T): Promise<T> => (import.meta.env.DEV ? new Promise((r) => setTimeout(() => r(v), 220)) : Promise.resolve(v));

export const imageMeta = (id: string): ImageMeta => IMAGES[id] ?? userImages[id] ?? FALLBACK;
const FALLBACK: ImageMeta = { src: '', w: 4, h: 5, focus: '50% 40%', alt: '' };
export const getCategories = () => CATEGORIES;
export const getCities = (): Promise<readonly City[]> => delay(CITIES);

export function matches(p: Photographer, f: Filters): boolean {
  if (f.categories.length && !f.categories.some((c) => p.categories.includes(c))) return false;
  if (f.city && p.city !== f.city) return false;
  const band = PRICE_BANDS.find((b) => b.id === f.price)!;
  if (p.startingPrice < band.min || p.startingPrice >= band.max) return false;
  if (p.rating < f.minRating) return false;
  const q = f.q.trim().toLowerCase();
  if (q) {
    const hay = [p.name, p.city, p.area, p.tagline, ...p.categories.map((c) => CATEGORIES.find((x) => x.id === c)!.label), ...p.signatureStyle.tags, p.signatureStyle.title].join(' ').toLowerCase();
    if (!q.split(/\s+/).every((t) => hay.includes(t))) return false;
  }
  return true;
}

export function sortPhotographers(list: Photographer[], sort: SortKey): Photographer[] {
  const out = [...list];
  const score = (p: Photographer) => p.rating * Math.log10(p.reviewCount + 10) + (p.isNew ? 100 : 0); // new studios lead until they collect reviews
  if (sort === 'rating') out.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  else if (sort === 'price-asc') out.sort((a, b) => a.startingPrice - b.startingPrice);
  else if (sort === 'price-desc') out.sort((a, b) => b.startingPrice - a.startingPrice);
  else out.sort((a, b) => score(b) - score(a));
  return out;
}

export const getPhotographers = (f: Filters, sort: SortKey): Promise<Photographer[]> =>
  delay(sortPhotographers(PHOTOGRAPHERS.filter((p) => matches(p, f)), sort));
export const getPhotographer = (id: string): Promise<Photographer | undefined> => delay(rt(id)?.p ?? PHOTOGRAPHERS.find((p) => p.id === id));
export const getPhotographersByIds = (ids: string[]): Promise<Photographer[]> =>
  delay(ids.map((id) => PHOTOGRAPHERS.find((p) => p.id === id)).filter((p): p is Photographer => !!p));
export const getFeatured = (): Promise<Photographer[]> => delay(sortPhotographers(PHOTOGRAPHERS.filter((p) => p.featured), 'recommended'));
export const getPortfolio = (id: string, category?: CategoryId): Promise<PortfolioImage[]> =>
  delay(rt(id) ? rt(id)!.portfolio.filter((i) => !category || i.category === category) : PORTFOLIO.filter((i) => i.photographerId === id && (!category || i.category === category)));
export const getPackages = (id: string): Promise<Package[]> => delay(rt(id)?.packages ?? PACKAGES.filter((k) => k.photographerId === id));
export const countByCategory = (): Record<CategoryId, number> =>
  Object.fromEntries(CATEGORIES.map((c) => [c.id, PHOTOGRAPHERS.filter((p) => p.categories.includes(c.id)).length])) as Record<CategoryId, number>;

/** Synchronous count used by the filter sheet's live "Show N" button. */
export const getPhotographerCount = (f: Filters): number => PHOTOGRAPHERS.filter((p) => matches(p, f)).length;
