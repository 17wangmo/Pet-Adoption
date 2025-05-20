import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Animal from '../../../../models/Animal';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database successfully');

    // Get counts for each species
    console.log('Counting animals...');
    const [
      catCount,
      dogCount,
      birdCount,
      guineaPigCount,
      rabbitCount,
      totalCount
    ] = await Promise.all([
      Animal.countDocuments({ species: 'cat' }),
      Animal.countDocuments({ species: 'dog' }),
      Animal.countDocuments({ species: 'bird' }),
      Animal.countDocuments({ species: 'guinea-pig' }),
      Animal.countDocuments({ species: 'rabbit' }),
      Animal.countDocuments({})
    ]);

    console.log('Counts retrieved:', {
      cats: catCount,
      dogs: dogCount,
      birds: birdCount,
      guineaPigs: guineaPigCount,
      rabbits: rabbitCount,
      total: totalCount
    });

    return NextResponse.json({
      success: true,
      counts: {
        cats: catCount,
        dogs: dogCount,
        birds: birdCount,
        guineaPigs: guineaPigCount,
        rabbits: rabbitCount,
        total: totalCount
      }
    });

  } catch (error) {
    console.error('Error getting pet counts:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { success: false, error: 'Failed to get pet counts' },
      { status: 500 }
    );
  }
}