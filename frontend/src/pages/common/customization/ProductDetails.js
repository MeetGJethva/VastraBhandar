import React from "react";
import { useRef } from "react";

import { Upload, ShoppingCart } from "lucide-react";
const ProductDetails = ({
  product,
  customization,
  setCustomization,
  onDesignUpload,
  onFinilNow,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{product.name}</h2>

      {/* Size Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
          Size
        </label>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 rounded ${
                customization.size === size
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => setCustomization((prev) => ({ ...prev, size }))}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
          Color
        </label>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                customization.color === color
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => setCustomization((prev) => ({ ...prev, color }))}
            />
          ))}
        </div>
      </div>

      {/* Design Upload */}
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onDesignUpload}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Upload size={20} />
          Upload Design
        </button>
      </div>

      {/* Buy Button */}
      <button
        onClick={onFinilNow}
        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
      >
        <ShoppingCart size={20} />
        Finilize Design 
      </button>
    </div>
  );
};

export default ProductDetails;
