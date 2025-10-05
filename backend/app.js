// server.js
const express = require('express');
const connectDB = require('./Config/db')
const dotenv = require('dotenv');
const cors = require('cors');
const user = require('./Routes/user.routes')
const book = require('./Routes/book.routes')
const review = require('./Routes/reviewroutes')

const app = express();
dotenv.config();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json()); // Enable JSON body parsing
app.use('/uploads', express.static('uploads')); // Serve static files from uploads folder

app.use('/api/auth', user);
app.use('/api/books', book);
app.use('/api', review)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});