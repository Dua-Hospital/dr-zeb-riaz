'use client';

import { useEffect } from 'react';

/** Opts the page into the `.js .rv` reveal and adds `in` as each `.rv` scrolls into view. */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    // Mark what is already on screen before `js` arrives, so it never dips to opacity 0.
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    });
    document.documentElement.classList.add('js');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
