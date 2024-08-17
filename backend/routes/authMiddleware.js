const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  console.log('authMiddleware invoked on:', req.url); // Add this for debugging
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
