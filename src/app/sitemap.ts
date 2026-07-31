import { MetadataRoute } from 'next';
import { getLegalPages, getBlogPosts } from '../lib/dataFetcher';

const baseUrl = 'https://www.yantralegal.com.au';

// Static, crawlable marketing/legal routes with sensible crawl hints.
const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faqs', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/consultation-terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Legal service pages (migration-law, family-law, appeals-and-reviews, …)
  // are rendered by the [...slug] catch-all route from the database.
  let legalEntries: MetadataRoute.Sitemap = [];
  try {
    const legalPages = await getLegalPages();
    legalEntries = legalPages
      .filter((page) => page.url && page.url.startsWith('/'))
      .map((page) => {
        // Top-level category hubs rank as more important than deep leaf pages.
        const depth = page.url.split('/').filter(Boolean).length;
        return {
          url: `${baseUrl}${page.url}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: depth <= 1 ? 0.9 : 0.7,
        };
      });
  } catch (err) {
    console.error('sitemap: failed to load legal pages', err);
  }

  // Blog articles.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts
      .filter((post) => post.slug)
      .map((post) => {
        const parsed = new Date(post.date);
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: isNaN(parsed.getTime()) ? now : parsed,
          changeFrequency: 'yearly' as const,
          priority: 0.6,
        };
      });
  } catch (err) {
    console.error('sitemap: failed to load blog posts', err);
  }

  return [...staticEntries, ...legalEntries, ...blogEntries];
}
