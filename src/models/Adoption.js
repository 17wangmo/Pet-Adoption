import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  petBreed: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for adoption'],
    minlength: [5, 'Reason must be at least 5 characters long'],
    maxlength: [1000, 'Reason cannot exceed 1000 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a contact number'],
    match: [/^\+?[\d\s-]{10,}$/, 'Please provide a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
adoptionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

adoptionSchema.methods.isPending = function() {
  return this.status === 'pending';
};

const Adoption = mongoose.models.Adoption || mongoose.model('Adoption', adoptionSchema);

export default Adoption; 