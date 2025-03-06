import React from "react";

const ProductPrice = ({ basePrice, price }) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 dark:text-gray-400 text-xs">
        Base Price: ${basePrice.toFixed(2)}
      </span>
      <span className="text-lg font-bold text-gray-900 dark:text-white">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default ProductPrice;