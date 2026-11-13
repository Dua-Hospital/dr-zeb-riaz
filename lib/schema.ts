import { activeSeason, karachiParts } from './clinic-status.ts';
import type { SeasonId } from './clinic-status.ts';
import { CLINICS, DOCTOR, getContent, visibleCare, SOCIALS, SOCIAL_NETWORKS } from './content.ts';
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
const lastDay = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();
type YM = { y: number; m: number };
const prev = ({ y, m }: YM): YM => (m === 1 ? { y: y - 1, m: 12 } : { y, m: m - 1 });
const next = ({ y, m }: YM): YM => (m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 });

/**
 * The season in force at `now` (Pakistan time) and the one after it, as real ISO date ranges
 * for schema.org `validFrom` / `validThrough`. Recomputed on every build.
 */
function seasonPeriods(winterMonths: readonly number[], now: Date) {
  const { month } = karachiParts(now);
  const year = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', year: 'numeric' }).format(now));
  const period = (from: YM) => {
    const season: SeasonId = activeSeason(from.m, winterMonths);
    let a = from;
    while (activeSeason(prev(a).m, winterMonths) === season && prev(a).m !== from.m) a = prev(a);
    let b = from;
    while (activeSeason(next(b).m, winterMonths) === season && next(b).m !== a.m) b = next(b);
    return { season, end: b, validFrom: `${a.y}-${pad(a.m)}-01`, validThrough: `${b.y}-${pad(b.m)}-${pad(lastDay(b.y, b.m))}` };
  };
  const current = period({ y: year, m: month });
  const following = period(next(current.end));
  return [current, following];
}

/**
 * Structured data (JSON-LD) for the page: one Physician and one
 * MedicalClinic (Dua Hospital) with winter and summer hours. No telephone: booking is WhatsApp only.
 */
export function buildPageSchema(locale: Locale, now: Date = new Date()) {
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
      sameAs: SOCIAL_NETWORKS.map((n) => SOCIALS.hospital[n]),
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
    node.openingHoursSpecification = seasonPeriods(c.winterMonths, now).map(({ season, validFrom, validThrough }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES.filter((_, i) => c.days[i]),
      opens: hhmm(c.seasons[season].openMin),
      closes: hhmm(c.seasons[season].closeMin),
      validFrom,
      validThrough,
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
        sameAs: SOCIAL_NETWORKS.map((n) => SOCIALS.doctor[n]),
        availableService: services,
        worksFor: clinics.map((c) => ({ '@id': c['@id'] })),
      },
      ...clinics,
    ],
  };
}
