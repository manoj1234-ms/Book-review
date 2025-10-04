import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../utils/api.jsx';

const AddBookPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('author', formData.author);
      formPayload.append('description', formData.description);
      formPayload.append('genre', formData.genre);
      formPayload.append('year', formData.year);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      await createBook(formPayload);
      navigate('/'); // Redirect to homepage after successful addition
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add New Book</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Book Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
