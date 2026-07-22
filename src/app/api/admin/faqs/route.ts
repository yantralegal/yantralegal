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
    const count = await db.collection('faqs').countDocuments();
    
    if (count === 0) {
      // Seed default faqs
      const response = await fetch(`${request.nextUrl.origin}/api/faqs`);
      if (response.ok) {
        // Fetch runs the seeding logic in the public route
        await response.json();
      }
    }
    
    const faqs = await db.collection('faqs').find({}).toArray();
    const cleanFaqs = faqs.map((faq: any) => {
      const { _id, ...rest } = faq;
      return rest;
    });

    return Response.json({ faqs: cleanFaqs });
  } catch (error: any) {
    console.error('Admin faqs GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json(); // Expects FAQCategory[]
    
    if (!Array.isArray(body)) {
      return Response.json({ error: 'Body must be an array of FAQ categories' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Replace all records
    await db.collection('faqs').deleteMany({});
    if (body.length > 0) {
      await db.collection('faqs').insertMany(body);
    }

    return Response.json({ success: true, message: 'FAQs updated successfully' });
  } catch (error: any) {
    console.error('Admin faqs POST error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
