import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Adoption from '../../../models/Adoption';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '../../../models/User';
import Animal from '../../../models/Animal';

// GET all adoption requests (admin only)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();
    const adoptions = await Adoption.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    return NextResponse.json(adoptions);
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return NextResponse.json(
      { error: 'Error fetching adoption requests' },
      { status: 500 }
    );
  }
}

// POST new adoption request (authenticated users only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to submit an adoption request' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { petName, petType, petBreed, reason, phone, email } = body;

    // Get user ID from session
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const adoption = new Adoption({
      user: user._id,
      petName,
      petType,
      petBreed,
      reason,
      phone,
      email,
      status: 'pending'
    });
    await adoption.save();
    return NextResponse.json(adoption, { status: 201 });
  } catch (error) {
    console.error('Error creating adoption request:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating adoption request' },
      { status: 500 }
    );
  }
}

// New function to get user details
export async function getUserDetails(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

// PATCH: Update adoption status (admin only)
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    await connectDB();
    const { adoptionId, status } = await request.json();

    if (!adoptionId || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const adoption = await Adoption.findByIdAndUpdate(
      adoptionId,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!adoption) {
      return NextResponse.json(
        { error: 'Adoption request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(adoption, { status: 200 });
  } catch (error) {
    console.error('Error updating adoption status:', error);
    return NextResponse.json(
      { error: 'Error updating adoption status' },
      { status: 500 }
    );
  }
} 