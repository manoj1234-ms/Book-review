import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookById, updateBook } from '../utils/api.jsx';
import Loading from '../components/Loading.jsx';

const EditBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetchBookById(id);
        const book = response.data;
        setFormData({
          title: book.title || '',
          author: book.author || '',
          description: book.description || '',
          genre: book.genre || '',
          year: book.year || ''
        });
      } catch (err) {
        setError('Failed to load book details.');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updateBook(id, formData);
      navigate(`/books/${id}`); // Redirect to book details page after successful update
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h1>Edit Book</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Updating Book...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
