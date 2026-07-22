import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { calendar } from '@/lib/googleCalendar';
import { connectToDatabase, Booking } from '@/lib/db';

// Helper to construct a Date object for a specific wall-clock time in a target IANA timezone
function createDateInTimezone(year: number, month: number, day: number, hour: number, minute: number, timeZone: string): Date {
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
  });
  
  const parts = formatter.formatToParts(utcDate);
  const getVal = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
  
  const guessLocal = Date.UTC(
    getVal('year'),
    getVal('month') - 1,
    getVal('day'),
    getVal('hour'),
    getVal('minute')
  );
  
  const diff = guessLocal - utcDate.getTime();
  return new Date(utcDate.getTime() - diff);
}

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

    // 1. Find the booking in the database
    const booking = await db.collection<Booking>('bookings').findOne({ _id: new ObjectId(bookingId) });

    if (!booking) {
      return Response.json({ error: 'Booking not found.' }, { status: 404 });
    }

    if (booking.status === 'CONFIRMED') {
      return Response.json({ error: 'Booking is already confirmed.' }, { status: 400 });
    }

    // 2. Fetch Admin's Google Calendar Timezone
    let timeZone = 'UTC';
    try {
      const calRes = await calendar.calendars.get({ calendarId: 'primary' });
      timeZone = calRes.data.timeZone || 'UTC';
    } catch (err: any) {
      console.error('Failed to fetch calendar timezone, falling back to UTC:', err.message);
    }

    // 3. Create Google Calendar Event
    const [year, month, day] = booking.date.split('-').map(Number);
    const bStartTimeStr = booking.time.includes(' to ') ? booking.time.split(' to ')[0] : booking.time;
    const [hour, min] = bStartTimeStr.split(':').map(Number);
    const start = createDateInTimezone(year, month, day, hour, min, timeZone);
    const end = new Date(start.getTime() + booking.duration * 60 * 1000);

    let googleEventId = '';
    try {
      const eventRes = await calendar.events.insert({
        calendarId: 'primary',
        sendUpdates: 'all',
        requestBody: {
          summary: `Consultation with ${booking.name}`,
          description: `Manual admin confirmation after fee collection.`,
          start: {
            dateTime: start.toISOString(),
            timeZone,
          },
          end: {
            dateTime: end.toISOString(),
            timeZone,
          },
          attendees: [{ email: booking.email }],
        },
      });
      googleEventId = eventRes.data.id || '';
    } catch (err: any) {
      console.error('Google Calendar event insert failed for manual confirm booking:', err.message);
      return Response.json({ error: 'Failed to create Google Calendar event.', details: err.message }, { status: 502 });
    }

    // 4. Update the local database status to CONFIRMED
    await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          status: 'CONFIRMED',
          googleEventId,
        },
      }
    );

    return Response.json({
      message: 'Booking confirmed manually and invitation sent.',
      bookingId,
      status: 'CONFIRMED',
      googleEventId,
    });
  } catch (error: any) {
    console.error('Admin booking confirmation endpoint error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
