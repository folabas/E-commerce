require('dotenv').config();
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  
  console.log('Incoming Token:', token); // Log the token
  console.log('Current Time:', new Date().toISOString());

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    console.log('Decoded token:', req.user);

    // Check if sellerId exists in the database
    if (req.user.sellerId) {
      const seller = await Seller.findById(req.user.sellerId);
      if (!seller) {
        return res.status(401).json({ message: 'Invalid seller ID' });
      }
    }

    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' });
    }
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



module.exports = authMiddleware;
