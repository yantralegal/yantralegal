import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    let content: any = await db.collection('about_page').findOne({ key: 'about_content' });
    
    if (!content) {
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

      await db.collection('about_page').insertOne({
        key: 'about_content',
        ...DEFAULT_ABOUT
      });
      content = { key: 'about_content', ...DEFAULT_ABOUT };
    }
    
    const { _id, ...rest } = content as any;
    return Response.json({ about: rest });
  } catch (error: any) {
    console.error('Admin about GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      heroPill,
      heroTitle,
      heroSubtitle,
      storyPill,
      storyTitle,
      storyParagraphs,
      introTitle,
      introSubtitle,
      introTagline,
      introParagraphs,
      quoteText,
      quoteAuthor
    } = body;

    const { db } = await connectToDatabase();

    await db.collection('about_page').updateOne(
      { key: 'about_content' },
      {
        $set: {
          heroPill,
          heroTitle,
          heroSubtitle,
          storyPill,
          storyTitle,
          storyParagraphs,
          introTitle,
          introSubtitle,
          introTagline,
          introParagraphs,
          quoteText,
          quoteAuthor
        }
      },
      { upsert: true }
    );

    return Response.json({ success: true, message: 'About page updated successfully' });
  } catch (error: any) {
    console.error('Admin about POST error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
