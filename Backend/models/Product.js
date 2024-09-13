// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  variants: [
    {
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      priceAdjustment: {
        type: Number,
        default: 0,
      },
      stock: {
        type: Number,
        default: 0,
      },
    },
  ],
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
