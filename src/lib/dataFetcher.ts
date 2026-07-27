import { connectToDatabase } from './db';
import { legalPages as staticLegalPages, LegalPage } from '../data/legalContents';
import { blogPosts as staticBlogPosts, BlogPost } from '../data/blogContents';

export async function getLegalPages(): Promise<LegalPage[]> {
  try {
    const { db } = await connectToDatabase();
    const count = await db.collection('legal_pages').countDocuments();
    if (count === 0) {
      // Seed the collection from static data
      console.log('Seeding legal_pages collection...');
      await db.collection('legal_pages').insertMany(
        staticLegalPages.map((page) => ({ ...page, pageNum: Number(page.pageNum) }))
      );
    }
    const pages = await db.collection('legal_pages').find({}).sort({ pageNum: 1 }).toArray();
    return pages.map((page: any) => {
      const { _id, ...rest } = page;
      if (rest.url && !rest.url.startsWith('/')) {
        rest.url = '/' + rest.url;
      }
      return rest as LegalPage;
    });
  } catch (err) {
    console.error('Error fetching legal pages from DB, falling back to static:', err);
    return staticLegalPages.map((page) => {
      const copy = { ...page };
      if (copy.url && !copy.url.startsWith('/')) {
        copy.url = '/' + copy.url;
      }
      return copy;
    });
  }
}

export async function getLegalPageByUrl(url: string): Promise<LegalPage | null> {
  const cleanUrl = url.startsWith('/') ? url : '/' + url;
  try {
    const { db } = await connectToDatabase();
    const page = await db.collection('legal_pages').findOne({
      url: { $in: [cleanUrl, cleanUrl.substring(1)] }
    });
    if (page) {
      const { _id, ...rest } = page;
      if (rest.url && !rest.url.startsWith('/')) {
        rest.url = '/' + rest.url;
      }
      return rest as LegalPage;
    }
  } catch (err) {
    console.error(`Error fetching legal page ${url} from DB, falling back to search static:`, err);
  }
  const pages = await getLegalPages();
  return pages.find((p) => p.url === cleanUrl) || null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { db } = await connectToDatabase();
    const count = await db.collection('blog_posts').countDocuments();
    if (count === 0) {
      // Seed the collection from static data
      console.log('Seeding blog_posts collection...');
      await db.collection('blog_posts').insertMany(staticBlogPosts);
    }
    const posts = await db.collection('blog_posts').find({}).sort({ date: -1 }).toArray();
    return posts.map((post: any) => {
      const { _id, ...rest } = post;
      return rest as BlogPost;
    });
  } catch (err) {
    console.error('Error fetching blog posts from DB, falling back to static:', err);
    return staticBlogPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { db } = await connectToDatabase();
    const post = await db.collection('blog_posts').findOne({ slug });
    if (post) {
      const { _id, ...rest } = post;
      return rest as BlogPost;
    }
  } catch (err) {
    console.error(`Error fetching blog ${slug} from DB, falling back to search static:`, err);
  }
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getAboutContent(): Promise<any> {
  const DEFAULT_ABOUT = {
    heroPill: "About Our Practice",
    heroTitle: "A Practice Built Around People, Not Files",
    heroSubtitle: "Yantra Legal is a dedicated migration and family law practice committed to protecting client rights with clear, honest legal guidance.",
    storyPill: "Our Story",
    storyTitle: "The Journey Behind Yantra Legal",
    storyParagraphs: [
      "Yantra Legal was established after a professional and personal journey that has spanned multiple countries, cultures and legal systems.",
      "Having lived, studied and worked across Nepal, Europe and Australia, Krishna Giri developed a deep appreciation for the challenges people face when navigating unfamiliar systems and major life transitions.",
      "This experience continues to shape the way Yantra Legal serves clients today: with empathy, clarity and practical legal guidance."
    ],
    introTitle: "Introduction",
    introSubtitle: "Principal Solicitor & Founder",
    introTagline: "Legal expertise shaped by international experience, cultural understanding, and a personal commitment to helping people navigate major life transitions.",
    introParagraphs: [
      "Many legal matters arise during significant moments in life — building a future in a new country, reuniting with family, responding to an unexpected visa refusal, or navigating the breakdown of a relationship.",
      "Having lived, studied, and worked across Nepal, Europe, and Australia, Krishna Giri understands many of these transitions firsthand. This perspective allows him to combine legal expertise with genuine insight into the personal challenges that often accompany migration and family law matters.",
      "As the founder of Yantra Legal, Krishna is committed to providing practical legal advice that is clear, accessible, and tailored to the individual circumstances of each client."
    ],
    quoteText: "What matters most to me is that you never feel like just another file.\nEvery client deserves to be heard, understood and supported.",
    quoteAuthor: "— Krishna Giri"
  };

  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('about_page').findOne({ key: 'about_content' });
    if (content) {
      const { _id, ...rest } = content;
      return rest;
    }
  } catch (err) {
    console.error('Error fetching about page content:', err);
  }
  return DEFAULT_ABOUT;
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const DEFAULT_SETTINGS = {
    phone: '+61 402 402 120',
    email: 'info@yantralegal.com.au',
    address: 'Sydney NSW 2000',
    postalAddress: 'GPO Box 1230, Sydney NSW 2001',
    whatsapp: '61402402120',
    consultationFee: '$150',
    consultationDuration: '30 mins',
  };

  try {
    const { db } = await connectToDatabase();
    const settingsArray = await db.collection('site_settings').find({}).toArray();
    
    const settingsRecord: Record<string, string> = { ...DEFAULT_SETTINGS };
    settingsArray.forEach((item: any) => {
      settingsRecord[item.key] = item.value;
    });
    return settingsRecord;
  } catch (err) {
    console.error('Error fetching site settings from DB:', err);
    return DEFAULT_SETTINGS;
  }
}

