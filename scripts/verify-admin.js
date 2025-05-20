import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption';

async function verifyAdmin() {
  try {
    await connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const adminEmail = 'admin@example.com';
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      // Create admin if doesn't exist
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created successfully');
    } else {
      // Update existing user to admin if needed
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log('Updated user to admin role');
      } else {
        console.log('Admin user already exists with correct role');
      }
    }

    console.log('Admin user details:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

verifyAdmin(); 