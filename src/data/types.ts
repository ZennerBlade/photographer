export type CategoryId = 'weddings' | 'corporate' | 'birthdays' | 'portraits';
export type City = 'Mumbai' | 'Delhi' | 'Bengaluru' | 'Jaipur' | 'Goa';
export type SortKey = 'recommended' | 'rating' | 'price-asc' | 'price-desc';
export type MinRating = 0 | 4 | 4.5;
/** Starting-price band ids. See PRICE_BANDS in lib/filters.ts */
export type PriceBand = 'any' | 'u25' | '25-60' | '60-120' | '120p';

export interface ImageMeta {
  src: string;
  /** natural size of the stored file */
  w: number;
  h: number;
  /** union of all detected faces incl. head room, [x0,y0,x1,y1] as 0..1 fractions. Crops are shifted to keep it whole when possible. */
  box?: [number, number, number, number];
  /** focal point (face / subject centre) as "x% y%". Applied to every crop via lib/focus.ts */
  focus: string;
  alt: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
  cover: string; // image id
}

export interface Contact {
  phone: string;
  whatsapp: string;
  email: string;
}

export interface Photographer {
  id: string;
  name: string;
  tagline: string;
  heroImage: string; // image id (portfolio hero)
  /** The person who leads the studio and the portrait that represents it on cards and the profile hero. */
  leadName: string;
  leadImage: string; // image id
  city: City | (string & {});
  area: string;
  categories: CategoryId[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  about: string;
  signatureStyle: { title: string; bullets: string[]; tags: string[] };
  contact: Contact;
  yearsExperience: number;
  featured?: boolean;
  /** Created through the onboarding flow (demo, stored in this browser). */
  mine?: boolean;
  /** Shows the "New" badge. */
  isNew?: boolean;
}

export interface PortfolioImage {
  id: string;
  photographerId: string;
  category: CategoryId;
  image: string; // image id
}

export interface Package {
  id: string;
  photographerId: string;
  name: string;
  category: CategoryId;
  price: number;
  duration: string;
  deliverables: string[];
  popular?: boolean;
}

export interface Filters {
  categories: CategoryId[];
  city: City | '';
  price: PriceBand;
  minRating: MinRating;
  q: string;
}
