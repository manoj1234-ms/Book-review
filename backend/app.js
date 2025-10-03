// server.js
const express = require('express');
const connectDB = require('./Config/db')
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

app.use('/api/auth', require('./Routes/user.routes'));
app.use('/api/books', require('./Routes/book.routes'));
app.use('/api', require('./Routes/reviewroutes'))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});