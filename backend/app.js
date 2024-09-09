// require('dotenv').config();
// console.log('MONGO_URL:', process.env.MONGO_URL);

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./db');
// const { readdirSync } = require('fs');
// const app = express();

// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// // Register auth routes
// app.use('/api/v1/auth', require('./routes/auth'));

// // Dynamically register all other routes with appropriate prefixes
// readdirSync('./routes').forEach((route) => {
//     if (route === 'expense.js') {
//         app.use('/api/v1/expense', require('./routes/' + route));
//     } else if (route === 'income.js') {
//         app.use('/api/v1/income', require('./routes/' + route));
//     }
// });

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Listening to port: ${PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error.message);
//     }
// };

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// startServer();
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
// Register the user route for paginated users

// Register auth routes
app.use('/api/v1/auth', require('./routes/auth'));

// Dynamically register all other routes with appropriate prefixes
readdirSync('./routes').forEach((route) => {
    if (route === 'expense.js') {
        app.use('/api/v1/expense', require('./routes/' + route));
    } else if (route === 'income.js') {
        app.use('/api/v1/income', require('./routes/' + route));
    }
});
 // This adds your route at /api/v1/get-admin-key

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