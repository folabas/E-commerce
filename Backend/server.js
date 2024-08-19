require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Address = require('./models/Address');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// POST /api/auth/signup route
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name, surname } = req.body;

  try {
    if (!email || !password || !name || !surname) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ email, password, name, surname });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      token, 
      name: user.name 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/address - Save an address
app.post('/api/address', authMiddleware, async (req, res) => {
  const { name, phoneNumber, street, postalCode, city, state, country } = req.body;
  const userId = req.user.id;

  try {
    const address = new Address({
      user: userId, // Change userId to user to match the schema
      name,
      phoneNumber,
      street,
      postalCode,
      city,
      state,
      country,
    });

    await address.save();
    res.status(201).json({ message: 'Address saved successfully', address });
  } catch (error) {
    console.error('Error saving address:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/address - Get all addresses for the user
app.get('/api/address', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const addresses = await Address.find({ user: userId }); // Change userId to user to match the schema
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error retrieving addresses:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/address/:id - Update an address
app.put('/api/address/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    let address = await Address.findOne({ _id: id, user: userId }); // Change userId to user to match the schema
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const updatedData = req.body;
    address = await Address.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Address updated successfully', address });
  } catch (error) {
    console.error('Error updating address:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/address/:id - Delete an address
app.delete('/api/address/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const address = await Address.findOneAndDelete({ _id: id, user: userId }); // Change userId to user to match the schema
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
