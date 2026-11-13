'use client';

import { getContent, type Clinic } from '@/lib/content';
import { activeSeason, type SeasonId } from '@/lib/clinic-status';
import type { Locale } from '@/lib/site';
import { useKarachiNow } from './useKarachiNow';

const ORDER: readonly SeasonId[] = ['winter', 'summer'];

/**
 * The clinic card's hours (spec §7.2). The exported HTML lists both seasons equally; after
 * hydration the season in force is shown large and the other one below it.
 */
export function SeasonHours({ clinic, locale }: { clinic: Clinic; locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  if (!now) {
    return (
      <div className="cl-time">
        {ORDER.map((s) => (
          <span key={s} className="cl-season">
            {c.clinics.otherSeason[s](clinic.hoursText[s])}
          </span>
        ))}
        <span>{clinic.daysText[locale]}</span>
      </div>
    );
  }
  const season = activeSeason(now.month, clinic.winterMonths);
  const other: SeasonId = season === 'winter' ? 'summer' : 'winter';
  return (
    <div className="cl-time">
      <small className="cl-label">{c.clinics.seasonLabel[season]}</small>
      <b dir="ltr">{clinic.hoursText[season]}</b>
      <span>{clinic.daysText[locale]}</span>
      <span className="cl-season">{c.clinics.otherSeason[other](clinic.hoursText[other])}</span>
    </div>
  );
}
