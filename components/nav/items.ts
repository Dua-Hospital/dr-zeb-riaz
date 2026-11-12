import { REVIEWS, type SiteContent } from '@/lib/content';

type NavKey = 'about' | 'care' | 'clinic' | 'book' | 'reviews' | 'faq';

const ITEMS: readonly { href: string; key: NavKey }[] = [
  { href: '#about', key: 'about' },
  { href: '#care', key: 'care' },
  { href: '#clinic', key: 'clinic' },
  { href: '#book', key: 'book' },
  { href: '#reviews', key: 'reviews' },
  { href: '#faq', key: 'faq' },
];

/** The section links shared by the header and the mobile menu. "Reviews" only once reviews exist. */
export function navItems(c: SiteContent): { href: string; label: string }[] {
  return ITEMS.filter((i) => i.key !== 'reviews' || REVIEWS.length > 0).map((i) => ({
    href: i.href,
    label: c.nav[i.key],
  }));
}
