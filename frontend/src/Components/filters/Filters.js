import { getCategories } from "../../services/customer/category_services";
import { FilterSelect } from "./FilterSelect";

export const Filters = ({ filters, onFilterChange }) => {
  const categories = getCategories();

  const options = {
    sort: [
      { value: "name", label: "Name" },
      { value: "price", label: "Price" },
      { value: "rating", label: "Rating" },
    ],
    price: [
      { value: "all", label: "All Prices" },
      { value: "under50", label: "Under $50" },
      { value: "50to100", label: "$50 - $100" },
      { value: "over100", label: "Over $100" },
    ],
    rating: [
      { value: "all", label: "All Ratings" },
      { value: "4plus", label: "4+ Stars" },
      { value: "3plus", label: "3+ Stars" },
    ],
    category: [
      { value: "all", label: "All Categories" },
      ...categories.map(category => ({
        value: category.name.replaceAll(" ", "-"),
        label: category.name
      }))
    ]
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
          Filters:
        </h2>
        <FilterSelect
          label="Sort By"
          value={filters.sortBy}
          options={options.sort}
          onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
        />
        <FilterSelect
          label="Price Range"
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