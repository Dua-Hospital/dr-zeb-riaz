'use client';

import { useEffect } from 'react';
import { headerOffset, smoothTo } from './smoothTo';

/**
 * Eased in-page scrolling for every `href="#…"` link, and the active-section
 * highlight (`aria-current`) on the header and mobile-menu links. Renders nothing.
 */
export function SmoothNav() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href') ?? '';
      if (id === '#') return;
      const el = document.getElementById(decodeURIComponent(id.slice(1)));
      if (!el && id !== '#top') return;
      e.preventDefault();
      history.replaceState(null, '', id);
      // preventDefault skips the browser's focus move: move focus to the target ourselves once
      // the scroll lands (skipped if the user cancelled the scroll).
      smoothTo(id === '#top' || !el ? 0 : el.getBoundingClientRect().top + window.scrollY - headerOffset(), () => {
        if (!el) return;
        if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      });
    };
    document.addEventListener('click', onClick);

    const links = () => document.querySelectorAll<HTMLAnchorElement>('.nav-links a, .menu a[href^="#"]');
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const target = `#${e.target.id}`;
          links().forEach((a) => {
            if (a.getAttribute('href') === target) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

    return () => {
      document.removeEventListener('click', onClick);
      spy.disconnect();
    };
  }, []);

  return null;
}
