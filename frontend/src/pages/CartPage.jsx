import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage or API
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemove = (bookId) => {
    const updatedCart = cartItems.filter(item => item._id !== bookId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
    // Here you would implement order placement logic
  };

  if (cartItems.length === 0) {
    return <div className="container mt-4"><h2>Your cart is empty.</h2></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.title}</h5>
              <p className="mb-0">by {item.author}</p>
              <small>Genre: {item.genre}</small>
            </div>
            <button className="btn btn-danger" onClick={() => handleRemove(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
