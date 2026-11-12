import type { SiteContent } from '@/lib/content';
import { bookingHref } from '@/lib/links';
import type { Locale } from '@/lib/site';
import { ChatDemo } from './ChatDemo';
import { Icon } from './icons';

/** Section 04: the dark band with three steps, one Book button and the animated chat. */
export function Booking({ c, locale }: { c: SiteContent; locale: Locale }) {
  const b = c.book;
  return (
    <section id="book">
      <div className="wrap">
        <div className="book rv">
          <div>
            <span className="overline">
              <span className="num">04</span>
              {b.overline}
            </span>
            <h2>{b.heading}</h2>
            <p className="lead">{b.lead}</p>
            <ol className="steps">
              {b.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="n">{i + 1}</span>
                  <div>
                    <b>{s.title}</b>
                    <span>{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>
            <a className="btn btn-pri wa-link" href={bookingHref(locale)} target="_blank" rel="noopener">
              <Icon name="wa" />
              {b.cta}
              <Icon name="arrow" className="arr" />
            </a>
          </div>
          <ChatDemo {...b.chat} />
        </div>
      </div>
    </section>
  );
}
