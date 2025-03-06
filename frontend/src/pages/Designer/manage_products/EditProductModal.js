import React, { useState } from "react";
import { X, Info, Save } from "lucide-react";
import { colorMap } from "../../../Components/colorUtils";
import FormField from "./FormField";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (field, value) => {
    setEditedProduct({
      ...editedProduct,
      [field]: value,
    });
  };

  const handleCustomizationChange = (field, value) => {
    setEditedProduct({
      ...editedProduct,
      customization: {
        ...editedProduct.customization,
        [field]: value,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - now with flex layout */}
        <div className="p-4 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[70vh]">
          {/* Product Image - fixed on left for larger screens */}
          <div className="md:w-1/3">
            <div className="sticky top-0 h-64 md:h-80 w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={editedProduct.imageUrl}
                alt={editedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form Fields - on right side */}
          <div className="md:w-2/3 flex flex-col space-y-4">
            <FormField
              label="Product Name"
              type="text"
              value={editedProduct.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <FormField
              label="Description"
              type="textarea"
              value={editedProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />

            {/* Product Color and Size in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color
                </label>
                <select
                  value={editedProduct.customization.color}
                  onChange={(e) =>
                    handleCustomizationChange("color", e.target.value)
                  }
                  className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                >
                  {Object.keys(colorMap).map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Size"
                type="text"
                value={editedProduct.customization.size}
                onChange={(e) =>
                  handleCustomizationChange("size", e.target.value)
                }
              />
            </div>

            <FormField
              label="Price ($)"
              type="number"
              step="0.01"
              value={editedProduct.price}
              onChange={(e) =>
                handleInputChange("price", parseFloat(e.target.value) || 0)
              }
            />

            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-2">
              <Info size={14} className="mr-1" />
              Base price: ${editedProduct.basePrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedProduct)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Save size={18} className="inline mr-1" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
