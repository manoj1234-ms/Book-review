import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchBookById, fetchReviewsForBook, addReview, deleteReview, deleteBook } from '../utils/api.jsx';
import Loading from '../components/Loading.jsx';

const BookDetailsPage = () => {
  // === STATE MANAGEMENT ===
  // State to hold the details of the book being viewed
  const [book, setBook] = useState(null);
  // State to hold all reviews for this book
  const [reviews, setReviews] = useState([]);
  // State for the text of a new review being written
  const [newReviewText, setNewReviewText] = useState('');
  // State for the rating of a new review
  const [newRating, setNewRating] = useState(5);

  // === HOOKS ===
  // Get the book 'id' from the URL (e.g., /books/123)
  const { id } = useParams();
  // Get the navigate function to redirect the user programmatically
  const navigate = useNavigate();
  // Get the current user and their authentication status from the context
  const { user, isAuthenticated } = useContext(AuthContext);

  // === DATA FETCHING EFFECT ===
  // This effect runs once when the component mounts or when the book 'id' in the URL changes.
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        // Fetch both the book details and its reviews from the backend API
        const bookRes = await fetchBookById(id);
        setBook(bookRes.data);
        const reviewsRes = await fetchReviewsForBook(id);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        // Optional: Redirect to a 404 page if the book is not found
      }
    };
    getBookDetails();
  }, [id]); // The effect depends on the 'id' parameter

  // === EVENT HANDLERS ===
  // Handles the submission of the "Add Review" form
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = { reviewText: newReviewText, rating: newRating };
      const response = await addReview(id, reviewData);
      // Add the new review to the local state to update the UI instantly
      setReviews([...reviews, response.data]);
      // Reset the form fields
      setNewReviewText('');
      setNewRating(5);
    } catch (error) {
      console.error("Failed to add review:", error);
      alert("Error: Could not add your review.");
    }
  };

  // Handles the deletion of the entire book
  const handleDeleteBook = async () => {
    // Note: A custom modal would be a better user experience than window.confirm
    if (window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      try {
        await deleteBook(id);
        navigate('/'); // Redirect to the homepage after deletion
      } catch (error) {
        console.error("Failed to delete book:", error);
        alert("Error: Could not delete the book.");
      }
    }
  };
  
  // === DERIVED STATE ===
  // Calculate the average rating from the reviews array
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 'No reviews yet';

  // Show a loading spinner until the book data has been fetched
  if (!book) return <Loading />;

  // === JSX RENDER ===
  return (
    <div className="container card mt-4 p-4">
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <h6 className="card-subtitle mb-2 text-muted">by {book.author} ({book.year})</h6>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p className="card-text">{book.description}</p>
        <p><strong>Average Rating:</strong> {averageRating} / 5</p>

        {/* Show Edit/Delete buttons ONLY if the user is authenticated AND is the one who added the book */}
        {isAuthenticated && user?.id === book.addedBy && (
          <div className="mb-3">
            <button onClick={() => navigate(`/books/${id}/edit`)} className="btn btn-warning me-2">Edit Book</button>
            <button onClick={handleDeleteBook} className="btn btn-danger">Delete Book</button>
          </div>
        )}

        {/* Borrow and Buy buttons */}
        <div className="mb-3">
          <button className="btn btn-info me-2" onClick={() => {
            const borrowed = JSON.parse(localStorage.getItem('borrowed') || '[]');
            if (!borrowed.find(item => item._id === book._id)) {
              borrowed.push(book);
              localStorage.setItem('borrowed', JSON.stringify(borrowed));
              alert('Book borrowed successfully');
            } else {
              alert('Book already borrowed');
            }
          }}>Borrow Book</button>
          <button className="btn btn-success me-2" onClick={() => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (!cart.find(item => item._id === book._id)) {
              cart.push(book);
              localStorage.setItem('cart', JSON.stringify(cart));
              alert('Added to cart');
            } else {
              alert('Book already in cart');
            }
          }}>Add to Cart</button>
          <button className="btn btn-primary" onClick={() => window.location.href = '/orders'}>Buy</button>
        </div>

        <hr />

        {/* Reviews Section */}
        <h4 className="mt-4">Reviews</h4>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="alert alert-secondary">
              <strong>Rating: {review.rating}/5</strong>
              <p className="mb-0">{review.reviewText}</p>
              {/* Add user name here if available, e.g., <small>- {review.userName}</small> */}
            </div>
          ))
        ) : (
          <p>Be the first to review this book!</p>
        )}

        {/* Add Review Form for logged-in users */}
        {isAuthenticated && (
          <form onSubmit={handleReviewSubmit} className="mt-4 border p-3 bg-light rounded">
            <h5>Add Your Review</h5>
            <div className="form-group mb-2">
              <label htmlFor="rating-select">Rating</label>
              <select id="rating-select" className="form-control" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="review-text">Review</label>
              <textarea
                id="review-text"
                className="form-control"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                required
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;

