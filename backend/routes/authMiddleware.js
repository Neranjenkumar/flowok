const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure to require your User model
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // Fetch user from DB to check userType
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user.isAdmin = user.userType === 'Admin';  // Set isAdmin flag based on userType
        console.log('Verified User:', req.user);  // Debug log
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;