// Pure maths for the in-page smooth scroll and the back-to-top progress ring (spec §7.5).

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Scroll duration in ms, scaled by distance: clamp(450, |d| * 0.35, 1100). */
export function scrollDuration(distancePx: number): number {
  return Math.min(1100, Math.max(450, Math.abs(distancePx) * 0.35));
}

/** stroke-dashoffset for a ring of radius r at the given progress (0..1, clamped). */
export function ringOffset(progress: number, radius = 25): number {
  const p = Math.min(1, Math.max(0, progress));
  return 2 * Math.PI * radius * (1 - p);
}
