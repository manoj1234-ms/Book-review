const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const auth = require('../middleware/auth');
const bookController = require('../Controllers/bookcontroller');
const { authUser } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
  }
});
const upload = multer({ storage: storage });

//Add a new book
router.post('/add-book', authUser, upload.single('image'), bookController.createBook);

//Get all books with pagination and filtering
router.get('/', bookController.listBooks);

//Get a single book by ID
router.get('/:id', bookController.getBookDetails);

//Update a book by ID
router.put('/:id', authUser, bookController.updateBook);

//Update purchase link for a book
router.put('/:id/purchase-link', authUser, bookController.updatePurchaseLink);

//Delete a book by ID
router.delete('/:id', authUser, bookController.deleteBook);

module.exports = router;
