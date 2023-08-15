import React from "react";


const formatPrice = (price) => {
    // Check if price is a valid number
    if (typeof price !== "number" || isNaN(price)) {
      return "Invalid Price";
    }
  
    // Convert price to a string with two decimal places
    const formattedPrice = price.toFixed(2);
  
    // Add thousands separator (comma) for better readability
    const numberWithCommas = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    // Add the Naira sign before the formatted price
    return `₦${numberWithCommas}`;
  };
export default formatPrice;