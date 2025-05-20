import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Animal from '../../../../models/Animal';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const animals = await Animal.find().sort({ name: 1 });
    return NextResponse.json(animals);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching animals' }, { status: 500 });
  }
} 