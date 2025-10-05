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

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local frontend for dev
  process.env.FRONTEND_URL   // Deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like curl or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight requests for all routes
app.options("*", cors());

// ✅ Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static('uploads')); // Serve uploaded files

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
