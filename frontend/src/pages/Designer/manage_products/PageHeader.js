import React from "react";
import { PlusCircle } from "lucide-react";

const PageHeader = ({ onAddProduct }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manage My Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View, edit, and manage all your custom products
        </p>
      </div>
      <button
        onClick={onAddProduct}
        className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
      >
        <PlusCircle size={18} className="mr-2" />
        Add New Product
      </button>
    </div>
  );
};

export default PageHeader;