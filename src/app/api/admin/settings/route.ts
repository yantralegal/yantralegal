import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Seed default settings if empty
    const count = await db.collection('site_settings').countDocuments();
    if (count === 0) {
      await db.collection('site_settings').insertMany([
        { key: 'phone', label: 'Firm Phone Number', value: '+61 402 402 120', category: 'Contact' },
        { key: 'email', label: 'Firm Email Address', value: 'info@yantralegal.com.au', category: 'Contact' },
        { key: 'address', label: 'Office Address', value: 'Sydney NSW 2000', category: 'Contact' },
        { key: 'postalAddress', label: 'Postal Address', value: 'GPO Box 1230, Sydney NSW 2001', category: 'Contact' },
        { key: 'whatsapp', label: 'WhatsApp Number', value: '61402402120', category: 'Social' },
        { key: 'consultationFee', label: 'Initial Consultation Fee', value: '$150', category: 'General' },
        { key: 'consultationDuration', label: 'Consultation Duration', value: '30 mins', category: 'General' },
        { key: 'is_live_on_main', label: 'Go Live on Production Domain', value: 'false', category: 'System' }
      ]);
    }

    const settings = await db.collection('site_settings').find({}).toArray();
    return Response.json({ settings });
  } catch (error: any) {
    console.error('Admin settings GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { key, label, value, category } = body;

    if (!key || !label || value === undefined) {
      return Response.json({ error: 'Key, label, and value are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const existing = await db.collection('site_settings').findOne({ key });

    if (existing) {
      await db.collection('site_settings').updateOne(
        { key },
        { $set: { label, value, category: category || 'General' } }
      );
      return Response.json({ success: true, message: 'Setting updated successfully' });
    } else {
      await db.collection('site_settings').insertOne({
        key,
        label,
        value,
        category: category || 'General'
      });
      return Response.json({ success: true, message: 'Setting created successfully' });
    }
  } catch (error: any) {
    console.error('Admin settings POST error:', error);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized(request.headers.get('Authorization')))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return Response.json({ error: 'Key parameter is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('site_settings').deleteOne({ key });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Setting not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Setting deleted successfully' });
  } catch (error: any) {
    console.error('Admin settings DELETE error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
