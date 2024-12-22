import { FilterSelect } from "./FilterSelect";

export const Filters = ({ filters, onFilterChange }) => {
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
  };

  return (
    <div className="fixed w-[30%] h-screen overflow-y-auto bg-white dark:bg-gray-800 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Filters
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
      </div>
    </div>
  );
};
