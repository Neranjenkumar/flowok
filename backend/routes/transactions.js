const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const authenticateToken = require('./authMiddleware'); // Adjust path if necessary

const router = require('express').Router();

// Route for adding income
router.post('/add-income', authenticateToken, addIncome);

// Route for getting incomes
router.get('/get-incomes', authenticateToken, getIncomes);

// Route for deleting income by ID
router.delete('/delete-income/:id', authenticateToken, deleteIncome);

// Route for adding expense
router.post('/add-expense', authenticateToken, addExpense);

// Route for getting expenses
router.get('/get-expenses', authenticateToken, getExpenses);

// Route for deleting expense by ID
router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

module.exports = router;
