import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'guinea-pig', 'rabbit']
  }
}, { collection: 'Animal' });

const Animal = mongoose.models.Animal || mongoose.model('Animal', animalSchema);

export default Animal; 