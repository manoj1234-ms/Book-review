import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { updatePurchaseLink } from '../utils/api.jsx';

const InsertLinkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [purchaseLink, setPurchaseLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePurchaseLink(id, purchaseLink);
      alert('Purchase link updated successfully');
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Failed to update purchase link:', error);
      alert('Error updating purchase link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Insert Purchase Link</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="purchaseLink">Purchase Link</label>
          <input
            type="url"
            className="form-control"
            id="purchaseLink"
            value={purchaseLink}
            onChange={(e) => setPurchaseLink(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Link'}
        </button>
      </form>
    </div>
  );
};

export default InsertLinkPage;
