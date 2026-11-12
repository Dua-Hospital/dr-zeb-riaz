import { CLINICS, DOCTOR, TREATMENTS, getContent } from './content.ts';
import { SITE_URL } from './site.ts';
import type { Locale } from './site.ts';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/** Minutes since midnight -> 24-hour "HH:MM". */
function hhmm(min: number): string {
  const h = String(Math.floor(min / 60)).padStart(2, '0');
  const m = String(min % 60).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Structured data (JSON-LD) for the page: one Physician and one
 * MedicalClinic per clinic. No telephone: booking is WhatsApp only.
 */
export function buildPageSchema(locale: Locale) {
  const isUrdu = locale === 'ur';
  const content = getContent(locale);
  const pageUrl = `${SITE_URL}${isUrdu ? '/ur/' : '/'}`;
  const services = TREATMENTS.map((t) => ({
    '@type': 'MedicalTherapy',
    name: isUrdu ? t.nameUr : t.name,
  }));

  const clinics = CLINICS.map((c) => {
    const node: Record<string, unknown> = {
      '@type': 'MedicalClinic',
      '@id': `${pageUrl}#${c.id}`,
      name: isUrdu ? c.nameUr : c.name,
      alternateName: isUrdu ? c.name : c.nameUr,
      url: pageUrl,
      medicalSpecialty: 'InternalMedicine',
    };
    if (c.address) {
      node.address = {
        '@type': 'PostalAddress',
        streetAddress: isUrdu ? c.address.ur : c.address.en,
        addressLocality: 'Multan',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      };
    }
    node.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_NAMES.filter((_, i) => c.days[i]),
        opens: hhmm(c.openMin),
        closes: hhmm(c.closeMin),
      },
    ];
    node.availableService = services;
    return node;
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: DOCTOR.name,
        alternateName: DOCTOR.nameUr,
        url: pageUrl,
        inLanguage: isUrdu ? 'ur-PK' : 'en-PK',
      },
      {
        '@type': 'Physician',
        '@id': `${pageUrl}#physician`,
        name: DOCTOR.name,
        alternateName: DOCTOR.nameUr,
        description: content.meta.description,
        url: pageUrl,
        medicalSpecialty: 'InternalMedicine',
        qualification: ['MBBS', 'FCPS (Medicine)'],
        knowsLanguage: ['en', 'ur'],
        availableService: services,
        worksFor: clinics.map((c) => ({ '@id': c['@id'] })),
      },
      ...clinics,
    ],
  };
}
