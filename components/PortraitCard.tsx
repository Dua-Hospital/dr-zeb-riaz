import type { CSSProperties } from 'react';
import Image from 'next/image';
import { DOCTOR, type SiteContent } from '@/lib/content';
import type { Locale } from '@/lib/site';
import type { IconName } from '@/lib/content';
import { Icon } from './icons';

const CRED_ICONS: readonly IconName[] = ['cap', 'award', 'globe', 'star'];

/** The hero portrait: photo with name plate, side text (tablet) and the four credentials (spec §3). */
export function PortraitCard({ c, locale }: { c: SiteContent; locale: Locale }) {
  const p = c.portrait;
  return (
    <div className="card h-photo rv" style={{ '--d': '.1s' } as CSSProperties}>
      <div className="photo">
        <Image src="/images/dr-zeb-riaz-hero.jpg" width={1536} height={1024} alt={locale === 'ur' ? DOCTOR.nameUr : DOCTOR.name} priority />
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
      <div className="cred-bar cred-4">
        {p.creds.map((cr, i) => (
          <div className="cred" key={cr.title}>
            <span className="ic">
              <Icon name={CRED_ICONS[i] ?? 'award'} />
            </span>
            <div>
              <b>{cr.title}</b>
              <span>{cr.where}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
