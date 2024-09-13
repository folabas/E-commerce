const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true // Indexing userId for faster lookups
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        default: 1 
      },
    },
  ],
}, { timestamps: true }); // Optionally, include timestamps to track creation and update times

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
