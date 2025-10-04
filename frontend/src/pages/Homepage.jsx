import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../utils/api.jsx';
import Loading from '../components/Loading.jsx';
import sampleBooks from '../data/sampleBooks.js';

const HomePage = () => {
  // === STATE MANAGEMENT ===
  // Holds the response from the API, including the list of books and total page count.
  const [data, setData] = useState({ books: sampleBooks, totalPages: 1 });
  // Tracks the current page number for pagination.
  const [currentPage, setCurrentPage] = useState(1);
  // Manages the loading state to show a spinner while data is being fetched.
  const [loading, setLoading] = useState(false);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for input field value (controlled input)
  const [inputValue, setInputValue] = useState('');
  // State to trigger search on button click
  const [searchTrigger, setSearchTrigger] = useState(false);

  // === DATA FETCHING EFFECT ===
  // This `useEffect` hook runs whenever the `currentPage` or `searchTrigger` state changes.
  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true); // Show the loading spinner before starting the API call.
        const response = await fetchBooks(currentPage, searchQuery);
        setData(response.data); // Update the state with the fetched books and page info.
      } catch (error) {
        console.error("Failed to fetch books:", error);
        // You could add state here to show an error message to the user.
      } finally {
        setLoading(false); // Hide the loading spinner after the API call is complete.
      }
    };

    getBooks();
  }, [currentPage, searchTrigger]); // The dependency array ensures this effect re-runs when `currentPage` or `searchTrigger` changes.

  // Handle search button click
  const handleSearch = () => {
    setSearchQuery(inputValue.trim());
    setCurrentPage(1); // Reset to first page on new search
    setSearchTrigger(!searchTrigger); // Toggle to trigger useEffect
  };

  // === CONDITIONAL RENDERING ===
  // If the data is still being fetched, display the Loading component.
  if (loading) return <Loading />;

  // === JSX RENDER ===
  return (
    <div className="allbooks container mt-4">
      <h1 className="mb-4">All Books</h1>

      {/* Search bar */}
      <div className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search books..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      
      {/* Display the list of books or a message if none are found */}
      {data.books.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {data.books.map((book) => (
            <div key={book._id} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={book.img}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text flex-grow-1">{book.description}</p>
                  <p className="mb-1"><strong>Author:</strong> {book.author}</p>
                  <p className="mb-1"><strong>Genre:</strong> {book.genre}</p>
                  <p className="mb-1"><strong>Published:</strong> {book.year}</p>
                  <p className="mb-1"><strong>Rating:</strong> {book.averageRating} / 5</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link to={`/books/${book._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        if (!cart.find(item => item._id === book._id)) {
                          cart.push(book);
                          localStorage.setItem('cart', JSON.stringify(cart));
                          alert('Added to cart');
                        } else {
                          alert('Book already in cart');
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        window.location.href = '/orders';
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No books have been added yet. Be the first!</div>
      )}

      {/* Pagination Controls */}
      <nav className="mt-4" aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage >= data.totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
