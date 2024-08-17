const express = require('express');
const router = express.Router();
const authenticateToken = require('./authMiddleware'); // Adjust the path if necessary
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Apply authenticateToken middleware to protect these routes
router.post('/add-income', authenticateToken, addIncome);
router.get('/get-incomes', authenticateToken, getIncomes);
router.delete('/delete-income/:id', authenticateToken, deleteIncome);

module.exports = router;
