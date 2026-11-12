import type { SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';

/** Phone-only bottom dock: jump to timings, or book. Shown by CSS under 760px. */
export function MobileDock({ c, locale }: { c: SiteContent; locale: Locale }) {
  return (
    <div className="dock">
      <a className="btn btn-ghost" href="#clinics">
        <Icon name="clock" />
        {c.dock.timings}
      </a>
      <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
        <Icon name="wa" />
        {c.dock.book}
      </a>
    </div>
  );
}
