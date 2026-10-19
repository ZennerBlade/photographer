import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'weddings', label: 'Weddings', short: 'Weddings', blurb: 'Pheras, haldi, sangeet and the quiet moments in between.', cover: '16632447' },
  { id: 'corporate', label: 'Corporate events', short: 'Corporate', blurb: 'Conferences, launches, offsites and headshots.', cover: '35042459' },
  { id: 'birthdays', label: 'Birthdays / parties', short: 'Birthdays & parties', blurb: 'First birthdays to milestone nights.', cover: '22303852' },
  { id: 'portraits', label: 'Portraits / fashion', short: 'Portraits & fashion', blurb: 'Editorial, portfolio and personal-brand shoots.', cover: '13156801' },
];

export const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa'] as const;
