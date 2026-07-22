import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    // Extract IP address from request headers
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

    const { db } = await connectToDatabase();
    
    // Insert analytics record
    await db.collection('analytics_clicks').insertOne({
      ip,
      action,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
