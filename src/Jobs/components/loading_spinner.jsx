import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <div className="loading_text">Loading Jobs...</div>
    </div>
  );
}

export default LoadingSpinner;