import React, { useState } from 'react';

const OrderPage = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // Placeholder for order placement logic
    setOrderPlaced(true);
    localStorage.removeItem('cart');
  };

  if (orderPlaced) {
    return (
      <div className="container mt-4">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order is being processed.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Place Your Order</h2>
      <p>This is a placeholder page for order placement.</p>
      <button className="btn btn-primary" onClick={handlePlaceOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderPage;
