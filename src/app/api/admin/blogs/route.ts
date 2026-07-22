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
    const posts = await db.collection('blog_posts').find({}).sort({ date: -1 }).toArray();
    return Response.json({ posts });
  } catch (error: any) {
    console.error('Admin blogs GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, date, readTime, author, thumbnail } = body;

    if (!title || !slug || !content) {
      return Response.json({ error: 'Title, slug, and content are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const existing = await db.collection('blog_posts').findOne({ slug });

    const postData = {
      title,
      slug,
      excerpt: excerpt || '',
      content: Array.isArray(content) ? content : [content],
      category: category || 'General',
      date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: readTime || '3 min read',
      author: author || 'Krishna Giri',
      thumbnail: thumbnail || '/blog-placeholder.png'
    };

    if (existing) {
      await db.collection('blog_posts').updateOne({ slug }, { $set: postData });
      return Response.json({ success: true, message: 'Blog post updated successfully' });
    } else {
      await db.collection('blog_posts').insertOne(postData);
      return Response.json({ success: true, message: 'Blog post created successfully' });
    }
  } catch (error: any) {
    console.error('Admin blogs POST error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return Response.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('blog_posts').deleteOne({ slug });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error: any) {
    console.error('Admin blogs DELETE error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
