'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/site';
import { bookingHref } from '@/lib/links';
import { Icon } from '../icons';
import { navItems } from './items';

/**
 * The header bar (`.nav-in`, holding the server-rendered `children` plus the ☰ button)
 * and the dropdown `.menu` panel shown at ≤1180px. Closes on a link click, on Escape,
 * or when resized to desktop (>= 1181px).
 */
export function MobileMenu({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getContent(locale);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      burger.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Auto-close menu if resized to desktop view
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1181px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <div className="nav-in">
        {children}
        <button
          ref={burger}
          className="burger"
          type="button"
          aria-label={c.nav.menu}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <nav
        className={`menu${open ? ' open' : ''}`}
        id="menu"
        aria-label={c.nav.menu}
        onClick={(e) => {
          if ((e.target as Element).closest('a')) setOpen(false);
        }}
      >
        {navItems(c).map((i) => (
          <a key={i.href} href={i.href}>
            {i.label}
          </a>
        ))}
        <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
          <Icon name="wa" />
          {c.nav.cta}
        </a>
      </nav>
    </>
  );
}
