// controllers/income.js
const Income = require('../models/IncomeModel'); // Ensure this path is correct
const User = require('../models/User');

// Add Income
// controllers/income.js
exports.addIncome = async (req, res) => {
    try {
        const { title, amount, date, category, description, type } = req.body;

        // Log incoming data for debugging
        console.log('Received income data:', { title, amount, date, category, description, type });

        if (!title || !amount || !date || !category || !description) { // No need to check for 'type'
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newIncome = new Income({
            title,
            amount,
            date,
            category,
            description,
            type: type || 'income', // Default to 'income' if type is not provided
            userId: req.user.id
        });

        await newIncome.save();
        console.log('Income saved successfully:', newIncome);
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// // Get Incomes
// exports.getIncomes = async (req, res) => {
//     try {
//         // Fetch incomes for the authenticated user
//         const incomes = await Income.find({ userId: req.user.id });
//         if (!incomes) {
//             return res.status(404).json({ message: 'No incomes found' });
//         }
//         res.status(200).json(incomes);
//     } catch (error) {
//         console.error('Error fetching incomes:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
// Get Incomes
exports.getIncomes = async (req, res) => {
    try {
        const { email } = req.query;

        // Check if the logged-in user is an admin
        if (req.user.userType === 'Admin') {
            if (email) {
                // Admin wants to fetch a specific user's incomes by email
                // const user = await User.findOne({ email });
                const user = await User.findOne({ email: email });
                console.log(user)
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Fetch incomes for the specified user
                const incomes = await Income.find({ userId: user.id });
                return res.status(200).json(incomes);
            } else {
                // If no email is provided, return an error (Admins must provide an email)
                return res.status(400).json({ message: 'Email is required for admin queries' });
            }
        } else {
            // If the user is not an admin, fetch their own incomes
            const incomes = await Income.find({ userId: req.user.id });
            if (!incomes) {
                return res.status(404).json({ message: 'No incomes found' });
            }
            res.status(200).json(incomes);
        }
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