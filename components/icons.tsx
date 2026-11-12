import type { IconName } from '@/lib/content';

/* 24x24 stroke icons; inner SVG markup is static (ported from the design mockup). */
const PATHS: Record<IconName, string> = {
  fever: '<path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="M12 18v-6"/>',
  bug: '<path d="m8 2 1.9 1.9M16 2l-1.9 1.9M9 7.1V6a3 3 0 1 1 6 0v1.1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"/><path d="M12 20v-9M6 13H2M22 13h-4"/>',
  allergy: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>',
  head: '<circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><path d="M9 9h.01M15 9h.01"/>',
  bone: '<path d="M17 10c.7-.7 1.7-.7 2.5 0a2 2 0 0 0 0-3.5 2 2 0 0 0-3.5 0c.7.8.7 1.8 0 2.5l-6 6c-.7.7-1.7.7-2.5 0a2 2 0 0 0 0 3.5 2 2 0 0 0 3.5 0c-.7-.8-.7-1.8 0-2.5z"/>',
  sugar: '<path d="M12 2.7s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11z"/><path d="M10 15h4M12 13v4"/>',
  bp: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/><path d="M3.2 12H9l1-2 2 4 1.5-3 1 1h6.3"/>',
  blood: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 5 12 2.5C11.5 5 10 7.4 8 9s-3 3.5-3 5.5a7 7 0 0 0 7 7z"/>',
  scale: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 9a5 5 0 0 1 8 0l-3 3"/><path d="M12 12h.01"/>',
  kidney: '<path d="M9 3C5 3 3 7 3 11s2 9 6 9c3 0 3-3 2-5s-1-4 1-5c2-1 2-3 1-5S11 3 9 3z"/><path d="M15 4c3 0 6 3 6 8s-3 8-6 8"/>',
  bladder: '<path d="M8 3v4M16 3v4"/><path d="M5 11a7 7 0 0 0 14 0c0-2-1.5-4-7-4s-7 2-7 4z"/><path d="M12 18v3"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.9.8A4 4 0 0 0 4 13a4 4 0 0 0 2 6.5A3 3 0 0 0 12 19z"/><path d="M12 5a3 3 0 1 1 5.9.8A4 4 0 0 1 20 13a4 4 0 0 1-2 6.5A3 3 0 0 1 12 19z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  acid: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.4.3 1.3 1.5 2.9 3.5 2.9z"/>',
  ulcer: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
  liver: '<path d="M3 9c0-3 3-5 7-5h6c3 0 5 2 5 5 0 5-5 9-10 9-2 0-3 2-3 3-3-1-5-6-5-12z"/><path d="M12 4v6"/>',
  virus: '<circle cx="12" cy="12" r="5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M5 19l3.5-3.5M15.5 8.5 19 5"/>',
  cough: '<path d="M12 4v8"/><path d="M8 8C5 8 3 12 3 16c0 2 1 4 3 4s3-2 3-4v-4l3-2"/><path d="M16 8c3 0 5 4 5 8 0 2-1 4-3 4s-3-2-3-4v-4l-3-2"/>',
  asthma: '<path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  lungs: '<path d="M12 3v8M12 11l-3 2M12 11l3 2"/><path d="M8.5 7C5 7 3 12 3 16.5 3 19 4.5 20 6 20c2 0 3-1.5 3-4V8.5"/><path d="M15.5 7C19 7 21 12 21 16.5c0 2.5-1.5 3.5-3 3.5-2 0-3-1.5-3-4V8.5"/>',
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
