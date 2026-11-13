import type { Metadata } from 'next';
import { DOCTOR, getContent } from '@/lib/content';
import { SITE_URL } from '@/lib/site';
import { Page } from '@/components/Page';

const content = getContent('en');

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      ur: `${SITE_URL}/ur/`,
      'x-default': `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: DOCTOR.name,
    locale: 'en_PK',
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: 'summary',
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function HomePage() {
  return <Page locale="en" />;
}
