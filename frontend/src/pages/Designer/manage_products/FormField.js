import React from "react";

const FormField = ({ label, type, value, onChange, rows, step }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows || 3}
          className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          step={step}
          className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
        />
      )}
    </div>
  );
};

export default FormField;
