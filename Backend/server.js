require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Address = require('./models/Address');
const Seller = require('./models/Seller');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(cors({
  origin: '*',
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

// Function to setup Nodemailer transporter dynamically
const createTransporter = (emailUser, emailPass) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

const sendSignupEmail = async (userEmail, userName, emailUser, emailPass) => {
  try {
    const transporter = createTransporter(emailUser, emailPass);

    const mailOptions = {
      from: emailUser,
      to: userEmail,
      subject: 'Welcome to Our Service!',
      text: `Hi ${userName},\n\nThank you for signing up. We're excited to have you onboard!`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Signup email sent successfully');
  } catch (error) {
    console.error('Error sending signup email:', error.message);
  }
};

// POST /api/auth/signup route
app.post('/api/auth/signup', async (req, res) => {
  console.log('Received signup request:', req.body);
  const { email, password, name, surname, emailUser, emailPass } = req.body;

  try {
    if (!email || !password || !name || !surname || !emailUser || !emailPass) {
      return res.status(400).json({ message: 'All fields are required, including email credentials' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ email, password, name, surname });
    await user.save();
    console.log('User saved:', user);

    await sendSignupEmail(email, name, emailUser, emailPass);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', { email, password });

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({
      token,
      name: user.name
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/profile - Get user's profile including seller status
app.get('/api/auth/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is a seller
    const isSeller = await Seller.findOne({ user: userId });

    res.status(200).json({
      name: user.name,
      email: user.email,
      isSeller: !!isSeller,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/address - Save an address
app.post('/api/address', authMiddleware, async (req, res) => {
  const { name, phoneNumber, street, postalCode, city, state, country } = req.body;
  const userId = req.user.id;

  try {
    const address = new Address({
      user: userId,
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
    const addresses = await Address.find({ user: userId });
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
    let address = await Address.findOne({ _id: id, user: userId });
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
    const address = await Address.findOneAndDelete({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sellers - Create a seller account
app.post('/api/sellers', async (req, res) => {
  const {
    businessName,
    businessEmail,
    yearInBusiness,
    phoneNumber,
    businessDescription,
    nin,
    socialMedia,
  } = req.body;

  try {
    if (!businessEmail) {
      return res.status(400).json({ message: 'Business email is required.' });
    }

    // Check if a seller with the same email already exists
    const existingSeller = await Seller.findOne({ businessEmail });
    if (existingSeller) {
      return res.status(400).json({ message: 'A seller with this email already exists.' });
    }

    const seller = new Seller({
      businessName,
      businessEmail,
      yearInBusiness,
      phoneNumber,
      businessDescription,
      nin,
      socialMedia,
    });

    await seller.save();
    res.status(201).json({ message: 'Seller account created successfully', seller });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error: ' + error.message });
    }
    console.error('Error creating seller account:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sellers/:id - Get a seller's details by ID
app.get('/api/sellers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (error) {
    console.error('Error retrieving seller:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/sellers/:id - Update a seller's details
app.put('/api/sellers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = req.body;
    const seller = await Seller.findByIdAndUpdate(id, updatedData, { new: true });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json({ message: 'Seller updated successfully', seller });
  } catch (error) {
    console.error('Error updating seller:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/sellers/:id - Delete a seller's account
app.delete('/api/sellers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (error) {
    console.error('Error deleting seller:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
