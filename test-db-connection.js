require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');

    // Get the database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('Connected to database:', dbName);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:', collections.map(c => c.name));

    // Try to query the animals collection
    const animals = await mongoose.connection.db.collection('animals').find({}).toArray();
    console.log('\nFound', animals.length, 'animals in the collection');
    
    if (animals.length > 0) {
      console.log('Sample animal document:', animals[0]);
    }

    // Count by species
    const speciesCounts = await mongoose.connection.db.collection('animals').aggregate([
      {
        $group: {
          _id: '$species',
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    console.log('\nCounts by species:', speciesCounts);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection(); 