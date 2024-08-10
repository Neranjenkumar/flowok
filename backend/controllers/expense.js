const ExpenseSchema = require("../models/ExpenseModel");
const multer = require('multer');
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function(req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        console.log('Generated filename:', filename);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage }).single('file');

// Add Expense
exports.addExpense = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('File upload error:', err.message);
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }

        console.log('File info:', req.file);
        console.log('Request body:', req.body);

        const { title, amount, category, description, date } = req.body;
        const file = req.file ? req.file.path : null;

        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        try {
            const expense = new ExpenseSchema({
                title,
                amount,
                category,
                description,
                date,
                file // Save the file path
            });

            await expense.save();
            res.status(200).json({ message: 'Expense Added' });
            console.log('Expense saved:', expense);
        } catch (error) {
            console.error('Error saving expense:', error.message);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });
};

// Get Expenses
exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error('Error deleting expense:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
