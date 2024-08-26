// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('./authMiddleware'); // Adjust the path if necessary
// const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');

// // Apply authenticateToken middleware to protect these routes
// router.post('/add-expense', authenticateToken, addExpense);
// router.get('/get-expenses', authenticateToken, getExpenses);
// router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('./authMiddleware'); // Adjust the path if necessary
// const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');

// // Apply authenticateToken middleware to protect these routes
// router.post('/add-expense', authenticateToken, addExpense);
// router.get('/get-expenses', authenticateToken, getExpenses);
// router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

// module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateToken = require('./authMiddleware');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');

// Apply authenticateToken middleware to protect these routes
router.post('/add-expense', authenticateToken, addExpense);
router.get('/get-expenses', authenticateToken, getExpenses);
router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

module.exports = router;
