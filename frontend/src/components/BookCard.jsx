import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <div className="card mb-3">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="card-img-top"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Author: {book.author}</p>
        <p className="card-text">Genre: {book.genre}</p>
        <p className="card-text">Year: {book.year}</p>
        <p className="card-text">Average Rating: {renderStars(book.averageRating || 0)}</p>
        <Link to={`/books/${book._id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default BookCard;
