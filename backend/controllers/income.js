const Income = require('../models/IncomeModel');

// Add a new income
exports.addIncome = async (req, res) => {
  try {
    const newIncome = new Income({
      ...req.body,
      userId: req.user._id // Associate with the logged-in user
    });
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all incomes for the logged-in user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }); // Filter by user
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an income by ID
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOneAndDelete({ _id: id, userId: req.user._id }); // Filter by user
    if (!income) {
      return res.status(404).json({ message: 'Income not found or unauthorized' });
    }
    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
