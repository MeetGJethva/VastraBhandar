import React from "react";
import { ArrowUpDown } from "lucide-react";

const SortControls = ({ sortField, handleSort }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSort("name")}
        className={`flex items-center px-3 py-2 rounded-lg border ${
          sortField === "name"
            ? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200"
            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        }`}
      >
        Name
        <ArrowUpDown size={16} className="ml-1" />
      </button>
      <button
        onClick={() => handleSort("price")}
        className={`flex items-center px-3 py-2 rounded-lg border ${
          sortField === "price"
            ? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200"
            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        }`}
      >
        Price
        <ArrowUpDown size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default SortControls;