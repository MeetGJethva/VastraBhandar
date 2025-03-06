import React from "react";
import { Package, PlusCircle } from "lucide-react";

const EmptyState = ({ hasSearchTerm, onCreateProduct }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <Package
        size={48}
        className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
      />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No products found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {hasSearchTerm
          ? "Try a different search term or"
          : "Start by creating your first product"}
      </p>
      <button
        onClick={onCreateProduct}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
      >
        <PlusCircle size={18} className="mr-2" />
        Create Product
      </button>
    </div>
  );
};

export default EmptyState;