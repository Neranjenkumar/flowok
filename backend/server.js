require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch((e) => console.log(e));

// Define User Schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  password: String,
  userType: String,
}, { collection: 'UserInfo' });

const User = mongoose.model('User', userSchema);

const imageSchema = new mongoose.Schema({
  image: String,
}, { collection: 'ImageDetails' });

const Images = mongoose.model('Images', imageSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Registration Endpoint
app.post('/register', async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;
  if (!fname || !lname || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Login Endpoint
app.post('/login-user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '15m' });
      return res.status(200).json({ status: 'ok', data: token, userType: user.userType });
    }
    res.status(400).json({ status: 'error', error: 'Invalid Password' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// User Data Endpoint
app.post('/userData', authMiddleware, async (req, res) => {
  const { email } = req.user;
  try {
    const data = await User.findOne({ email });
    res.status(200).json({ status: 'ok', data: data });
  } catch (error) {
    res.status(401).json({ status: 'error', error: 'Token expired or invalid' });
  }
});

// Forgot Password Endpoint
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', error: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ status: 'ok' });
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Reset Password Endpoints
app.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  try {
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }
    const secret = JWT_SECRET + oldUser.password;
    jwt.verify(token, secret);
    res.status(200).json({ status: 'ok', email: oldUser.email });
  } catch (error) {
    res.status(400).json({ status: 'error', error: 'Invalid or expired token' });
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }
    const secret = JWT_SECRET + oldUser.password;
    jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: id }, { $set: { password: encryptedPassword } });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ status: 'error', error: 'Something went wrong' });
  }
});

// Get All Users with Search
app.get('/getAllUser', async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: 'i' } },
        { email: { $regex: searchData, $options: 'i' } },
      ],
    };
  }
  try {
    const allUser = await User.find(query);
    res.status(200).json({ status: 'ok', data: allUser });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Delete User
app.post('/deleteUser', authMiddleware, async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid });
    res.status(200).json({ status: 'ok', data: 'User deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Upload Image
app.post('/upload-image', async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Get Images
app.get('/get-image', async (req, res) => {
  try {
    const images = await Images.find({});
    res.status(200).json({ status: 'ok', data: images });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Paginated Users
app.get('/paginatedUsers', async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    totalUser: allUser.length,
    pageCount: Math.ceil(allUser.length / limit),
  };

  if (endIndex < allUser.length) {
    results.next = { page: page + 1 };
  }
});
  results();
