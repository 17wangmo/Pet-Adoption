import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';

export async function GET() {
  console.log('Testing database connection...');
  
  try {
    // Try to connect to MongoDB
    await connectDB();
    console.log('Successfully connected to MongoDB');
    
    return NextResponse.json(
      { status: 'success', message: 'Connected to MongoDB successfully' },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('MongoDB connection error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to MongoDB',
        error: error.message
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 