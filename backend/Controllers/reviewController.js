const Review = require('../models/Review');
const Book = require('../models/books');
const mongoose = require('mongoose');

const addOrUpdateReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, reviewText } = req.body;
    if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).json({message:'Invalid book id'});

    const book = await Book.findById(bookId);
    if(!book) return res.status(404).json({message:'Book not found'});

    // either update if same user already reviewed, or create new
    let review = await Review.findOne({ bookId, userId: req.user._id });
    if(review) {
      review.rating = rating;
      review.reviewText = reviewText;
      await review.save();
    } else {
      review = await Review.create({ bookId, userId: req.user._id, rating, reviewText });
    }

    // recalculate average & count
    const agg = await Review.aggregate([
      { $match: { bookId: book._id } },
      { $group: { _id: '$bookId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    if(agg.length) {
      book.averageRating = Number(agg[0].avgRating.toFixed(2));
      book.reviewsCount = agg[0].count;
    } else {
      book.averageRating = 0;
      book.reviewsCount = 0;
    }
    await book.save();

    res.json({ review, averageRating: book.averageRating, reviewsCount: book.reviewsCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review) return res.status(404).json({message:'Review not found'});
    if(review.userId.toString() !== req.user._id.toString()) return res.status(403).json({message:'Not authorized'});
    await review.remove();

    // update book stats
    const agg = await Review.aggregate([
      { $match: { bookId: mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: '$bookId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const book = await Book.findById(bookId);
    if(agg.length) {
      book.averageRating = Number(agg[0].avgRating.toFixed(2));
      book.reviewsCount = agg[0].count;
    } else {
      book.averageRating = 0;
      book.reviewsCount = 0;
    }
    await book.save();

    res.json({ message: 'Deleted', averageRating: book.averageRating, reviewsCount: book.reviewsCount });
  } catch(err){
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addOrUpdateReview, deleteReview };
