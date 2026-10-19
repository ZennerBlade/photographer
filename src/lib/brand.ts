/** Single source of truth for the product name. A rename is a one-line change here (index.html, manifest, SW and UI read from it). */
export const BRAND = { first: 'Noor', last: 'Atelier' } as const;
export const BRAND_NAME = `${BRAND.first} ${BRAND.last}`;
export const BRAND_SHORT = BRAND.first;
export const BRAND_DESCRIPTION = 'Find and contact photographers across India by occasion.';
export const THEME = { bg: '#0d0b09', gold: '#d4b06a' } as const;
