import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    let content: any = await db.collection('about_page').findOne({ key: 'about_content' });
    
    if (!content) {
      // Seed default
      await db.collection('about_page').insertOne({
        key: 'about_content',
        ...DEFAULT_ABOUT
      });
      content = { key: 'about_content', ...DEFAULT_ABOUT };
    }
    
    const { _id, ...rest } = content as any;
    return Response.json({ about: rest });
  } catch (error: any) {
    console.error('Public about GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
