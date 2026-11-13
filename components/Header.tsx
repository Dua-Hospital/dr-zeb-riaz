import { DOCTOR, type SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';
import { MobileMenu } from './nav/MobileMenu';
import { navItems } from './nav/items';

export function Header({ c, locale }: { c: SiteContent; locale: Locale }) {
  const other: Locale = locale === 'ur' ? 'en' : 'ur';
  return (
    <header className="nav">
      <MobileMenu locale={locale}>
        <a className="brand" href="#top">
          {/* Dr. Zeb Riaz mark (Dua hand, Zeb hand, mother and baby). Decorative: the name follows as text. */}
          <img className="logo" src="/brand/zeb-mark-full.svg" alt="" width={48} height={48} />
          <span>
            {locale === 'ur' ? DOCTOR.nameUr : DOCTOR.name}
            <small>{c.nav.role}</small>
          </span>
        </a>
        <nav className="nav-links" aria-label={c.nav.menu}>
          {navItems(c).map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))}
        </nav>
        <a className="lang" href={c.langSwitch.href} lang={other} hrefLang={other}>
          {c.langSwitch.label}
        </a>
        <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
          <Icon name="wa" />
          {c.nav.cta}
        </a>
      </MobileMenu>
    </header>
  );
}
