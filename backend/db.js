const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};
console.log('db.js loaded');
module.exports = connectDB;

