require('dotenv').config();
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

const authMiddleware = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and decode user info
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    console.log('Authenticated user:', req.user); 
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message); 
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
