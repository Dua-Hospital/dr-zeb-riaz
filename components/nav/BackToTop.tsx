'use client';

import { useEffect, useRef, useState } from 'react';
import { ringOffset } from '@/lib/scroll';
import { smoothTo } from './smoothTo';

const ARROW = '<path d="M12 19V5M5 12l7-7 7 7"/>';

/** Floating back-to-top button whose ring fills with reading progress (spec §7.5). */
export function BackToTop({ label }: { label: string }) {
  const bar = useRef<SVGCircleElement>(null);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (bar.current) bar.current.style.strokeDashoffset = ringOffset(p).toFixed(2);
      setShow(window.scrollY > 600);
      setDone(p > 0.995);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const onClick = () => {
    smoothTo(0);
    history.replaceState(null, '', '#top');
    document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
  };

  return (
    <button
      className={`to-top${show ? ' show' : ''}${done ? ' done' : ''}`}
      type="button"
      aria-label={label}
      tabIndex={show ? undefined : -1}
      onClick={onClick}
    >
      <svg className="ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle className="track" cx="28" cy="28" r="25" />
        <circle className="bar" ref={bar} cx="28" cy="28" r="25" />
      </svg>
      <svg
        className="i arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: ARROW }}
      />
    </button>
  );
}
