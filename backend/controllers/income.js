// controllers/income.js
const Income = require('../models/IncomeModel'); // Ensure this path is correct

// Add Income
exports.addIncome = async (req, res) => {
    try {
        // Ensure the incoming request has the required data
        const { title, amount, date, category, description, type } = req.body;
        if (!title || !amount || !date || !category || !description || !type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new income document
        const newIncome = new Income({
            title,
            amount,
            date,
            category,
            description,
            type,
            userId: req.user.id // Assuming `req.user` is set by `authenticateToken`
        });

        // Save the document to the database
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get Incomes
exports.getIncomes = async (req, res) => {
    try {
        // Fetch incomes for the authenticated user
        const incomes = await Income.find({ userId: req.user.id });
        if (!incomes) {
            return res.status(404).json({ message: 'No incomes found' });
        }
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        // Delete income document by ID and ensure it belongs to the authenticated user
        const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!income) {
            return res.status(404).json({ message: 'Income not found or not authorized' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
