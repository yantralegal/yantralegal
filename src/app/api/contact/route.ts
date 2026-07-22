import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, matter_type, preferred_format, description } = body;

    // Strict validation checks
    const errors: string[] = [];

    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.push('Name is required and cannot be empty.');
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      errors.push('Email is required and cannot be empty.');
    } else {
      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push('Email address is invalid.');
      }
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      errors.push('Phone number is required and cannot be empty.');
    }
    if (!matter_type || typeof matter_type !== 'string' || !['Migration', 'Divorce', 'Appeals', 'Other'].includes(matter_type.trim())) {
      errors.push('Valid Matter Type is required.');
    }
    if (!preferred_format || typeof preferred_format !== 'string' || !['In Person', 'Video'].includes(preferred_format.trim())) {
      errors.push('Valid Preferred Format is required.');
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      errors.push('Description is required and cannot be empty.');
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(' '), details: errors }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      matterType: matter_type.trim(),
      preferredFormat: preferred_format.trim(),
      description: description.trim(),
      timestamp: new Date()
    };

    // Save to database
    await db.collection('contact_submissions').insertOne(submission);

    // Forward to Web3Forms securely from the backend
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '00ff7f6e-1316-43e5-bc22-8cc93fa5a64a',
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          matter_type: submission.matterType,
          preferred_format: submission.preferredFormat,
          description: submission.description,
          subject: 'New Consultation Enquiry - Yantra Legal',
        }),
      });
    } catch (e) {
      console.error('Failed to forward to Web3Forms:', e);
    }

    return NextResponse.json({ success: true, message: 'Submission logged successfully' });
  } catch (error: any) {
    console.error('Contact submission log error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
