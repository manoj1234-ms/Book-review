import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviewById, updateReview } from '../utils/api.jsx';
import Loading from '../components/Loading.jsx';

const EditReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    rating: 5,
    text: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await fetchReviewById(id);
        const review = response.data;
        setFormData({
          rating: review.rating || 5,
          text: review.text || ''
        });
      } catch (err) {
        setError('Failed to load review details.');
        console.error('Error fetching review:', err);
      } finally {
        setLoading(false);
      }
    };

    getReview();
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
      await updateReview(id, formData);
      navigate(-1); // Go back to previous page
    } catch (err) {
      setError('Failed to update review. Please try again.');
      console.error('Error updating review:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <h1>Edit Review</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select
            className="form-control"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Review Text</label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Updating Review...' : 'Update Review'}
        </button>
      </form>
    </div>
  );
};

export default EditReviewPage;
