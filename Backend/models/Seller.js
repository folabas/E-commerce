const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  businessName: String,
  businessEmail: String,
  yearInBusiness: Date,
  phoneNumber: String,
  businessDescription: String,
  nin: String,
  socialMedia: String,
});

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;
