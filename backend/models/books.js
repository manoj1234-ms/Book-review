const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  description: { type: String },
  genre: { type: String, index: true },
  year: { type: Number },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  purchaseLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('books', bookSchema);
