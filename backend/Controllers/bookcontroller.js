const Book = require('../models/books');   // Make sure your model file is correct: models/books.js
const Review = require('../models/Review');
const mongoose = require('mongoose');

// Create Book
const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = req.file.path; // Assuming multer middleware is used and saves file path in req.file.path
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      image: imagePath,
      addedBy: req.user._id
    });

    res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// List Books with Pagination + Search + Filter
const listBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.search) {
      const q = req.query.search;
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ];
    }

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    const [total, books] = await Promise.all([
      Book.countDocuments(filter),
      Book.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      page,
      totalPages,
      books,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Book Details + Reviews
const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId).populate('addedBy', 'firstname lastname email').lean();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const reviews = await Review.find({ bookId })
      .populate('userId', 'firstname lastname')
      .sort({ createdAt: -1 })
      .lean();

    const averageRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    book.reviews = reviews;
    book.averageRating = averageRating;
    book.reviewsCount = reviews.length;

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this book" });
    }

    const fields = ['title', 'author', 'description', 'genre', 'year'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) book[field] = req.body[field];
    });

    await book.save();

    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Purchase Link
const updatePurchaseLink = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { purchaseLink } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this book" });
    }

    book.purchaseLink = purchaseLink;
    await book.save();

    res.json({ message: "Purchase link updated successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this book" });
    }

    await Review.deleteMany({ bookId: book._id });
    await book.remove();

    res.json({ message: "Book and associated reviews deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBook, listBooks, getBookDetails, updateBook, updatePurchaseLink, deleteBook };
