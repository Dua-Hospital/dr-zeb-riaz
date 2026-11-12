'use client';

import { CARE, getContent } from '@/lib/content';
import { showPinkOctober } from '@/lib/campaign';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from '../icons';
import { useKarachiNow } from './useKarachiNow';

/**
 * The Pink October band between Care and Clinic (spec §7.5). Renders nothing in the exported
 * HTML; after hydration it appears only in October (Pakistan time) and only once breast checks
 * are a confirmed service.
 */
export function PinkOctober({ locale }: { locale: Locale }) {
  const now = useKarachiNow();
  if (!now || !showPinkOctober(now.month, CARE)) return null;
  const p = getContent(locale).pinkOctober;
  return (
    <div className="wrap">
      <aside className="pink" aria-labelledby="pink-h">
        <span className="pink-ic">
          <Icon name="ribbon" />
        </span>
        <div>
          <span className="pink-over">{p.overline}</span>
          <h2 id="pink-h">{p.heading}</h2>
          <p>{p.body}</p>
        </div>
        <a className="btn btn-pink wa-link" href={bookingHref(locale, 'breast-check')} target="_blank" rel="noopener">
          <Icon name="wa" />
          {p.cta}
        </a>
      </aside>
    </div>
  );
}
