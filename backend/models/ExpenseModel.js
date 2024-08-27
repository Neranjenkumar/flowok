// const mongoose = require('mongoose');

// const ExpenseSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     title: { type: String, required: true },
//     amount: { type: Number, required: true },
//     date: { type: Date, required: true },
//     category: { type: String, required: true },
//     description: { type: String, required: true },
//     file: { type: String },  // Field for file storage
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Expense', ExpenseSchema);
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  file: { type: String } // Path to the uploaded file
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
