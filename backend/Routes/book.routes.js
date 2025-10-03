const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const bookController = require('../Controllers/bookcontroller');
const authMiddleware = require('../middleware/auth');

//Add a new book
router.post('/add',authMiddleware, bookController.createBook);

//Get all books with pagination and filtering
router.get('/', bookController.listBooks);

//Get a single book by ID
router.get('/:id', bookController.getBookDetails);

//Update a book by ID
router.put('/:id', authMiddleware, bookController.updateBook);

//Delete a book by ID
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;