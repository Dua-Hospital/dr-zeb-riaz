import { CLINICS, DOCTOR, getContent, visibleCare } from './content.ts';
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

const pad = (n: number) => String(n).padStart(2, '0');
const prevMonth = (m: number) => (m === 1 ? 12 : m - 1);
const nextMonth = (m: number) => (m === 12 ? 1 : m + 1);
const lastDay = (m: number) => new Date(2001, m, 0).getDate(); // a non-leap year: Feb → 28

/** Schema.org recurring date range ("--MM-DD") for winter and for summer, from the winter months. */
function seasonRanges(winterMonths: readonly number[]) {
  const start = winterMonths.find((m) => !winterMonths.includes(prevMonth(m))) ?? 11;
  const end = winterMonths.find((m) => !winterMonths.includes(nextMonth(m))) ?? 3;
  const sStart = nextMonth(end);
  const sEnd = prevMonth(start);
  return {
    winter: { validFrom: `--${pad(start)}-01`, validThrough: `--${pad(end)}-${pad(lastDay(end))}` },
    summer: { validFrom: `--${pad(sStart)}-01`, validThrough: `--${pad(sEnd)}-${pad(lastDay(sEnd))}` },
  };
}

/**
 * Structured data (JSON-LD) for the page: one Physician and one
 * MedicalClinic (Dua Hospital) with winter and summer hours. No telephone: booking is WhatsApp only.
 */
export function buildPageSchema(locale: Locale) {
  const isUrdu = locale === 'ur';
  const content = getContent(locale);
  const pageUrl = `${SITE_URL}${isUrdu ? '/ur/' : '/'}`;
  const services = visibleCare().map((t) => ({
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
      medicalSpecialty: ['Obstetric', 'Gynecologic'],
    };
    {
      node.address = {
        '@type': 'PostalAddress',
        streetAddress: isUrdu ? c.address.ur : c.address.en,
        addressLocality: 'Multan',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      };
    }
    const ranges = seasonRanges(c.winterMonths);
    node.openingHoursSpecification = (['winter', 'summer'] as const).map((season) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES.filter((_, i) => c.days[i]),
      opens: hhmm(c.seasons[season].openMin),
      closes: hhmm(c.seasons[season].closeMin),
      ...ranges[season],
    }));
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
        medicalSpecialty: ['Obstetric', 'Gynecologic'],
        qualification: ['MBBS', 'FCPS (Obstetrics & Gynaecology)', 'MRCOG (UK)'],
        knowsLanguage: ['en', 'ur'],
        availableService: services,
        worksFor: clinics.map((c) => ({ '@id': c['@id'] })),
      },
      ...clinics,
    ],
  };
}
