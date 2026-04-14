import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/profile/',
        '/sign-in/',
        '/sign-up/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
