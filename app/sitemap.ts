import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = {
    en: `${SITE_URL}/`,
    ur: `${SITE_URL}/ur/`,
    'x-default': `${SITE_URL}/`,
  };

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/ur/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
  ];
}
