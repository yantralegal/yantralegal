import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
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
    const updates = await db.collection('marquee_updates')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ updates });
  } catch (error: any) {
    console.error('Admin marquee GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!(await isAuthorized(authHeader))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, heading, content, imageUrl, isActive } = body;

    if (!heading || typeof heading !== 'string' || !heading.trim()) {
      return NextResponse.json({ error: 'Heading is required' }, { status: 400 });
    }
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const updateData = {
      heading: heading.trim(),
      content: content.trim(),
      imageUrl: imageUrl || '',
      isActive: isActive !== false,
      updatedAt: new Date()
    };

    if (id && ObjectId.isValid(id)) {
      await db.collection('marquee_updates').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      return NextResponse.json({ success: true, message: 'Update modified successfully' });
    } else {
      const newUpdate = {
        ...updateData,
        createdAt: new Date()
      };
      await db.collection('marquee_updates').insertOne(newUpdate);
      return NextResponse.json({ success: true, message: 'Update created successfully' });
    }
  } catch (error: any) {
    console.error('Admin marquee POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!(await isAuthorized(authHeader))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'A valid ID parameter is required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    await db.collection('marquee_updates').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: 'Update deleted successfully' });
  } catch (error: any) {
    console.error('Admin marquee DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
