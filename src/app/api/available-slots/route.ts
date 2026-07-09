import { NextRequest } from 'next/server';
import { calendar } from '@/lib/googleCalendar';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get('date'); // Expects YYYY-MM-DD

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return Response.json({ error: 'Valid date parameter (YYYY-MM-DD) is required.' }, { status: 400 });
    }

    const [year, month, day] = dateStr.split('-').map(Number);

    // 1. Fetch Admin's Google Calendar Timezone
    let timeZone = 'UTC';
    try {
      const calRes = await calendar.calendars.get({ calendarId: 'primary' });
      timeZone = calRes.data.timeZone || 'UTC';
    } catch (err: any) {
      console.error('Failed to fetch calendar timezone, falling back to UTC:', err.message);
    }

    // 2. Define Working Hours (9:00 AM to 5:00 PM) split into 30-minute intervals
    // Construct all potential slots for the day
    const timeMin = createDateInTimezone(year, month, day, 9, 0, timeZone);
    const timeMax = createDateInTimezone(year, month, day, 17, 0, timeZone);

    const slots: { start: Date; end: Date; time: string }[] = [];
    for (let hour = 9; hour < 17; hour++) {
      for (const min of [0, 30]) {
        const slotStart = createDateInTimezone(year, month, day, hour, min, timeZone);
        const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000);
        
        const startHour = hour.toString().padStart(2, '0');
        const startMin = min.toString().padStart(2, '0');
        let endHourNum = hour;
        let endMinNum = min + 30;
        if (endMinNum >= 60) {
          endHourNum += 1;
          endMinNum -= 60;
        }
        const endHour = endHourNum.toString().padStart(2, '0');
        const endMin = endMinNum.toString().padStart(2, '0');
        const timeFormatted = `${startHour}:${startMin} to ${endHour}:${endMin}`;
        
        slots.push({ start: slotStart, end: slotEnd, time: timeFormatted });
      }
    }

    // 3. Fetch Google Busy Blocks in Real-Time
    let googleBusyIntervals: { start: Date; end: Date }[] = [];
    try {
      const fbRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          items: [{ id: 'primary' }],
        },
      });

      const busyList = fbRes.data.calendars?.primary?.busy || [];
      googleBusyIntervals = busyList.map((item) => ({
        start: new Date(item.start!),
        end: new Date(item.end!),
      }));
    } catch (err: any) {
      console.error('Google Freebusy query failed:', err.message);
      // We do not fail the request completely, but log it and proceed checking local DB
    }

    // 4. Fetch Local DB Bookings for the Date (PENDING_APPROVAL and CONFIRMED)
    const { db } = await connectToDatabase();
    const localBookings = await db.collection('bookings')
      .find({
        date: dateStr,
        status: { $in: ['PENDING_APPROVAL', 'CONFIRMED'] },
      })
      .toArray();

    const localBusyIntervals = localBookings.map((b) => {
      const startTimeStr = b.time.includes(' to ') ? b.time.split(' to ')[0] : b.time;
      const [bHour, bMin] = startTimeStr.split(':').map(Number);
      const start = createDateInTimezone(year, month, day, bHour, bMin, timeZone);
      const end = new Date(start.getTime() + b.duration * 60 * 1000);
      return { start, end };
    });

    // 5. Merge all busy intervals
    const allBusyIntervals = [...googleBusyIntervals, ...localBusyIntervals];

    // 6. Filter available slots (no overlap with any busy intervals)
    const availableSlots = slots.filter((slot) => {
      // Check if slot overlaps with any busy interval
      const isBusy = allBusyIntervals.some((busy) => {
        return slot.start < busy.end && slot.end > busy.start;
      });
      return !isBusy;
    });

    return Response.json({
      date: dateStr,
      timezone: timeZone,
      availableSlots: availableSlots.map(s => s.time),
    });
  } catch (error: any) {
    console.error('Available slots endpoint error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
