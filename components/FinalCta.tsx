import type { SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';

/** The closing call to action band, with a slow champagne arc behind it (spec §3.10, §7.6). */
export function FinalCta({ c, locale }: { c: SiteContent; locale: Locale }) {
  const f = c.final;
  return (
    <div className="wrap">
      <div className="final rv">
        <svg className="bg-arc" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 190 C300 20 900 20 1220 190" />
        </svg>
        <div>
          <span className="av" aria-hidden="true" />
          <div>
            <h2>{f.heading}</h2>
            <p>{f.sub}</p>
          </div>
        </div>
        <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
          <Icon name="wa" />
          {f.cta}
          <Icon name="arrow" className="arr" />
        </a>
      </div>
    </div>
  );
}
