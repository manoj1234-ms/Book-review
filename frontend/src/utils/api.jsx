import axios from 'axios';

// All API requests will go to this base URL
// Make sure this matches the port your backend is running on
const API = axios.create({ baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}` });

// This function acts as a "middleware" for your frontend requests.
// Before any request is sent, it checks for a token in localStorage.
// If a token exists, it adds it to the Authorization header.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// === AUTHENTICATION ROUTES ===
// Sends a POST request to log in a user
export const loginUser = (formData) => API.post('/auth/login', formData);
// Sends a POST request to register a new user
export const registerUser = (formData) => API.post('/auth/signup', formData);
// Sends a GET request to log out a user
export const logoutUser = () => API.get('/auth/logout');

// === BOOK ROUTES ===
// Fetches a paginated list of books
export const fetchBooks = (page, searchQuery = '') => {
  let url = `/books?page=${page}`;
  if (searchQuery.trim()) {
    url += `&search=${encodeURIComponent(searchQuery.trim())}`;
  }
  return API.get(url);
};
// Fetches a single book by its ID
export const fetchBookById = (id) => API.get(`/books/${id}`);
// Sends a POST request to add a new book
export const createBook = (bookData) => API.post('/books', bookData);
// Sends a PUT request to update an existing book
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
// Sends a PUT request to update purchase link for a book
export const updatePurchaseLink = (id, purchaseLink) => API.put(`/books/${id}/purchase-link`, { purchaseLink });
// Sends a DELETE request to remove a book
export const deleteBook = (id) => API.delete(`/books/${id}`);

// === REVIEW ROUTES ===
// Fetches all reviews for a specific book
export const fetchReviewsForBook = (bookId) => API.get(`/reviews/book/${bookId}`);
// Fetches a single review by its ID
export const fetchReviewById = (id) => API.get(`/reviews/${id}`);
// Sends a POST request to add a new review for a book
export const addReview = (bookId, reviewData) => API.post(`/reviews/${bookId}`, reviewData);
// Sends a PUT request to update an existing review
export const updateReview = (id, reviewData) => API.put(`/reviews/${id}`, reviewData);
// Sends a DELETE request to remove a review
export const deleteReview = (reviewId) => API.delete(`/reviews/${reviewId}`);
