import type { CategoryId, ImageMeta, Package, Photographer, PortfolioImage } from './types';
import { idbAll, idbDelete, idbGet, idbPut } from '../lib/idb';

/** Photographer-created demo profiles. Drafts and published profiles live in IndexedDB (images as downscaled Blobs). */

export interface StoredImage { id: string; blob: Blob; w: number; h: number; category: CategoryId }
export interface StoredPortrait { blob: Blob; w: number; h: number; fx: number; fy: number }
export interface DraftPackage { key: string; name: string; price: string; hours: string; photos: string; album: boolean; previewHours: number; galleryDays: number; category: CategoryId | '' }

export interface Draft {
  step: number;
  editingId: string;
  name: string;
  studio: string;
  city: string; // seed city, 'Other' or ''
  cityOther: string;
  area: string;
  years: string;
  categories: CategoryId[];
  styleTitle: string;
  styleTags: string[];
  portrait: StoredPortrait | null;
  portfolio: StoredImage[];
  bio: string;
  packages: DraftPackage[];
  phone: string;
  whatsapp: string;
  waTouched: boolean;
  email: string;
}

export interface StoredProfile { id: string; createdAt: number; updatedAt: number; draft: Draft }

export interface Runtime {
  p: Photographer;
  portfolio: PortfolioImage[];
  packages: Package[];
  images: Record<string, ImageMeta>;
  stored: StoredProfile;
}

export const newPackage = (): DraftPackage => ({ key: Math.random().toString(36).slice(2, 8), name: '', price: '', hours: '', photos: '', album: false, previewHours: 48, galleryDays: 21, category: '' });
export const emptyDraft = (): Draft => ({
  step: 1, editingId: '', name: '', studio: '', city: '', cityOther: '', area: '', years: '', categories: [], styleTitle: '', styleTags: [],
  portrait: null, portfolio: [], bio: '', packages: [newPackage()], phone: '', whatsapp: '', waTouched: false, email: '',
});

export const STYLE_TITLES = ['Candid & natural', 'Cinematic & warm', 'Bright & airy', 'Classic & timeless'];
export const STYLE_TAGS = ['Candid', 'Cinematic', 'Warm tones', 'Documentary', 'Editorial', 'Natural light', 'Bright & airy', 'Moody', 'Traditional', 'Black & white', 'Drone', 'Family-friendly'];
export const PREVIEW_HOURS = [24, 48, 72];
export const GALLERY_DAYS = [7, 14, 21, 30, 45];
export const BIO_MAX = 600;
export const BIO_MIN = 40;
export const PREVIEW_ID = 'preview-draft';
const NEW_DAYS = 30;

/* ---------- helpers ---------- */
export const cityOf = (d: Draft) => (d.city === 'Other' ? d.cityOther.trim() : d.city);
export const studioOf = (d: Draft) => d.studio.trim() || `${d.name.trim()} Photography`;
export const digits = (s: string) => s.replace(/\D/g, '');
/** Accepts 9876543210, +91 98765 43210, 098765-43210. Returns "+91 98765 43210" or '' if invalid. */
export function normalisePhone(s: string): string {
  let n = digits(s);
  if (n.length === 12 && n.startsWith('91')) n = n.slice(2);
  else if (n.length === 11 && n.startsWith('0')) n = n.slice(1);
  return /^[6-9]\d{9}$/.test(n) ? `+91 ${n.slice(0, 5)} ${n.slice(5)}` : '';
}
export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
const slug = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'studio';
export const newId = (d: Draft) => `${slug(studioOf(d))}-${Math.random().toString(36).slice(2, 6)}`;

/* ---------- validation: one function per step, friendly plain-words messages ---------- */
export type Errors = Record<string, string>;
export function validate(step: number, d: Draft): Errors {
  const e: Errors = {};
  const num = (s: string) => (s.trim() === '' ? NaN : Number(s.replace(/,/g, '')));
  if (step === 1) {
    if (d.name.trim().length < 2) e.name = 'Please tell us your name, so clients know who to ask for.';
    if (!d.city) e.city = 'Please choose the city where you work.';
    else if (d.city === 'Other' && d.cityOther.trim().length < 2) e.cityOther = 'Please type the name of your city or town.';
    const y = num(d.years);
    if (d.years.trim() === '' || !Number.isFinite(y)) e.years = 'Please enter how many years you have been shooting. Type 0 if you are just starting.';
    else if (y < 0 || y > 60 || !Number.isInteger(y)) e.years = 'Please enter a whole number between 0 and 60.';
  } else if (step === 2) {
    if (!d.categories.length) e.categories = 'Please pick at least one kind of photography you do.';
    if (d.styleTitle.trim().length < 3) e.styleTitle = 'Please give your style a short name, for example "Candid & natural".';
  } else if (step === 3) {
    if (!d.portrait) e.portrait = 'Please add a photo of yourself. It is the first thing clients see.';
  } else if (step === 4) {
    if (d.portfolio.length < 3) e.portfolio = `Please add at least 3 photos. You have ${d.portfolio.length} so far.`;
  } else if (step === 5) {
    if (d.bio.trim().length < BIO_MIN) e.bio = `Please write a little more, at least ${BIO_MIN} letters. You have ${d.bio.trim().length}.`;
  } else if (step === 6) {
    d.packages.forEach((k, i) => {
      const price = num(k.price), hours = num(k.hours), photos = num(k.photos);
      if (k.name.trim().length < 2) e[`name${i}`] = 'Please give this package a name, for example "Essential".';
      if (!Number.isFinite(price) || price < 500) e[`price${i}`] = 'Please enter the price in rupees, for example 45000.';
      else if (price > 5_000_000) e[`price${i}`] = 'That looks too high. Please check the price.';
      if (!Number.isFinite(hours) || hours < 1 || hours > 72) e[`hours${i}`] = 'Please enter how many hours you shoot, from 1 to 72.';
      if (!Number.isFinite(photos) || photos < 5 || photos > 10000) e[`photos${i}`] = 'Please enter how many edited photos they get, for example 300.';
    });
  } else if (step === 7) {
    if (!normalisePhone(d.phone)) e.phone = 'Please enter a 10-digit mobile number, for example 98765 43210.';
    if (!normalisePhone(d.whatsapp)) e.whatsapp = 'Please enter a 10-digit WhatsApp number, or use the same as your phone.';
    if (!validEmail(d.email)) e.email = 'Please enter an email address like name@example.com.';
  }
  return e;
}
export const firstInvalidStep = (d: Draft): number => {
  for (let s = 1; s <= 7; s++) if (Object.keys(validate(s, d)).length) return s;
  return 0;
};

