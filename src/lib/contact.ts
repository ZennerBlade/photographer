import type { Package, Photographer } from '../data/types';

const digits = (s: string) => s.replace(/\D/g, '');

function message(p: Photographer, pkg?: Package): string {
  const base = `Hi ${p.name}, I found you on Noor Atelier and would like to enquire about your photography services.`;
  return pkg ? `${base} I am interested in the ${pkg.name} package.` : base;
}

export const telUrl = (p: Photographer): string => `tel:${p.contact.phone.replace(/[^\d+]/g, '')}`;
export const whatsappUrl = (p: Photographer, pkg?: Package): string =>
  `https://wa.me/${digits(p.contact.whatsapp)}?text=${encodeURIComponent(message(p, pkg))}`;
export const mailUrl = (p: Photographer, pkg?: Package): string =>
  `mailto:${p.contact.email}?subject=${encodeURIComponent(`Photography enquiry${pkg ? `: ${pkg.name}` : ''}`)}&body=${encodeURIComponent(message(p, pkg))}`;
