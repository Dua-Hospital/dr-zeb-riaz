// Central site config — update SITE_URL when the production domain is final (spec §10, open item 5).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drzebriaz.pk';

export const WHATSAPP_NUMBER = '923358028888';

export type Locale = 'en' | 'ur';
