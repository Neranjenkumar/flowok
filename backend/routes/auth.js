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

    // Check if user is trying to register as Admin
    if (userType === 'Admin') {
        if (secretKey !== process.env.ADMIN_SECRET) {
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

// Forgot Password Endpoint
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>To reset your password, click on the link below:</p><a href="${resetLink}">Reset Password</a>`,
        });

        res.status(200).json({ status: 'ok', message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Reset Password Endpoint
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        user.password = encryptedPassword;
        await user.save();

        res.status(200).json({ status: 'ok', message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
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

module.exports = router;
