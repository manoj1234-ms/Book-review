import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
