const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: [true, 'Business email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  yearInBusiness: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  businessDescription: {
    type: String,
    required: true,
  },
  nin: {
    type: Number,
    required: true,
  },
  socialMedia: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
