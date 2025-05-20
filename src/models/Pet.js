import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a pet name'],
    trim: true,
  },
  species: {
    type: String,
    required: [true, 'Please specify pet species'],
    trim: true,
    enum: ['dog', 'cat', 'rabbit', 'bird', 'guinea-pig']
  },
  breed: {
    type: String,
    required: [true, 'Please specify pet breed'],
    trim: true
  },
  age: {
    type: String,
    required: [true, 'Please provide age'],
  },
  image: {
    type: String,
    default: '', // Make image optional with empty string as default
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
petSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);

export default Pet;
