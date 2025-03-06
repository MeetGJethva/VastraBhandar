export const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="flex items-center">
    <label className="text-sm font-medium mr-2 dark:text-gray-200">{label}:</label>
    <select 
      className="p-2 border rounded bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-gray-200 border-gray-300 
                 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);