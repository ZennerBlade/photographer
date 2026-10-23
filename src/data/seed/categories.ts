import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'weddings', label: 'Weddings', short: 'Weddings', blurb: 'Pheras, haldi, sangeet and the quiet moments in between.', cover: '4138802' },
  { id: 'corporate', label: 'Corporate events', short: 'Corporate', blurb: 'Conferences, launches, offsites and headshots.', cover: '8348468' },
  { id: 'birthdays', label: 'Birthdays / parties', short: 'Birthdays & parties', blurb: 'First birthdays to milestone nights.', cover: '8104171' },
  { id: 'portraits', label: 'Portraits / fashion', short: 'Portraits & fashion', blurb: 'Editorial, portfolio and personal-brand shoots.', cover: '7227990' },
];

export const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa'] as const;
