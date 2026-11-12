import type { SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';

const ECG =
  'M0 40 H300 l14 -6 l10 6 h20 l12 -32 l16 64 l12 -40 l10 8 h60 l12 -6 l12 6 H760 l14 -6 l10 6 h20 l12 -32 l16 64 l12 -40 l10 8 h60 l12 -6 l12 6 H1200';

/** The closing call to action card. The avatar uses --photo, supplied later by the user. */
export function FinalCta({ c, locale }: { c: SiteContent; locale: Locale }) {
  const f = c.final;
  return (
    <div className="wrap">
      <div className="final rv">
        <svg className="bg-ecg" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
          <path d={ECG} />
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
