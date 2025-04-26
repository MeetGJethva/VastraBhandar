import React, { useState, useEffect, useContext } from "react";
import { X, CheckCircle, DollarSign } from "lucide-react";
import { getCategories } from "../../services/customer/category_services";
import { AuthContext } from "../../context/auth_context";

const ConfirmationModel = ({
  product,
  isOpen,
  initialCommission = 19.99,
  onClose = () => {},
  onFinalize = () => {},
}) => {
  const [commission, setCommission] = useState(initialCommission);
  const [productName, setProductName] = useState(product?.product?.name || "");
  const [productDescription, setProductDescription] = useState(
    product?.product?.description || ""
  );
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategories(user);
        setCategories(categoryList);
        console.dir(categoryList);
        // Set first category as default if available
        if (categoryList.length > 0) {
          setSelectedCategory(categoryList[0]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!isOpen) return null;

  // Your existing handlers
  const handleCommissionChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setCommission(value);
  };

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat.categoryId == categoryId);
    setSelectedCategory(category);
  };

  const handleFinalize = () => {
    onFinalize({
      productId: product.product.id,
      name: productName,
      description: productDescription,
      color: product.customization.color,
      size: product.customization.size,
      basePrice: product.product.price,
      commission: commission,
      totalPrice: product.product.price + commission,
      category: selectedCategory,
    });
    onClose();
  };

  const colorMap = {
    black: "bg-gray-900",
    white: "bg-gray-100 border border-gray-300",
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-400",
    purple: "bg-purple-600",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    brown: "bg-amber-800",
    navy: "bg-indigo-900",
    gray: "bg-gray-500",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Customize Your Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/2 aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={product.mergedImage}
                  alt={productName || product.product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow">
                  <CheckCircle size={24} className="text-green-500" />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                {/* Editable Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={handleNameChange}
                    className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Static Details */}
                <div className="space-y-4 mb-6">
                  {/* Color Display */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Color:
                    </span>
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-4 h-4 mr-2 rounded-full ${
                          colorMap[product.customization.color] || "bg-gray-500"
                        }`}
                      ></span>
                      <span className="text-gray-900 dark:text-white">
                        {product.customization.color}
                      </span>
                    </div>
                  </div>

                  {/* Size Display */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Size:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {product.customization.size}
                    </span>
                  </div>

                  {/* Category Selection */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category:
                    </span>
                    <select
                      value={selectedCategory?.categoryId || ""}
                      onChange={handleCategoryChange}
                      className="py-1 px-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Commission Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Commission
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-gray-500" />
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        value={commission}
                        onChange={handleCommissionChange}
                        className="pl-8 block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Details */}
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.product.price.toFixed(2)}
                  </span>
                  <span className="mx-2 text-gray-600 dark:text-gray-400">
                    +
                  </span>
                  <span className="text-lg font-medium text-green-600 dark:text-green-400">
                    ${commission.toFixed(2)}
                  </span>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Total: ${(product.product.price + commission).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Editable Description Field */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Description
              </label>
              <textarea
                value={productDescription}
                onChange={handleDescriptionChange}
                rows="3"
                className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                placeholder="Enter product description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer with Action Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleFinalize}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Finalize Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModel;
