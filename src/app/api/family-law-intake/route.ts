import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Parse files
    const file = formData.get('identityFile') as File | null;
    let identityUrl = '';

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload buffer directly to Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'yantra_legal_intakes' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });
      identityUrl = uploadResult.secure_url;
    }

    // Parse all form fields
    const intakeData = {
      // Client Info
      clientName: {
        first: formData.get('clientName_first') || '',
        middle: formData.get('clientName_middle') || '',
        last: formData.get('clientName_last') || '',
        other: formData.get('clientName_other') || '',
      },
      clientDob: {
        day: formData.get('clientDob_day') || '',
        month: formData.get('clientDob_month') || '',
        year: formData.get('clientDob_year') || '',
      },
      clientGender: formData.get('clientGender') || '',
      clientAddress: {
        street: formData.get('clientAddress_street') || '',
        street2: formData.get('clientAddress_street2') || '',
        suburb: formData.get('clientAddress_suburb') || '',
        state: formData.get('clientAddress_state') || '',
        postcode: formData.get('clientAddress_postcode') || '',
      },
      clientPhone: formData.get('clientPhone') || '',
      clientEmail: formData.get('clientEmail') || '',
      clientLivingInAustraliaSince: formData.get('clientLivingInAustraliaSince') || '',
      clientOccupation: formData.get('clientOccupation') || '',

      // Other Party Info
      otherPartyName: {
        first: formData.get('otherPartyName_first') || '',
        middle: formData.get('otherPartyName_middle') || '',
        last: formData.get('otherPartyName_last') || '',
        other: formData.get('otherPartyName_other') || '',
      },
      otherPartyDob: {
        day: formData.get('otherPartyDob_day') || '',
        month: formData.get('otherPartyDob_month') || '',
        year: formData.get('otherPartyDob_year') || '',
      },
      otherPartyGender: formData.get('otherPartyGender') || '',
      otherPartyAddress: {
        street: formData.get('otherPartyAddress_street') || '',
        street2: formData.get('otherPartyAddress_street2') || '',
        suburb: formData.get('otherPartyAddress_suburb') || '',
        state: formData.get('otherPartyAddress_state') || '',
        postcode: formData.get('otherPartyAddress_postcode') || '',
      },
      otherPartyPhone: formData.get('otherPartyPhone') || '',
      otherPartyEmail: formData.get('otherPartyEmail') || '',
      otherPartyLivingInAustraliaSince: formData.get('otherPartyLivingInAustraliaSince') || '',
      otherPartyOccupation: formData.get('otherPartyOccupation') || '',

      // Children Info
      children: [
        {
          name: formData.get('child1_name') || '',
          dob: formData.get('child1_dob') || '',
        },
        {
          name: formData.get('child2_name') || '',
          dob: formData.get('child2_dob') || '',
        },
        {
          name: formData.get('child3_name') || '',
          dob: formData.get('child3_dob') || '',
        },
        {
          name: formData.get('child4_name') || '',
          dob: formData.get('child4_dob') || '',
        },
      ].filter(child => child.name || child.dob),

      // Relationship Info
      applicationType: formData.get('applicationType') || '',
      relationshipCommencement: formData.get('relationshipCommencement') || '',
      dateOfMarriage: formData.get('dateOfMarriage') || '',
      isSeparated: formData.get('isSeparated') || '',
      dateOfSeparation: formData.get('dateOfSeparation') || '',
      dateOfDivorce: formData.get('dateOfDivorce') || '',

      // Seeked advice & Referral
      legalAdviceSought: formData.getAll('legalAdviceSought') || [],
      referralSource: formData.get('referralSource') || '',
      additionalInfo: formData.get('additionalInfo') || '',

      // ID Verification
      identityUrl: identityUrl,
      agreedToTerms: formData.get('agreedToTerms') === 'true',
      timestamp: new Date(),
    };

    // Save to Database
    const { db } = await connectToDatabase();
    const result = await db.collection('family_law_intakes').insertOne(intakeData);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Intake form submitted successfully.',
    });
  } catch (error: any) {
    console.error('Client intake API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
