import { WHATSAPP_NUMBER } from './site.ts';
import type { Locale } from './site.ts';

// The single booking seam: a future booking system replaces this function only.
export function bookingHref(locale: Locale, clinicName?: string): string {
  const message =
    locale === 'ur'
      ? `السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے ${
          clinicName ? `${clinicName} میں ` : ''
        }اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:`
      : `Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz${
          clinicName ? ` at ${clinicName}` : ''
        }.\nName:\nProblem:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function directionsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
