// server.js
const express = require('express');
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const user = require('./Routes/user.routes');
const book = require('./Routes/book.routes');
const review = require('./Routes/reviewroutes');

dotenv.config();
connectDB();

const app = express();

// // ✅ CORS Configuration
// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL // e.g. "https://book-review-frontend-omega.vercel.app"
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// CORS middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://book-review-frontend-omega.vercel.app"
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// ✅ Handle preflight requests for all routes
app.options(/.*/, cors()); // FIXED: wildcard regex instead of "*"

// ✅ Middleware
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static('uploads')); // serve uploaded files

app.get('/', (req, res) => {
    res.send('Hello World');
});

// ✅ Routes
app.use('/api/auth', user);
app.use('/api/books', book);
app.use('/api', review);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
