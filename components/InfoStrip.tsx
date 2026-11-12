import type { CSSProperties } from 'react';
import type { IconName, SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';

const ICONS: readonly IconName[] = ['cal', 'clock', 'steth', 'wa'];

/** The four clickable info cards under the hero (spec §3.2). */
export function InfoStrip({ c, locale }: { c: SiteContent; locale: Locale }) {
  return (
    <div className="ribbon">
      {c.info.map((item, i) => {
        const wa = item.target === 'whatsapp';
        return (
          <a
            key={item.title}
            className={`card rb rv${wa ? ' wa-link' : ''}`}
            style={{ '--d': `${(i + 1) * 0.05}s` } as CSSProperties}
            href={wa ? bookingHref(locale) : item.target}
            {...(wa ? { target: '_blank', rel: 'noopener' } : {})}
          >
            <span className="ic">
              <Icon name={ICONS[i] ?? 'chev'} />
            </span>
            <div>
              <b>{item.title}</b>
              <span>{item.sub}</span>
            </div>
            <Icon name="chev" className="go" />
          </a>
        );
      })}
    </div>
  );
}
