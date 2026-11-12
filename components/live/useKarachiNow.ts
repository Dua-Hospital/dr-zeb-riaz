'use client';

import { useEffect, useState } from 'react';
import { karachiParts } from '@/lib/clinic-status';

/**
 * Pakistan-time day (0 = Sunday) and minutes since midnight, refreshed every 60s.
 * `null` during SSR and the first client render, so the static HTML stays neutral
 * and hydration matches.
 */
export function useKarachiNow(): { day: number; minutes: number } | null {
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
  useEffect(() => {
    const tick = () => setNow(karachiParts(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export type LiveState = 'open' | 'later' | 'off';

/** The dot classes from the mockup: green open, amber later, grey closed. */
export function dotClass(s: LiveState): string {
  return s === 'open' ? 'live' : s === 'later' ? 'live later' : 'live off';
}
