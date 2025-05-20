import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json(
      { status: 'success', message: 'Database connection successful' },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 