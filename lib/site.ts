// Central site config. Production domain confirmed 2026-11-14: drzebriaz.com (Vercel project dr-zeb-riaz, with www.drzebriaz.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drzebriaz.com';

export const WHATSAPP_NUMBER = '923358028888';

/** Dua Hospital's own website, linked from the footer (client-supplied 2026-11-14). */
export const DUA_HOSPITAL_URL = 'https://duahospital.pk';

export type Locale = 'en' | 'ur';
