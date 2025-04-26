import React, { useState } from "react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  orderData,
  onFinilization,
  isOrderProcessing,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  if (!orderData) return null;

  const { items } = orderData;
  const product = items[0];
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleSubmit = () => {
    onFinilization({ quantity, totalPrice });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order Summary
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview and Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preview Image */}
            <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <img
                src={product.customization.baseImage}
                alt="Customized Product"
                className="max-w-full h-auto rounded shadow-sm"
              />
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Product
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.product.name}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Customization
                </h3>
                <div className="mt-1 space-y-1">
                  <p className="text-gray-800 dark:text-gray-200">
                    Size: {product.customization.size}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    Color: {product.customization.color}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Total Price
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isOrderProcessing}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 ${
              isOrderProcessing
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isOrderProcessing ? "Processing" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
