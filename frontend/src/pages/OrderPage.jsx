import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handlePlaceOrder = () => {
    // Placeholder for order placement logic
    setOrderPlaced(true);
    localStorage.removeItem('cart');
    setCart([]);
  };

  if (orderPlaced) {
    return (
      <div className="container mt-4">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((book, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Year: {book.year}</p>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
