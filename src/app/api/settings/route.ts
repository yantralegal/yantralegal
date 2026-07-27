import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const settingsArray = await db.collection('site_settings').find({}).toArray();
    
    // Map array to key-value record object
    const settingsRecord: Record<string, string> = {};
    settingsArray.forEach((item: any) => {
      settingsRecord[item.key] = item.value;
    });

    // Seed defaults if empty
    if (Object.keys(settingsRecord).length === 0) {
      const defaults = [
        { key: 'phone', label: 'Firm Phone Number', value: '+61 402 402 120', category: 'Contact' },
        { key: 'email', label: 'Firm Email Address', value: 'info@yantralegal.com.au', category: 'Contact' },
        { key: 'address', label: 'Office Address', value: 'Sydney NSW 2000', category: 'Contact' },
        { key: 'postalAddress', label: 'Postal Address', value: 'GPO Box 1230, Sydney NSW 2001', category: 'Contact' },
        { key: 'whatsapp', label: 'WhatsApp Number', value: '61402402120', category: 'Social' },
        { key: 'consultationFee', label: 'Initial Consultation Fee', value: '$150', category: 'General' },
        { key: 'consultationDuration', label: 'Consultation Duration', value: '30 mins', category: 'General' },
        { key: 'is_live_on_main', label: 'Go Live on Production Domain', value: 'false', category: 'System' }
      ];
      defaults.forEach((item) => {
        settingsRecord[item.key] = item.value;
      });
    }

    return Response.json({ settings: settingsRecord });
  } catch (error: any) {
    console.error('Public settings GET error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
