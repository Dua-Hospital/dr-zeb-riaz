import { CLINICS, DOCTOR, type SiteContent } from '@/lib/content';
import { bookingHref, directionsHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { navItems } from './nav/items';

// Section numbers match the section overlines, so they stay fixed even when Reviews (05) is hidden.
const NUMBERS: Record<string, string> = {
  '#doctor': '01',
  '#treatments': '02',
  '#clinics': '03',
  '#book': '04',
  '#reviews': '05',
  '#faq': '06',
};

/** The four-column footer (spec §3.11). No back-to-top link: the floating button does that. */
export function Footer({ c, locale }: { c: SiteContent; locale: Locale }) {
  const f = c.footer;
  const ur = locale === 'ur';
  const other = ur ? 'en' : 'ur';
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="ft-brand">
            <div className="nm">{ur ? DOCTOR.nameUr : DOCTOR.name}</div>
            <p>
              {f.tagline1}
              <br />
              {f.tagline2}
            </p>
            {!ur && (
              <span className="ur" lang="ur">
                {DOCTOR.nameUr}
              </span>
            )}
            <a className="btn wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {c.nav.cta}
            </a>
          </div>
          <nav className="ft-links" aria-label={f.onPage}>
            <h4>{f.onPage}</h4>
            {navItems(c).map((i) => (
              <a key={i.href} href={i.href}>
                <span className="n">{NUMBERS[i.href]}</span>
                {i.label}
              </a>
            ))}
          </nav>
          <div>
            <h4>{f.clinicsHeading}</h4>
            {CLINICS.map((clinic) => (
              <div className="ft-clinic" key={clinic.id}>
                <b>{ur ? clinic.nameUr : clinic.name}</b>
                <span dir="ltr">{clinic.hoursText}</span>
                <a href={directionsHref(clinic.mapsQuery)} target="_blank" rel="noopener">
                  <Icon name="nav" />
                  {c.clinics.directions}
                </a>
              </div>
            ))}
            <div className="ft-note">{c.hero.note}</div>
          </div>
          <div className="ft-links">
            <h4>{f.help}</h4>
            <a className="wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {c.nav.cta}
            </a>
            <a href="#faq">
              <Icon name="chat" />
              {f.questions}
            </a>
            <a href={ur ? '/' : '/ur/'} lang={other} hrefLang={other}>
              <Icon name="globe" />
              {f.urduLink}
            </a>
            <div className="ft-emerg">
              <b>{f.emergency.title}</b> {f.emergency.body}
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <span>{f.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
