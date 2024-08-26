// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authenticateToken = (req, res, next) => {
//   console.log('authMiddleware invoked on:', req.url); 
//   console.log(`Middleware invoked on route: ${req.url}`);
  
//   // Header should be checked in lowercase
//   const authHeader = req.headers['authorization'] || req.headers['Authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (!token) {
//     console.log('No token provided');
//     return res.status(401).json({ error: 'Access Denied' });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     console.log('Invalid token');
//     res.status(401).json({ error: 'Invalid Token' });
//   }
// };

// module.exports = authenticateToken;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    console.log('authMiddleware invoked on:', req.url);
    console.log('Request headers:', req.headers);

    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    console.log('Authorization Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token extracted:', token);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, user:', verified);
        req.user = verified;
        next();
    } catch (error) {
        console.log('Invalid token:', error.message);
        res.status(401).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
