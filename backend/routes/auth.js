const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const authMiddleware = require('./authMiddleware');

// Registration Endpoint
router.post('/register', async (req, res) => {
    const { fname, lname, email, password, userType, secretKey } = req.body;

    if (!fname || !lname || !email || !password || !userType) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const adminKey = process.env.ADMIN_KEY || "No key found!";
    // Check if user is trying to register as Admin
    if (userType === 'Admin') {
        if (secretKey !== adminKey) {
            return res.status(403).json({ error: 'Invalid Admin Secret Key' });
        }
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            userType,
        });

        res.status(201).json({ status: 'ok', message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Login Endpoint
router.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ status: 'ok', token, userType: user.userType });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});


// router.post('/userData', async (req, res) => {
//   const { email } = req.User;
//   const { token } = req.body;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const data = await User.findOne({ email });
//   console.log(data)

//   try {
//     const data = await User.findOne({ email });
//     res.status(200).json({ status: 'ok', data: data });
//   } catch (error) {
//     res.status(401).json({ status: 'error', error: 'Token expired or invalid' });
//   }
// });

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      // console.log(oldUser)
      // console.log(oldUser._id)
      // console.log(oldUser.email)
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const id = oldUser._id;
      const token = jwt.sign(
        { id: oldUser._id, email: oldUser.email, userType: oldUser.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
      // console.log(token);
      const link = `http://localhost:5000/api/v1/auth/reset-password/${id}/${token}`;
      console.log(link);
    const transporter = nodemailer.createTransport({
      // host: 'smtp-relay.brevo.com',
      // port:587,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Project Cash Flow" <${process.env.EMAIL_USERNAME}>`,  // Display name and email
      to: email,
      subject: 'Password Reset Request - Action Required',
      html: `
        <p>Dear ${oldUser.fname},</p>
        
        <p>We received a request to reset your password for your account. If you made this request, please click the button below to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        
        <p style="text-align: center;">
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
        </p>
        
        <p>If you are having trouble with the button above, copy and paste the following link into your web browser:</p>
        <p><a href="${link}">${link}</a></p>
        
        <p>Thank you,<br/>The Your Company Team</p>
        
        <hr/>
        <p style="font-size: 12px; color: gray;">If you did not request a password reset, please ignore this email or contact our support team for assistance.</p>
      `,
    };
    

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({ status: 'ok'});
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {}
  });
  
router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    // console.log(oldUser);
    // console.log(oldUser._id);
    // console.log(oldUser.email);
    // console.log(token);
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      res.render("index", { email: verify.email, status:"Not Verified" });
    } catch (error) {
      console.log(error);
      //res.send("Not Verified");
     }
  });


router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      //res.json({ status: "password updatd" });
      res.render("index", { email: verify.email, status: "Verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });

// Income and Expense Routes (Protected)
router.post('/add-income', authMiddleware, async (req, res) => {
    const { title, amount, date, category, description } = req.body;
    try {
        const income = new Income({
            userId: req.user._id,
            title,
            amount,
            date,
            category,
            description
        });
        await income.save();
        res.status(201).json({ status: 'ok', data: income });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/get-income', authMiddleware, async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user._id });
        res.status(200).json({ status: 'ok', data: incomes });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.post('/add-expense', authMiddleware, async (req, res) => {
    const { title, amount, date, category, description, file } = req.body;
    try {
        const expense = new Expense({
            userId: req.user._id,
            title,
            amount,
            date,
            category,
            description,
            file
        });
        await expense.save();
        res.status(201).json({ status: 'ok', data: expense });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/get-expense', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id });
        res.status(200).json({ status: 'ok', data: expenses });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

//for admin
router.get('/get-admin-key', (req, res) => {
    const adminKey = process.env.ADMIN_KEY;  // Use the .env variable from the backend
    res.json({ adminKey });
  });

//email search
router.get('/email/:email', async (req, res) => {
    const email = req.params.email;  // Get email from URL params
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
