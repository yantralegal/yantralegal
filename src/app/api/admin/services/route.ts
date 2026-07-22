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
    const pages = await db.collection('legal_pages').find({}).sort({ pageNum: 1 }).toArray();
    return Response.json({ pages });
  } catch (error: any) {
    console.error('Admin services GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { pageNum, title, url, sections } = body;

    if (!title || !url || !sections) {
      return Response.json({ error: 'Title, URL, and sections are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Check if page already exists
    const existing = await db.collection('legal_pages').findOne({ url });

    if (existing) {
      // Update
      await db.collection('legal_pages').updateOne(
        { url },
        { $set: { pageNum: Number(pageNum || existing.pageNum || 99), title, sections } }
      );
      return Response.json({ success: true, message: 'Page updated successfully' });
    } else {
      // Insert new
      const nextNum = pageNum ? Number(pageNum) : (await db.collection('legal_pages').countDocuments()) + 1;
      await db.collection('legal_pages').insertOne({
        pageNum: nextNum,
        title,
        url,
        sections
      });
      return Response.json({ success: true, message: 'Page created successfully' });
    }
  } catch (error: any) {
    console.error('Admin services POST error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return Response.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('legal_pages').deleteOne({ url });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Page not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Page deleted successfully' });
  } catch (error: any) {
    console.error('Admin services DELETE error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
