require('dotenv').config();
console.log('MONGO_URL:', process.env.MONGO_URL);

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { readdirSync } = require('fs');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Register route should not have authMiddleware
app.use('/api/v1/auth', require('./routes/auth'));

// Apply middleware to all routes except /auth/register
readdirSync('./routes').forEach((route) => {
    if (route !== 'auth.js') {
        app.use('/api/v1', require('./routes/' + route));
    }
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

startServer();
