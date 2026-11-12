import { WHATSAPP_NUMBER } from './site.ts';
import type { Locale } from './site.ts';

export type BookingContext = 'breast-check';

// The single booking seam: a future booking system replaces this function only.
export function bookingHref(locale: Locale, context?: BookingContext): string {
  const breast = context === 'breast-check';
  const message =
    locale === 'ur'
      ? `السلام علیکم۔ مجھے دعا ہسپتال میں ڈاکٹر زیب ریاض سے ${
          breast ? 'بریسٹ چیک اپ کے لیے ' : ''
        }اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:`
      : `Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital${
          breast ? ' for a breast check' : ''
        }.\nName:\nProblem:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function directionsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
