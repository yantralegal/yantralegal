import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const updates = await db.collection('marquee_updates')
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to string id for frontend ease
    const formatted = updates.map(u => ({
      id: u._id.toString(),
      heading: u.heading,
      content: u.content,
      imageUrl: u.imageUrl,
      createdAt: u.createdAt
    }));

    return NextResponse.json({ updates: formatted });
  } catch (error: any) {
    console.error('Public marquee GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
