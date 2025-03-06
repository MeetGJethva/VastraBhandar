import React from "react";
import { colorMap } from "../../../Components/colorUtils";

const ProductCustomization = ({ color, size }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Color:
        </span>
        <div className="flex items-center">
          <span
            className={`inline-block w-4 h-4 mr-1 rounded-full ${
              colorMap[color] || "bg-gray-500"
            }`}
          ></span>
          <span className="text-sm text-gray-900 dark:text-white">{color}</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Size:
        </span>
        <span className="text-sm text-gray-900 dark:text-white">{size}</span>
      </div>
    </div>
  );
};

export default ProductCustomization;
