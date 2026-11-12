import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import { SITE_URL } from '@/lib/site';
import { Page } from '@/components/Page';

const content = getContent('ur');

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  alternates: {
    canonical: `${SITE_URL}/ur/`,
    languages: {
      en: `${SITE_URL}/`,
      ur: `${SITE_URL}/ur/`,
      'x-default': `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/ur/`,
    siteName: 'ڈاکٹر حسن عزیز',
    locale: 'ur_PK',
    alternateLocale: 'en_PK',
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: 'summary',
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function UrduPage() {
  return (
    <div lang="ur" dir="rtl" className="urdu-page">
      <Page locale="ur" />
    </div>
  );
}
