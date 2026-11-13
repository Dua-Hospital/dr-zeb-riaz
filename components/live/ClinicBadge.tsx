'use client';

import { getContent, type Clinic } from '@/lib/content';
import type { Locale } from '@/lib/site';
import { clinicLabel } from './clinicLabel';
import { dotClass, useKarachiNow } from './useKarachiNow';

/**
 * A clinic card's live badge. Neutral (the clinic's days, grey dot) until hydrated,
 * then the clinicState label. Takes `locale`, not `c`: content holds functions,
 * which cannot cross into a client component.
 */
export function ClinicBadge({ clinic, locale }: { clinic: Clinic; locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  const live = now ? clinicLabel(clinic, now, c, locale) : null;
  return (
    <span className="badge" data-state={live ? live.state : undefined}>
      <span className={dotClass(live ? live.state : 'off')} />
      <span>{live ? live.text : clinic.daysText[locale]}</span>
    </span>
  );
}
