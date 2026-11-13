import Image from 'next/image';
import { DOCTOR } from '@/lib/content';
import type { CSSProperties } from 'react';
import type { IconName, SiteContent } from '@/lib/content';
import { Icon } from './icons';

const VISIT_ICONS: readonly IconName[] = ['wa', 'file', 'steth', 'list'];

/** Section 01: qualifications, expertise and what a visit looks like (spec §3, Z6). */
export function About({ c }: { c: SiteContent }) {
  const a = c.about;
  return (
    <section id="about">
      <div className="wrap about">
        <div className="about-l rv">
          <span className="overline">
            <span className="num">01</span>
            {a.overline}
          </span>
          <h2>{a.heading}</h2>
          <p className="lead">{a.lead}</p>
          <p className="lead" style={{ marginTop: 14 }}>
            {a.lead2}
          </p>
          <div className="about-photo-card rv" style={{ marginTop: 28, marginBottom: 20 }}>
            <Image
              src="/images/dr-zeb-riaz-about.jpg"
              alt={DOCTOR.name}
              width={1536}
              height={1024}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }}
            />
            <span className="about-photo-badge">
              <Icon name="steth" />
              <span>{a.photoBadge}</span>
            </span>
          </div>
          <div className="facts">
            {a.facts.map((f) => (
              <div className="fact" key={f.value}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-r">
          <div className="card blk rv">
            <h3>{a.qualHeading}</h3>
            <ul className="tl">
              {a.quals.map((q) => (
                <li key={q.title}>
                  <b>{q.title}</b>
                  <span className="chip">{q.chip}</span>
                  <span className="where">{q.where}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card blk rv" style={{ '--d': '.1s' } as CSSProperties}>
            <h3>{a.visitHeading}</h3>
            <ol className="ex-list">
              {a.visit.map((v, i) => (
                <li className="ex" key={v.title}>
                  <span className="ic">
                    <Icon name={VISIT_ICONS[i] ?? 'chev'} />
                  </span>
                  <b>
                    <small>{v.stage}</small>
                    {v.title}
                  </b>
                  <span>{v.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
