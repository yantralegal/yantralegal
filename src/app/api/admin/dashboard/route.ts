import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();

    // 1. Fetch Login Stats
    const logins = await db.collection('admin_logs')
      .find({ action: 'login' })
      .sort({ timestamp: -1 })
      .toArray();

    const loginCount = logins.length;
    const lastLoginDate = logins.length > 0 ? logins[0].timestamp : null;

    // 2. Fetch Unique IP Click Counts for Contact & Consultation
    const uniqueContactIPs = await db.collection('analytics_clicks').distinct('ip', { action: 'contact_page_view' });
    const contactClicksCount = uniqueContactIPs.length;

    const uniqueConsultationIPs = await db.collection('analytics_clicks').distinct('ip', { action: 'book_consultation_click' });
    const bookConsultationClicksCount = uniqueConsultationIPs.length;

    // 3. Fetch Contact Submissions
    const submissions = await db.collection('contact_submissions')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    const cleanSubmissions = submissions.map((sub: any) => {
      const { _id, ...rest } = sub;
      return rest;
    });

    // 4. Calculate content change rate (count updates or total custom items)
    const servicesCount = await db.collection('legal_pages').countDocuments();
    const blogsCount = await db.collection('blogs').countDocuments();
    const faqsCount = await db.collection('faqs').countDocuments();
    const totalContentItems = servicesCount + blogsCount + faqsCount;

    return NextResponse.json({
      totalViews: 12450, // Static for now, as requested
      loginCount: loginCount || 1, // Fallback if none recorded yet
      lastLoginDate: lastLoginDate || new Date(),
      contentChangeRate: `${totalContentItems} active objects`,
      contactClicksCount,
      bookConsultationClicksCount,
      submissions: cleanSubmissions
    });
  } catch (error: any) {
    console.error('Admin dashboard stats GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Log login event
    await db.collection('admin_logs').insertOne({
      action: 'login',
      timestamp: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin log login POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
