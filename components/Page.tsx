import { getContent } from '@/lib/content';
import { buildPageSchema } from '@/lib/schema';
import type { Locale } from '@/lib/site';
import { About } from './About';
import { Booking } from './Booking';
import { Clinics } from './Clinics';
import { Faq } from './Faq';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { MobileDock } from './MobileDock';
import { BackToTop } from './nav/BackToTop';
import { Reveal } from './nav/Reveal';
import { SmoothNav } from './nav/SmoothNav';
import { Reviews } from './Reviews';
import { Care } from './Care';
import { PinkOctober } from './live/PinkOctober';

/** The whole page for one locale. */
export function Page({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPageSchema(locale)).replace(/</g, '\\u003c') }}
      />
      <a className="skip-link" href="#top">
        {c.skipLink}
      </a>
      <SmoothNav />
      <Reveal />
      <Header c={c} locale={locale} />
      <main id="top" tabIndex={-1}>
        <Hero c={c} locale={locale} />
        <About c={c} />
        <Care c={c} locale={locale} />
        <PinkOctober locale={locale} />
        <Clinics c={c} locale={locale} />
        <Booking c={c} locale={locale} />
        <Reviews c={c} />
        <Faq c={c} />
        <FinalCta c={c} locale={locale} />
      </main>
      <Footer c={c} locale={locale} />
      <MobileDock c={c} locale={locale} />
      <BackToTop label={c.toTop} />
    </>
  );
}
