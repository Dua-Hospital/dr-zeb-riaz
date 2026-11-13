import { easeInOutCubic, scrollDuration } from '@/lib/scroll';

let raf = 0;
let cancelRunning: (() => void) | null = null;

/**
 * Eased scroll to a page Y (spec §7.5). Runs under reduced motion too: the user starts it.
 * A new call, a wheel or a touch cancels the running one; `onDone` runs only if the scroll finished.
 */
export function smoothTo(y: number, onDone?: () => void): void {
  cancelRunning?.();
  const start = window.scrollY;
  const dist = y - start;
  const dur = scrollDuration(dist);
  let t0: number | null = null;
  const stop = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    if (cancelRunning === stop) cancelRunning = null;
  };
  cancelRunning = stop;
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  const step = (ts: number) => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    window.scrollTo(0, start + dist * easeInOutCubic(p));
    if (p < 1) {
      raf = requestAnimationFrame(step);
    } else {
      stop();
      onDone?.();
    }
  };
  raf = requestAnimationFrame(step);
}

/** Sticky header height plus breathing room, so targets land below the header. */
export function headerOffset(): number {
  const nav = document.querySelector('.nav');
  return (nav ? nav.getBoundingClientRect().height : 0) + 24;
}
