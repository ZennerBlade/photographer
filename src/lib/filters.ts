import type { CategoryId, City, Filters, MinRating, PriceBand, SortKey } from '../data/types';
import { CITIES } from '../data/seed/categories';

export const PRICE_BANDS: { id: PriceBand; label: string; min: number; max: number }[] = [
  { id: 'any', label: 'Any budget', min: 0, max: Infinity },
  { id: 'u25', label: 'Under ₹25,000', min: 0, max: 25000 },
  { id: '25-60', label: '₹25,000 to ₹60,000', min: 25000, max: 60000 },
  { id: '60-120', label: '₹60,000 to ₹1,20,000', min: 60000, max: 120000 },
  { id: '120p', label: '₹1,20,000 and above', min: 120000, max: Infinity },
];

export const RATINGS: { id: MinRating; label: string }[] = [
  { id: 0, label: 'Any' },
  { id: 4, label: '4.0+' },
  { id: 4.5, label: '4.5+' },
];

export const SORTS: { id: SortKey; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'rating', label: 'Rating, high to low' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
];

export const EMPTY_FILTERS: Filters = { categories: [], city: '', price: 'any', minRating: 0, q: '' };

const CATS: CategoryId[] = ['weddings', 'corporate', 'birthdays', 'portraits'];

export function parseQuery(qs: string | undefined): { filters: Filters; sort: SortKey } {
  const p = new URLSearchParams(qs ?? '');
  const categories = (p.get('cat') ?? '').split(',').filter((c): c is CategoryId => CATS.includes(c as CategoryId));
  const city = (CITIES as readonly string[]).includes(p.get('city') ?? '') ? (p.get('city') as City) : '';
  const price = PRICE_BANDS.some((b) => b.id === p.get('price')) ? (p.get('price') as PriceBand) : 'any';
  const r = Number(p.get('rating'));
  const minRating: MinRating = r >= 4.5 ? 4.5 : r >= 4 ? 4 : 0;
  const sort = SORTS.some((s) => s.id === p.get('sort')) ? (p.get('sort') as SortKey) : 'recommended';
  return { filters: { categories, city, price, minRating, q: p.get('q') ?? '' }, sort };
}

export function buildQuery(f: Filters, sort: SortKey): string {
  const p = new URLSearchParams();
  if (f.categories.length) p.set('cat', f.categories.join(','));
  if (f.city) p.set('city', f.city);
  if (f.price !== 'any') p.set('price', f.price);
  if (f.minRating) p.set('rating', String(f.minRating));
  if (f.q.trim()) p.set('q', f.q.trim());
  if (sort !== 'recommended') p.set('sort', sort);
  return p.toString();
}

export function activeFilterCount(f: Filters): number {
  return (f.categories.length ? 1 : 0) + (f.city ? 1 : 0) + (f.price !== 'any' ? 1 : 0) + (f.minRating ? 1 : 0);
}
