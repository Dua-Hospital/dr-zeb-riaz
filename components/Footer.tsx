import { CLINICS, DOCTOR, SOCIALS, SOCIAL_NAMES, SOCIAL_NETWORKS, type SiteContent } from '@/lib/content';
import { bookingHref, directionsHref } from '@/lib/links';
import { DUA_HOSPITAL_URL, type Locale } from '@/lib/site';
import { Icon } from './icons';
import { navItems } from './nav/items';

/** A row of social icon links (new tab). Only the icons show; each link's name says whose account and where. */
function Socials({ who, urls, label }: { who: string; urls: Record<(typeof SOCIAL_NETWORKS)[number], string>; label: SiteContent['footer']['socialLabel'] }) {
  return (
    <div className="ft-social">
      {SOCIAL_NETWORKS.map((n) => (
        <a key={n} href={urls[n]} target="_blank" rel="noopener" aria-label={label(who, SOCIAL_NAMES[n])} title={SOCIAL_NAMES[n]}>
          <Icon name={n} />
        </a>
      ))}
    </div>
  );
}

// Section numbers match the section overlines, so they stay fixed even when Reviews (05) is hidden.
const NUMBERS: Record<string, string> = {
  '#about': '01',
  '#care': '02',
  '#clinic': '03',
  '#book': '04',
  '#reviews': '05',
  '#faq': '06',
};

/** The four-column footer (spec §3.11), endorsed by the Dua Hospital logo. No back-to-top link: the floating button does that. */
export function Footer({ c, locale }: { c: SiteContent; locale: Locale }) {
  const f = c.footer;
  const ur = locale === 'ur';
  const other = ur ? 'en' : 'ur';
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="ft-brand">
            <div className="ft-lockup">
              <img src="/brand/zeb-mark-reversed.svg" alt="" width={72} height={72} />
              <div>
                <div className="nm">{ur ? DOCTOR.nameUr : DOCTOR.name}</div>
                <small>{c.nav.role}</small>
              </div>
            </div>
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
            <div className="ft-follow">
              <h4>{f.follow.doctor}</h4>
              <Socials who={ur ? DOCTOR.nameUr : DOCTOR.name} urls={SOCIALS.doctor} label={f.socialLabel} />
            </div>
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
                {/* Dua Hospital's logo beside its name, its website beside Directions. */}
                <div className="ft-clinic-name">
                  <img src="/brand/dua-hospital-logo.svg" alt="" width={36} height={36} />
                  <b>{ur ? clinic.nameUr : clinic.name}</b>
                </div>
                <span>{c.clinics.otherSeason.winter(clinic.hoursText.winter)}</span>
                <span>{c.clinics.otherSeason.summer(clinic.hoursText.summer)}</span>
                <div className="ft-clinic-links">
                  <a href={directionsHref(clinic.mapsQuery)} target="_blank" rel="noopener">
                    <Icon name="nav" />
                    {c.clinics.directions}
                  </a>
                  <a href={DUA_HOSPITAL_URL} target="_blank" rel="noopener" aria-label={f.hospitalSiteLabel}>
                    <Icon name="globe" />
                    <bdi dir="ltr">{f.hospitalSite}</bdi>
                  </a>
                </div>
                {/* Dua Hospital's own accounts sit under its entry, as on Dr Hasan's site. */}
                <Socials who={f.follow.hospital} urls={SOCIALS.hospital} label={f.socialLabel} />
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
        {/* As on Dr Hasan's site: the copyright on its own. */}
        <div className="ft-bottom">
          <span>{f.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
