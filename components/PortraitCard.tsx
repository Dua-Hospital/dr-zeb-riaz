import type { CSSProperties } from 'react';
import Image from 'next/image';
import { DOCTOR, type SiteContent } from '@/lib/content';
import type { Locale } from '@/lib/site';
import { Icon } from './icons';

/** The hero portrait: photo with name plate, side text (tablet) and the credentials strip. */
export function PortraitCard({ c, locale }: { c: SiteContent; locale: Locale }) {
  const p = c.portrait;
  return (
    <div className="card h-photo rv" style={{ '--d': '.1s' } as CSSProperties}>
      <div className="photo">
        <Image src="/images/dr-hasan-aziz-about.jpg" width={1100} height={1300} alt={locale === 'ur' ? DOCTOR.nameUr : DOCTOR.name} priority />
        <div className="plate">
          <div>
            <div className="nm">{p.plateTitle}</div>
            <div className="q">{p.plateSub}</div>
          </div>
          {/* On the Urdu page the plate title is already the Urdu name. */}
          {locale === 'en' && (
            <div className="ur" lang="ur">
              {DOCTOR.nameUr}
            </div>
          )}
        </div>
      </div>
      <div className="side">
        <span className="overline">{p.sideOverline}</span>
        <b style={{ fontSize: 22, lineHeight: '30px', color: 'var(--b900)' }}>{p.sideTitle}</b>
        <span style={{ color: 'var(--n600)', fontSize: 15, lineHeight: '24px' }}>{p.sideSub}</span>
      </div>
      <div className="cred-bar">
        <div className="cred">
          <span className="ic">
            <Icon name="cap" />
          </span>
          <div>
            <small>{p.degreeLabel}</small>
            <b>{p.degree}</b>
            <span>{p.degreeWhere}</span>
          </div>
        </div>
        <div className="cred">
          <span className="ic">
            <Icon name="award" />
          </span>
          <div>
            <small>{p.specLabel}</small>
            <b>{p.spec}</b>
            <span>{p.specWhere}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
