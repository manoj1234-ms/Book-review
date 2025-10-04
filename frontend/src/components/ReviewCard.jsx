import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review, isOwn, onDelete }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">User: {review.user?.name || 'Anonymous'}</h6>
        <p className="card-text">Rating: {renderStars(review.rating)}</p>
        <p className="card-text">{review.text}</p>
        {isOwn && (
          <div>
            <Link to={`/edit-review/${review._id}`} className="btn btn-warning me-2">Edit</Link>
            <button onClick={() => onDelete(review._id)} className="btn btn-danger">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
