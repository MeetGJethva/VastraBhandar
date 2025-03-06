import React from "react";
import { Trash2, Edit } from "lucide-react";
// import { colorMap } from "../utils/colorUtils";
import ProductRating from "./ProductRating";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ProductPrice from "./ProductPrice";
import ProductCustomization from "./ProductCustomization";

const ProductCard = ({ 
  product, 
  onEdit, 
  onDeleteConfirm, 
  isConfirmingDelete, 
  onDelete 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.customization.mergedImage || product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Edit size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => onDeleteConfirm(product.productId)}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {isConfirmingDelete && (
          <DeleteConfirmationModal
            onCancel={() => onDeleteConfirm(null)}
            onConfirm={() => onDelete(product.productId)}
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <ProductCustomization 
          color={product.customization.color} 
          size={product.customization.size} 
        />
        
        <ProductRating rating={product.rating} ratingCount={product.ratingCount} />

        <div className="flex items-center justify-between">
          <ProductPrice basePrice={product.basePrice} price={product.price} />
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors shadow-sm"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;