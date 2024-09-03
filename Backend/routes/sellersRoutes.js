// // // routes/sellerRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const Seller = require('../models/Seller');
// // const jwt = require('jsonwebtoken');

// // // POST /api/seller/signup - Register a new seller
// // router.post('/signup', async (req, res) => {
// //   const { email, password, name } = req.body;

// //   try {
// //     if (!email || !password || !name) {
// //       return res.status(400).json({ message: 'All fields are required' });
// //     }

// //     let seller = await Seller.findOne({ email });
// //     if (seller) {
// //       return res.status(400).json({ message: 'Seller already exists' });
// //     }

// //     seller = new Seller({ email, password, name });
// //     await seller.save();

// //     res.status(201).json({ message: 'Seller registered successfully' });
// //   } catch (error) {
// //     console.error('Signup error:', error.message);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // POST /api/seller/login - Login a seller
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     if (!email || !password) {
// //       return res.status(400).json({ message: 'Email and password are required' });
// //     }

// //     const seller = await Seller.findOne({ email });
// //     if (!seller) {
// //       return res.status(400).json({ message: 'Seller not found' });
// //     }

// //     const isMatch = await seller.comparePassword(password);

// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

// //     res.status(200).json({ 
// //       token, 
// //       name: seller.name 
// //     });
// //   } catch (error) {
// //     console.error('Login error:', error.message);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;
// // routes/sellerRoutes.js

// const express = require('express');
// const router = express.Router();
// const sellerController = require('../controllers/sellerController');

// // POST /api/sellers - Create a seller account
// router.post('/', sellerController.createSeller);

// // GET /api/sellers/:id - Get a seller's details by ID
// router.get('/:id', sellerController.getSellerById);

// // PUT /api/sellers/:id - Update a seller's details
// router.put('/:id', sellerController.updateSeller);

// // DELETE /api/sellers/:id - Delete a seller's account
// router.delete('/:id', sellerController.deleteSeller);

// module.exports = router;
