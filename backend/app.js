require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

const PORT = process.env.PORT || 5000; // Use a default port if not set in .env

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start server function
const server = async () => {
  try {
    await db(); // Await the db connection
    app.listen(PORT, () => {
      console.log('Listening to port:', PORT);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

server();
