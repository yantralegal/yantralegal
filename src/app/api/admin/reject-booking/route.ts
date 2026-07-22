import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/db';

import { isAuthorized } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!(await isAuthorized(authHeader))) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId || !ObjectId.isValid(bookingId)) {
      return Response.json({ error: 'A valid bookingId is required.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'REJECTED' } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: 'Booking not found.' }, { status: 404 });
    }

    return Response.json({ message: 'Booking successfully rejected.', bookingId, status: 'REJECTED' });
  } catch (error: any) {
    console.error('Reject booking API error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