/** Image metadata for the lead portrait: the chosen focal point plus a face-sized box so every crop keeps the face whole. */
export function leadMeta(src: string, pt: StoredPortrait, alt: string): ImageMeta {
  const c = (n: number) => Math.min(1, Math.max(0, n));
  return { src, w: pt.w, h: pt.h, alt, focus: `${Math.round(pt.fx * 100)}% ${Math.round(pt.fy * 100)}%`, box: [c(pt.fx - 0.16), c(pt.fy - 0.16), c(pt.fx + 0.16), c(pt.fy + 0.18)] };
}

/* ---------- Draft -> runtime shapes the rest of the app already understands ---------- */
export function build(id: string, d: Draft, createdAt: number, updatedAt = createdAt): Runtime {
  const url = (b: Blob) => URL.createObjectURL(b);
  const images: Record<string, ImageMeta> = {};
  const leadId = `u-${id}-lead`;
  if (d.portrait) {
    images[leadId] = leadMeta(url(d.portrait.blob), d.portrait, `${d.name.trim()}, photographer`);
  }
  const portfolio: PortfolioImage[] = d.portfolio.map((im, i) => {
    const iid = `u-${id}-${i + 1}`;
    images[iid] = { src: url(im.blob), w: im.w, h: im.h, focus: '50% 40%', alt: `Photograph by ${d.name.trim()}` };
    return { id: `${id}-p${i + 1}`, photographerId: id, category: im.category, image: iid };
  });
  const first = d.categories[0] ?? 'portraits';
  const packages: Package[] = d.packages.map((k, i) => ({
    id: `${id}-pk${i + 1}`, photographerId: id, name: k.name.trim(), category: (k.category && d.categories.includes(k.category) ? k.category : first), price: Number(k.price.replace(/,/g, '')),
    duration: `${Number(k.hours)} hours`,
    deliverables: [
      `${Number(k.photos).toLocaleString('en-IN')} edited photos`,
      k.album ? 'Printed album included' : 'Online gallery, no album',
      `Preview photos in ${k.previewHours} hours`,
      `Full gallery in ${k.galleryDays} days`,
    ],
  }));
  const city = cityOf(d);
  const p: Photographer = {
    id, name: studioOf(d), tagline: d.styleTitle.trim(), heroImage: leadId, leadName: d.name.trim(), leadImage: leadId,
    city, area: d.area.trim() || 'Citywide', categories: d.categories, rating: 0, reviewCount: 0,
    startingPrice: Math.min(...packages.map((k) => k.price)),
    about: d.bio.trim(), signatureStyle: { title: d.styleTitle.trim(), bullets: [], tags: d.styleTags },
    contact: { phone: normalisePhone(d.phone), whatsapp: normalisePhone(d.whatsapp), email: d.email.trim() },
    yearsExperience: Number(d.years), isNew: Date.now() - createdAt < NEW_DAYS * 864e5, mine: true,
  };
  return { p, portfolio, packages, images, stored: { id, createdAt, updatedAt, draft: d } };
}

/* ---------- persistence (all failure-tolerant: callers never see exceptions) ---------- */
const DRAFT_KEY = 'current';
export const saveDraft = (d: Draft) => idbPut('drafts', DRAFT_KEY, d);
export const loadDraft = async (): Promise<Draft | null> => {
  try {
    const d = await idbGet<Draft>('drafts', DRAFT_KEY);
    return d ? { ...emptyDraft(), ...d } : null;
  } catch { return null; }
};
export const clearDraft = () => idbDelete('drafts', DRAFT_KEY);

export async function publish(d: Draft): Promise<{ id: string; saved: boolean }> {
  const id = d.editingId || newId(d);
  const prev = d.editingId ? await idbGet<StoredProfile>('profiles', id) : undefined;
  const rec: StoredProfile = { id, createdAt: prev?.createdAt ?? Date.now(), updatedAt: Date.now(), draft: { ...d, editingId: id, step: 8 } };
  const saved = await idbPut('profiles', id, rec);
  await clearDraft();
  return { id, saved };
}
export const removeProfile = (id: string) => idbDelete('profiles', id);
export async function loadProfiles(): Promise<Runtime[]> {
  try {
    const all = await idbAll<StoredProfile>('profiles');
    return all.filter((r) => r?.draft?.portrait).map((r) => build(r.id, { ...emptyDraft(), ...r.draft }, r.createdAt, r.updatedAt)).sort((a, b) => b.stored.createdAt - a.stored.createdAt);
  } catch { return []; }
}
