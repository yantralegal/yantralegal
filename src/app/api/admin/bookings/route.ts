import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    const bookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ bookings });
  } catch (error: any) {
    console.error('List bookings API error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
