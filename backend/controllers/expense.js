const Expense = require('../models/ExpenseModel');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Assuming this is your User model

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Files of type jpeg, jpg, png, and pdf only!');
    }
  }
}).single('file');

// Add Expense
// Add Expense
exports.addExpense = (req, res) => {
  console.log('Received request with user:', req.user);  // Debug log
  console.log('Received expense data:', req.body);
  console.log('Authenticated userId:', req.user.id);

  upload(req, res, async (err) => {
      if (err) {
          console.error('File upload error:', err.message);
          return res.status(500).json({ message: 'File upload error', error: err.message });
      }

      const { title, amount, category, description, date } = req.body;
      const file = req.file ? req.file.path : null;

      if (!title || !category || !description || !date) {
          return res.status(400).json({ message: 'All fields are required!' });
      }
      if (amount <= 0 || isNaN(amount)) {
          return res.status(400).json({ message: 'Amount must be a positive number!' });
      }

      try {
          if (!req.user || !req.user.id) {
              return res.status(401).json({ message: 'Unauthorized: No user information found' });
          }

          const expense = new Expense({
              userId: req.user.id,  // Ensure this is set correctly
              title,
              amount,
              category,
              description,
              date,
              file // Save the file path
          });

          await expense.save();
          res.status(201).json({ message: 'Expense Added', expense });
      } catch (error) {
          console.error('Error saving expense:', error.message);
          res.status(500).json({ message: 'Server Error', error: error.message });
      }
  });
};

// // Get Expenses
// exports.getExpenses = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json(expenses);
//   } catch (error) {
//     console.error('Error fetching expenses:', error.message);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };
exports.getExpenses = async (req, res) => {
  try {
      const { email } = req.query;

      // Check if the logged-in user is an admin
      if (req.user.userType === 'Admin') {
          if (email) {
              // Admin wants to fetch a specific user's expenses by email
              // const users = await User.findOne({ email });
              const user = await User.findOne({ email: email });
              
              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }
              // Fetch expenses for the specified user
              const expenses = await Expense.find({ userId: user.id });
              return res.status(200).json(expenses);
          } else {
              // If no email is provided, return an error (Admins must provide an email)
              return res.status(400).json({ message: 'Email is required for admin queries' });
          }
      } else {
          // If the user is not an admin, fetch their own expenses
          const expenses = await Expense.find({ userId: req.user.id});
          if (!expenses || expenses.length === 0) {
              return res.status(404).json({ message: 'No expenses found' });
          }
          res.status(200).json(expenses);
      }
  } catch (error) {
      console.error('Error fetching expenses:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};