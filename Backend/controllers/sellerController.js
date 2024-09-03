// const Seller = require('../models/Seller');

// // Create a new seller account
// exports.createSeller = async (req, res) => {
//   const {
//     businessName,
//     businessEmail,
//     yearInBusiness,
//     phoneNumber,
//     businessDescription,
//     nin,
//     socialMedia,
//   } = req.body;

//   // Validate input
//   if (!businessEmail || typeof businessEmail !== 'string' || businessEmail.trim() === '') {
//     return res.status(400).json({ message: 'Business email is required and must be a non-empty string.' });
//   }

//   try {
//     // Check if a seller with the same email already exists
//     const existingSeller = await Seller.findOne({ businessEmail });
//     if (existingSeller) {
//       return res.status(400).json({ message: 'A seller with this email already exists.' });
//     }

//     seller = new Seller({
//       businessName,
//       businessEmail,
//       yearInBusiness,
//       phoneNumber,
//       businessDescription,
//       nin,
//       socialMedia,
//     });

//     await seller.save();
//     res.status(201).json({ message: 'Seller account created successfully', seller });
//   } catch (error) {
//     console.error('Error creating seller account:', error.message);

//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'A seller with this email already exists.' });
//     }

//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Get a seller's details by ID
// exports.getSellerById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const seller = await Seller.findById(id);
//     if (!seller) {
//       return res.status(404).json({ message: 'Seller not found' });
//     }
//     res.status(200).json(seller);
//   } catch (error) {
//     console.error('Error retrieving seller:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update a seller's details
// exports.updateSeller = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedData = req.body;
//     const seller = await Seller.findByIdAndUpdate(id, updatedData, { new: true });
//     if (!seller) {
//       return res.status(404).json({ message: 'Seller not found' });
//     }
//     res.status(200).json({ message: 'Seller updated successfully', seller });
//   } catch (error) {
//     console.error('Error updating seller:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete a seller's account
// exports.deleteSeller = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const seller = await Seller.findByIdAndDelete(id);
//     if (!seller) {
//       return res.status(404).json({ message: 'Seller not found' });
//     }
//     res.status(200).json({ message: 'Seller deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting seller:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
