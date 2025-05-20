import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Successfully connected to MongoDB Atlas!');
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Connected to MongoDB Atlas successfully!',
      database: 'pet-adoption'
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 