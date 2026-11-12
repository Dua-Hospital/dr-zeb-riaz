'use client';

import { useEffect, useRef } from 'react';

interface ChatDemoProps {
  name: string;
  status: string;
  me1: string;
  me2: string;
  them: { pre: string; time: string; post: string };
  times: [string, string, string];
}

/**
 * The WhatsApp phone. Plays once when scrolled into view (also under reduced motion).
 * Messages are only hidden when `.js` is on <html> (see globals.css), so no-JS stays readable.
 */
export function ChatDemo({ name, status, me1, me2, them, times }: ChatDemoProps) {
  const root = useRef<HTMLDivElement>(null);
  const m1 = useRef<HTMLDivElement>(null);
  const m2 = useRef<HTMLDivElement>(null);
  const m3 = useRef<HTMLDivElement>(null);
  const typing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const play = () => {
      at(300, () => m1.current?.classList.add('show'));
      at(1100, () => m2.current?.classList.add('show'));
      at(1900, () => typing.current?.classList.add('show'));
      at(3600, () => {
        typing.current?.classList.remove('show');
        m3.current?.classList.add('show');
      });
    };
    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            play();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(el);
    } else {
      play();
    }
    return () => {
      io?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="phone" ref={root} aria-hidden="true">
      <div className="screen">
        <div className="wa-top">
          <span className="av" />
          <div>
            <b>{name}</b>
            <small>{status}</small>
          </div>
        </div>
        <div className="chat">
          <div className="msg me" ref={m1}>
            {me1}
            <small>{times[0]} ✓✓</small>
          </div>
          <div className="msg me" ref={m2}>
            {me2}
            <small>{times[1]} ✓✓</small>
          </div>
          <div className="typing" ref={typing}>
            <i />
            <i />
            <i />
          </div>
          <div className="msg them" ref={m3}>
            {them.pre}
            <b>{them.time}</b>
            {them.post}
            <small>{times[2]}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
