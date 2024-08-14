const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },            // First Name
  lname: { type: String, required: true },            // Last Name
  email: { type: String, required: true, unique: true }, // Email with unique constraint
  password: { type: String, required: true }, // Password
  userType: { type: String, required: true }, // User Type (e.g., admin, user)
}, {
  collection: 'UserInfo' // Specify the collection name
});

const User = mongoose.model('UserInfo', userSchema); // Define the model name

module.exports = User;
