import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!(await isAuthorized(authHeader))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const intakes = await db.collection('family_law_intakes').find({}).sort({ timestamp: -1 }).toArray();
    return NextResponse.json({ success: true, intakes });
  } catch (error: any) {
    console.error('Admin fetch intakes error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
