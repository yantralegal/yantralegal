import { NextRequest } from 'next/server';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, matterType, method, description, date, time, duration } = body;

    // Validate request body
    if (!name || !email || !date || !time || typeof duration !== 'number') {
      return Response.json({ error: 'Missing or invalid fields: name, email, date, time, duration are required.' }, { status: 400 });
    }

    const timePattern = /^\d{2}:\d{2}( to \d{2}:\d{2})?$/;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !timePattern.test(time)) {
      return Response.json({ error: 'Date must be YYYY-MM-DD and time must be HH:MM or HH:MM to HH:MM.' }, { status: 400 });
    }

    const startTimeStr = time.includes(' to ') ? time.split(' to ')[0] : time;
    const [year, month, day] = date.split('-').map(Number);
    const [hour, min] = startTimeStr.split(':').map(Number);

    // 1. Fetch Admin's Google Calendar Timezone
    let timeZone = 'UTC';
    try {
      const calRes = await calendar.calendars.get({ calendarId: 'primary' });
      timeZone = calRes.data.timeZone || 'UTC';
    } catch (err: any) {
      console.error('Failed to fetch calendar timezone, falling back to UTC:', err.message);
    }

    // 2. Define Proposed Slot Times
    const slotStart = createDateInTimezone(year, month, day, hour, min, timeZone);
    const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);

    // Validate that booking fits within working hours (9:00 AM to 5:00 PM)
    const workStart = createDateInTimezone(year, month, day, 9, 0, timeZone);
    const workEnd = createDateInTimezone(year, month, day, 17, 0, timeZone);

    if (slotStart < workStart || slotEnd > workEnd) {
      return Response.json({ error: 'Selected time is outside working hours (9:00 AM - 5:00 PM).' }, { status: 400 });
    }

    // 3. Real-Time Overlap Check (Google Calendar freebusy)
    try {
      const fbRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: slotStart.toISOString(),
          timeMax: slotEnd.toISOString(),
          items: [{ id: 'primary' }],
        },
      });

      const busyList = fbRes.data.calendars?.primary?.busy || [];
      const hasGoogleOverlap = busyList.some((busy) => {
        const bStart = new Date(busy.start!);
        const bEnd = new Date(busy.end!);
        return slotStart < bEnd && slotEnd > bStart;
      });

      if (hasGoogleOverlap) {
        return Response.json({ error: 'The requested time slot is already occupied on the calendar.' }, { status: 400 });
      }
    } catch (err: any) {
      console.error('Google Freebusy query failed during booking submission:', err.message);
      // If client fails, we should still allow DB checks, but notify
    }

    // 4. Overlap Check (Local MongoDB bookings)
    const { db } = await connectToDatabase();
    
    // Fetch bookings for the same day
    const sameDayBookings = await db.collection<Booking>('bookings')
      .find({
        date: date,
        status: { $in: ['PENDING_APPROVAL', 'CONFIRMED'] },
      })
      .toArray();

    const hasLocalOverlap = sameDayBookings.some((b) => {
      const bStartTimeStr = b.time.includes(' to ') ? b.time.split(' to ')[0] : b.time;
      const [bHour, bMin] = bStartTimeStr.split(':').map(Number);
      const bStart = createDateInTimezone(year, month, day, bHour, bMin, timeZone);
      const bEnd = new Date(bStart.getTime() + b.duration * 60 * 1000);
      return slotStart < bEnd && slotEnd > bStart;
    });

    if (hasLocalOverlap) {
      return Response.json({ error: 'The requested time slot is already reserved.' }, { status: 400 });
    }

    // 5. Booking Logic based on Duration
    if (duration <= 5) {
      // Free booking: Auto-confirmed
      let googleEventId = '';
      try {
        const eventRes = await calendar.events.insert({
          calendarId: 'primary',
          sendUpdates: 'all',
          requestBody: {
            summary: `Consultation with ${name} (Free)`,
            description: `Quick consultation requested from website booking form.`,
            start: {
              dateTime: slotStart.toISOString(),
              timeZone,
            },
            end: {
              dateTime: slotEnd.toISOString(),
              timeZone,
            },
            attendees: [{ email }],
          },
        });
        googleEventId = eventRes.data.id || '';
      } catch (err: any) {
        console.error('Google Calendar event insert failed for auto-confirm booking:', err.message);
        return Response.json({ error: 'Failed to create Google Calendar event.', details: err.message }, { status: 502 });
      }

      // Store in DB as CONFIRMED
      const bookingRecord: Booking = {
        name,
        email,
        phone,
        matterType,
        method,
        description,
        date,
        time,
        duration,
        status: 'CONFIRMED',
        googleEventId,
        createdAt: new Date(),
      };

      const result = await db.collection('bookings').insertOne(bookingRecord);
      return Response.json({
        message: 'Booking confirmed and scheduled successfully.',
        bookingId: result.insertedId,
        status: 'CONFIRMED',
        googleEventId,
      });
    } else {
      // Paid booking: Set to PENDING_APPROVAL, requiring admin action
      const bookingRecord: Booking = {
        name,
        email,
        phone,
        matterType,
        method,
        description,
        date,
        time,
        duration,
        status: 'PENDING_APPROVAL',
        createdAt: new Date(),
      };

      const result = await db.collection('bookings').insertOne(bookingRecord);
      return Response.json({
        message: 'Booking request received and is pending admin approval.',
        bookingId: result.insertedId,
        status: 'PENDING_APPROVAL',
      });
    }
  } catch (error: any) {
    console.error('Booking submission endpoint error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
