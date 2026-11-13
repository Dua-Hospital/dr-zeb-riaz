'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import type { CareGroup } from '@/lib/content';

type Key = 'all' | CareGroup;

/** Filter tabs. Cards are server-rendered; this only toggles `hide` / `filtered` on the DOM. */
export function CareTabs({
  groups,
  labels,
  counts,
}: {
  groups: readonly Key[];
  labels: Record<string, string>;
  counts: Record<string, number>;
}) {
  const [active, setActive] = useState<Key>('all');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (key: Key, focus = false) => {
    setActive(key);
    const grid = document.getElementById('tx');
    if (grid) {
      grid.classList.toggle('filtered', key !== 'all');
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      grid.querySelectorAll<HTMLElement>('.tx[data-c]').forEach((card) => {
        const on = key === 'all' || card.dataset.c === key;
        card.classList.toggle('hide', !on);
        if (on && !calm && typeof card.animate === 'function') {
          card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
        }
      });
    }
    if (focus) refs.current[groups.indexOf(key)]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const i = groups.indexOf(active);
    const last = groups.length - 1;
    let next: number;
    if (e.key === 'ArrowRight') next = rtl ? i - 1 : i + 1;
    else if (e.key === 'ArrowLeft') next = rtl ? i + 1 : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    next = Math.min(last, Math.max(0, next));
    select(groups[next], true);
  };

  return (
    <div className="tabs rv" role="tablist" id="tabs" onKeyDown={onKeyDown}>
      {groups.map((k, i) => (
        <button
          key={k}
          type="button"
          role="tab"
          aria-selected={active === k}
          tabIndex={active === k ? 0 : -1}
          data-f={k}
          ref={(el) => {
            refs.current[i] = el;
          }}
          onClick={() => select(k)}
        >
          {labels[k]}
          <span className="ct">{counts[k]}</span>
        </button>
      ))}
    </div>
  );
}
