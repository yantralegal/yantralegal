import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { DEFAULT_FAQS } from '@/data/faqContents';

export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const count = await db.collection('faqs').countDocuments();
    
    if (count === 0) {
      // Seed default faqs
      await db.collection('faqs').insertMany(DEFAULT_FAQS);
    }
    
    const faqs = await db.collection('faqs').find({}).toArray();
    const cleanFaqs = faqs.map((faq: any) => {
      const { _id, ...rest } = faq;
      return rest;
    });

    return Response.json({ faqs: cleanFaqs });
  } catch (error: any) {
    console.error('Public faqs GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
