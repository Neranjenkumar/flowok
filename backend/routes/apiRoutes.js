// In routes/apiRoutes.js or routes/authRoutes.js (or any existing route file)
const express = require('express');
const router = express.Router();

// Define the new route to send the admin key
router.get('/get-admin-key', (req, res) => {
  const adminKey = process.env.ADMIN_KEY;  // Use the .env variable from the backend
  res.json({ adminKey });
});

module.exports = router;