import { NextRequest } from 'next/server';
import { getLegalPages } from '@/lib/dataFetcher';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const pages = await getLegalPages();
    return Response.json({ pages });
  } catch (error: any) {
    console.error('Public legal pages API error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
