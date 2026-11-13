'use client';

import { getContent, type Clinic } from '@/lib/content';
import type { Locale } from '@/lib/site';
import { useKarachiNow } from './useKarachiNow';

/** Mon..Sun day pills for a clinic: closed days greyed (`off`), today ringed after hydration only. */
export function WeekStrip({ clinic, locale }: { clinic: Clinic; locale: Locale }) {
  const c = getContent(locale);
  const now = useKarachiNow();
  return (
    <div className="week">
      {c.days.map((label, i) => {
        const day = (i + 1) % 7; // c.days is Mon..Sun; clinic.days and `now.day` are Sun..Sat
        const cls = [!clinic.days[day] && 'off', now?.day === day && 'today'].filter(Boolean).join(' ');
        return (
          <div key={label} className={cls || undefined}>
            {label}
          </div>
        );
      })}
    </div>
  );
}
