// Pink October: the breast-cancer awareness band shows only in October (Pakistan time),
// and only once the client has confirmed breast checks as a service (spec §7.5).

export function isPinkOctober(month: number): boolean {
  return month === 10;
}

export function showPinkOctober(month: number, care: readonly { name: string; pending?: true }[]): boolean {
  const breast = care.find((t) => t.name === 'Breast checks');
  return isPinkOctober(month) && breast !== undefined && !breast.pending;
}
