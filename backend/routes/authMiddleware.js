const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path if necessary

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    try {
      const foundUser = await User.findById(user.id);
      if (!foundUser) return res.sendStatus(404); // Not Found

      req.user = foundUser;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports = authenticateToken;
