import { NextRequest } from 'next/server';
import { getBlogPosts } from '@/lib/dataFetcher';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts();
    return Response.json({ posts });
  } catch (error: any) {
    console.error('Public blog posts API error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
