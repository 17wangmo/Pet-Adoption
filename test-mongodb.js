// test-mongodb.js
require('dotenv').config({ path: '.env.local' }); // Specify the path

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function testConnection() {
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined. Check your .env.local file.");
    return;
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
    const dbs = await client.db().admin().listDatabases();
    console.log("Databases:", dbs.databases.map(db => db.name));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  } finally {
    await client.close();
  }
}

testConnection();