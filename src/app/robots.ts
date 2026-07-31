import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.yantralegal.com.au';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the admin dashboard, API routes and the lead-capture intake form
      // out of the index — they carry no search value and shouldn't be crawled.
      disallow: ['/api/', '/admin', '/family-law/intake'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
