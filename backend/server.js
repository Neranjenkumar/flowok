require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const authMiddleware = require('./middleware/authMiddleware'); // Import the auth middleware
const router = require('./routes/auth'); // Assuming routes/auth.js

// Middleware for parsing request bodies
app.use(express.json());

// Use Routes
app.use('/api/v1/auth', router); // Make sure `authRoutes` is not undefined
app.use('/api/v1/User', User); // Ensure this is properly imported and defined

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure this matches your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Allow cookies if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch((e) => console.log(e));

// Registration Endpoint (No Authentication Required)
app.post('/api/v1/auth/register', async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  if (!fname || !lname || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
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
      const token = jwt.sign({ userId: user._id, email: user.email, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '15m' });
      return res.status(200).json({ status: 'ok', data: token, userType: user.userType });
    }

    res.status(400).json({ status: 'error', error: 'Invalid Password' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// User Data Endpoint (Protected)
// app.post('/userData', authMiddleware, async (req, res) => {
//   const { email } = req.user;
//   const { token } = req.body;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   try {
//     const data = await User.findOne({ email });
//     res.status(200).json({ status: 'ok', data: data });
//   } catch (error) {
//     res.status(401).json({ status: 'error', error: 'Token expired or invalid' });
//   }
// });

// // Forgot Password Endpoint
//  app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await User.findOne({ email });
//     // console.log(oldUser)
//     // console.log(oldUser._id)
//     // console.log(oldUser.email)
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const id = oldUser._id;
//     const token = jwt.sign(
//       { id: oldUser._id, email: oldUser.email, userType: oldUser.userType },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//   );
//     // console.log(token);
//     const link = `http://localhost:5000/reset-password/${id}/${token}`;
//     console.log(link);
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: process.env.EMAIL_USERNAME,
// //         pass: process.env.EMAIL_PASSWORD,
// //       },
// //     });
// //
// //     const mailOptions = {
// //       from: process.env.EMAIL_USERNAME,
// //       to: email,
// //       subject: 'Password Reset',
// //       text: link,
// //     };
// //
//     // transporter.sendMail(mailOptions, function (error, info) {
//     //   if (error) {
//     //     console.log(error);
//     //   } else {
//     //     console.log("Email sent: " + info.response);
//     //   }
//     // });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
//  });

// // // Reset Password Endpoints
// app.get('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//     res.send("working");
//     const oldUser = await User.findOne({ _id: id });
//     // if (!oldUser) {
//     //   return res.json({ status: "User Not Exists!!" });
//     // }
//     // try {
//     //   const verify = jwt.verify(token, process.env.JWT_SECRET);
//     //   res.render("index", { email: verify.email, status: "Not Verified" });
//     // } catch (error) {
//     //   console.log(error);
//     //   res.send("Not Verified");
//     // }
//   });

// app.post('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   try {
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.status(404).json({ status: 'error', error: 'User not found' });
//     }

//     const secret = process.env.JWT_SECRET + oldUser.password;
//     jwt.verify(token, secret);

//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne({ _id: id }, { $set: { password: encryptedPassword } });

//     res.status(200).json({ status: 'ok' });
//   } catch (error) {
//     res.status(400).json({ status: 'error', error: 'Something went wrong' });
//   }
// });

// Get All Users with Search (Protected)
app.get('/getAllUser', authMiddleware, async (req, res) => {
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

// Delete User (Protected)
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

// Paginated Users (Protected)
// app.get('/paginatedUsers', authMiddleware, async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const allUser = await User.find({});
//     const totalUser = allUser.length;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {
//       totalUser,
//       pageCount: Math.ceil(totalUser / limit),
//     };

//     if (endIndex < totalUser) {
//       results.next = { page: page + 1 };
//     }

//     if (startIndex > 0) {
//       results.previous = { page: page - 1 };
//     }

//     results.users = allUser.slice(startIndex, endIndex);
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });
// app.get('/api/v1/get-admin-key', (req, res) => {
//   res.json({ adminKey: 'your_admin_key_here' });
// });
app.get('/paginatedUsers', authenticateToken, async (req, res) => {
  const { page, limit, search } = req.query;

  // Validate query parameters
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const searchTerm = search || '';

  try {
    // Logic to fetch users from the database with pagination and search
    const users = await User.find({ email: { $regex: searchTerm, $options: 'i' } })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUsers = await User.countDocuments({ email: { $regex: searchTerm, $options: 'i' } });

    res.status(200).json({
      users,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
      totalUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

///////////////////
// require('dotenv').config(); // Load environment variables from .env file
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const User = require('./models/User');
// const authMiddleware = require('./middleware/authMiddleware'); // Import the auth middleware

// const app = express();

// // CORS configuration
// app.use(cors({
//   origin: process.env.FRONTEND_URL, // Ensure this matches your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true // Allow cookies if needed
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to database');
// }).catch((e) => console.log(e));

// // Registration Endpoint (No Authentication Required)
// app.post('/api/v1/auth/register', async (req, res) => {
//   const { fname, lname, email, password, userType } = req.body;

//   if (!fname || !lname || !email || !password || !userType) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     await User.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });

//     res.status(201).json({ status: 'ok' });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Login Endpoint
// app.post('/login-user', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ userId: user._id, email: user.email, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '15m' });
//       return res.status(200).json({ status: 'ok', data: token, userType: user.userType });
//     }

//     res.status(400).json({ status: 'error', error: 'Invalid Password' });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // User Data Endpoint (Protected)
// app.post('/userData', authMiddleware, async (req, res) => {
//   const { email } = req.user;

//   try {
//     const data = await User.findOne({ email });
//     res.status(200).json({ status: 'ok', data: data });
//   } catch (error) {
//     res.status(401).json({ status: 'error', error: 'Token expired or invalid' });
//   }
// });

// // Forgot Password Endpoint
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const oldUser = await User.findOne({ email });
//     if (!oldUser) {
//       return res.status(404).json({ status: 'error', error: 'User not found' });
//     }

//     const secret = process.env.JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
//     const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Password Reset',
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ status: 'error', error: 'Error sending email' });
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.status(200).json({ status: 'ok' });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Reset Password Endpoints
// app.get('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;

//   try {
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.status(404).json({ status: 'error', error: 'User not found' });
//     }

//     const secret = process.env.JWT_SECRET + oldUser.password;
//     jwt.verify(token, secret);
//     res.status(200).json({ status: 'ok', email: oldUser.email });
//   } catch (error) {
//     res.status(400).json({ status: 'error', error: 'Invalid or expired token' });
//   }
// });

// app.post('/reset-password/:id/:token', async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   try {
//     const oldUser = await User.findOne({ _id: id });
//     if (!oldUser) {
//       return res.status(404).json({ status: 'error', error: 'User not found' });
//     }

//     const secret = process.env.JWT_SECRET + oldUser.password;
//     jwt.verify(token, secret);

//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne({ _id: id }, { $set: { password: encryptedPassword } });

//     res.status(200).json({ status: 'ok' });
//   } catch (error) {
//     res.status(400).json({ status: 'error', error: 'Something went wrong' });
//   }
// });

// // Get All Users with Search (Protected)
// app.get('/getAllUser', authMiddleware, async (req, res) => {
//   let query = {};
//   const searchData = req.query.search;

//   if (searchData) {
//     query = {
//       $or: [
//         { fname: { $regex: searchData, $options: 'i' } },
//         { email: { $regex: searchData, $options: 'i' } },
//       ],
//     };
//   }

//   try {
//     const allUser = await User.find(query);
//     res.status(200).json({ status: 'ok', data: allUser });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Delete User (Protected)
// app.post('/deleteUser', authMiddleware, async (req, res) => {
//   const { userid } = req.body;

//   try {
//     await User.deleteOne({ _id: userid });
//     res.status(200).json({ status: 'ok', data: 'User deleted' });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Upload Image
// app.post('/upload-image', async (req, res) => {
//   const { base64 } = req.body;

//   try {
//     await Images.create({ image: base64 });
//     res.status(201).json({ status: 'ok' });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Get Images
// app.get('/get-image', async (req, res) => {
//   try {
//     const images = await Images.find({});
//     res.status(200).json({ status: 'ok', data: images });
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });

// // Paginated Users (Protected)
// app.get('/paginatedUsers', authMiddleware, async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const allUser = await User.find({});
//     const totalUser = allUser.length;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {
//       totalUser,
//       pageCount: Math.ceil(totalUser / limit),
//     };

//     if (endIndex < totalUser) {
//       results.next = { page: page + 1 };
//     }

//     if (startIndex > 0) {
//       results.previous = { page: page - 1 };
//     }

//     results.users = allUser.slice(startIndex, endIndex);
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ status: 'error', error: error.message });
//   }
// });
// app.get('/api/v1/get-admin-key', (req, res) => {
//   res.json({ adminKey: 'your_admin_key_here' });
// });

// app.get('/api/users/:email', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });