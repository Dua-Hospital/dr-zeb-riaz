import type { CSSProperties } from 'react';
import type { SiteContent } from '@/lib/content';
import { Icon } from './icons';

/** Section 06: native <details> accordion (first open) and the emergency note. */
export function Faq({ c }: { c: SiteContent }) {
  const t = c.faq;
  return (
    <section id="faq">
      <div className="wrap faq">
        <div className="rv">
          <span className="overline">
            <span className="num">06</span>
            {t.overline}
          </span>
          <h2>{t.heading}</h2>
          <p className="lead">{t.lead}</p>
          <div className="emerg">
            <Icon name="alert" />
            <div>
              <b>{t.emergencyTitle}</b>
              {t.emergencyBody}
            </div>
          </div>
        </div>
        <div className="card acc rv" style={{ '--d': '0.1s' } as CSSProperties}>
          {t.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <span className="pm">
                  <Icon name="plus" />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
