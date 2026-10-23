import type { CategoryId } from './types';
import { IMAGES } from './seed/images';
import { emptyDraft, newPackage, type Draft, type StoredImage } from './userProfiles';

/** Pre-filled onboarding draft for live demos: every step is valid, so the presenter can just tap Continue. */

const PORTRAIT = 'lead-callum-reid';
const PORTFOLIO: [string, CategoryId][] = [['17000487', 'weddings'], ['34415933', 'weddings'], ['29350113', 'weddings'], ['38951468', 'weddings']];

async function blobOf(id: string): Promise<Blob> {
  const res = await fetch(IMAGES[id].src);
  if (!res.ok) throw new Error(`demo image ${id} failed`);
  return res.blob();
}

export async function demoDraft(): Promise<Draft> {
  const d = emptyDraft();
  Object.assign(d, {
    name: 'Daniel Mercer', studio: 'Mercer & Light Weddings', city: 'Jaipur', area: 'C-Scheme', years: '12',
    categories: ['weddings'] as CategoryId[], styleTitle: 'Cinematic & warm', styleTags: ['Cinematic', 'Warm tones', 'Candid'],
    bio: 'Twelve years of weddings across Rajasthan, from palace courtyards to intimate home ceremonies. I work quietly, chase golden-hour light and deliver every gallery on time.',
    phone: '+91 98290 12345', whatsapp: '+91 98290 12345', email: 'hello@mercerandlight.example',
  });
  const m = IMAGES[PORTRAIT];
  d.portrait = { blob: await blobOf(PORTRAIT), w: m.w, h: m.h, fx: 0.5, fy: 0.36 };
  d.portfolio = await Promise.all(PORTFOLIO.map(async ([id, category]): Promise<StoredImage> => ({ id: `demo-${id}`, blob: await blobOf(id), w: IMAGES[id].w, h: IMAGES[id].h, category })));
  d.packages = [
    { ...newPackage(), name: 'Ceremony Essentials', price: '45000', hours: '6', photos: '300', album: false, previewHours: 48, galleryDays: 21, category: 'weddings' },
    { ...newPackage(), name: 'Full Wedding Day', price: '95000', hours: '12', photos: '700', album: true, previewHours: 48, galleryDays: 21, category: 'weddings' },
  ];
  return d;
}
