import type { IconName } from '@/lib/content';

/* 24x24 stroke icons; inner SVG markup is static (ported from the design mockup). */
const PATHS: Record<IconName, string> = {
  egg: '<path d="M12 3c-3.6 0-6.5 5.2-6.5 10a6.5 6.5 0 0 0 13 0C18.5 8.2 15.6 3 12 3z"/><circle cx="12" cy="14" r="2"/>',
  sperm: '<circle cx="8" cy="8" r="3"/><path d="M10.2 10.2c1.6 1.6 1 3.8 2.6 5.4s3.8 1 5.4 2.6"/><path d="M18.2 18.2 21 21"/>',
  pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 8.5A2.3 2.3 0 0 0 7 21h10a2.3 2.3 0 0 0 2-3.5L14 9V3"/><path d="M7.5 15h9"/>',
  dish: '<ellipse cx="12" cy="14" rx="9" ry="4"/><path d="M3 14v1c0 2.2 4 4 9 4s9-1.8 9-4v-1"/><circle cx="12" cy="13" r="1.5"/><path d="M12 4v5"/>',
  pregnant: '<circle cx="11" cy="4" r="2"/><path d="M10 8c-1.5 1-2 3-2 5v8"/><path d="M12 8c3 .5 5 3 5 6s-2 4-5 4"/><path d="M12 21v-3"/>',
  baby: '<circle cx="12" cy="9" r="5"/><path d="M10 8h.01M14 8h.01M10.5 11a2 2 0 0 0 3 0"/><path d="M7 20c.5-3 2.5-5 5-5s4.5 2 5 5"/>',
  drop: '<path d="M12 21a6 6 0 0 0 6-6c0-3.5-6-12-6-12S6 11.5 6 15a6 6 0 0 0 6 6z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
  uterus: '<path d="M12 21v-5"/><path d="M8 12c0 2.2 1.8 4 4 4s4-1.8 4-4V8a4 4 0 0 0-8 0z"/><path d="M8 9C6 9 4.5 7.5 4 5.5M16 9c2 0 3.5-1.5 4-3.5"/><circle cx="3.5" cy="4.5" r="1.5"/><circle cx="20.5" cy="4.5" r="1.5"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  ribbon: '<path d="M12 3a3.5 3.5 0 0 0-3.5 3.5c0 2 1.6 4.3 3.5 6.8 1.9-2.5 3.5-4.8 3.5-6.8A3.5 3.5 0 0 0 12 3z"/><path d="M10.3 11 5 21l3-1 1 3 3.9-8.3M13.7 11 19 21l-3-1-1 3-3.9-8.3"/>',
  bladder: '<path d="M8 3v4M16 3v4"/><path d="M5 11a7 7 0 0 0 14 0c0-2-1.5-4-7-4s-7 2-7 4z"/><path d="M12 18v3"/>',
  wa: '<path d="M3 21l1.65-3.8A9 9 0 1 1 8 20.1L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  nav: '<path d="m3 11 19-9-9 19-2-8-8-2z"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  steth: '<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className ? `i ${className}` : 'i'}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
