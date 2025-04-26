import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/customer/category_services";
import { AuthContext } from "../../context/auth_context";
export const SearchAndFilters = ({ searchTerm, onSearchChange, filters, onFilterChange }) => {
  const [categories, setCategories] = useState([]); // Default to an empty array
  const {user}= useContext(AuthContext);
  const options = {
    sort: [
      { value: "name", label: "Name" },
      { value: "price", label: "Price" },
      { value: "rating", label: "Rating" },
    ],
    price: [
      { value: "all", label: "All Prices" },
      { value: "under50", label: "Under 50" },
      { value: "50to100", label: "50 - 100" },
      { value: "over100", label: "Over 100" },
    ],
    rating: [
      { value: "all", label: "All Ratings" },
      { value: "4plus", label: "4+ Stars" },
      { value: "3plus", label: "3+ Stars" },
    ],
    category: [
      { value: "all", label: "All Categories" },
      ...categories.map(category => ({
        value: category.name,
        label: category.name
      }))
    ]
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories(user); // Fetch categories from API
      // console.log("Fetched categories:", fetchedCategories);
      setCategories(fetchedCategories); // Set categories in state
    };

    fetchCategories(); // Call the fetch function once
  }, [user]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      {/* Search Row */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
            Filters:
          </span>
        </div>
        
        <FilterSelect
          label="Sort By"
          value={filters.sortBy}
          options={options.sort}
          onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
        />
        <FilterSelect
          label="Price"
          value={filters.priceRange}
          options={options.price}
          onChange={(value) =>
            onFilterChange({ ...filters, priceRange: value })
          }
        />
        <FilterSelect
          label="Rating"
          value={filters.rating}
          options={options.rating}
          onChange={(value) => onFilterChange({ ...filters, rating: value })}
        />
        <FilterSelect
          label="Category"
          value={filters.category}
          options={options.category}
          onChange={(value) => onFilterChange({ ...filters, category: value })}
        />
      </div>
    </div>
  );
};

export const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="flex items-center">
    <label className="text-sm font-medium mr-2 text-gray-700 dark:text-gray-300">{label}:</label>
    <select 
      className="p-2 border rounded bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-gray-200 border-gray-300 
                 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
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