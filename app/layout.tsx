import type { Metadata, Viewport } from 'next';
import { Figtree, Gulzar } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
});

const gulzar = Gulzar({
  subsets: ['arabic', 'latin'],
  weight: '400',
  variable: '--font-gulzar',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dr. Zeb Riaz — Gynaecologist & Obstetrician in Multan | Dua Hospital',
    // Page titles already name her and Dua Hospital, so no suffix is added.
    template: '%s',
  },
  applicationName: 'Dr. Zeb Riaz',
  category: 'health' as Metadata['category'],
  icons: { icon: '/icon.svg' },
  formatDetection: { telephone: false, address: true, email: false },
};

export const viewport: Viewport = {
  themeColor: '#074EA2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${figtree.variable} ${gulzar.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
