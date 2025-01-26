import { Filters } from "../../Components/filters/Filters";
import { ProductList } from "../../Components/UI/ProductList";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import {filterProducts} from "../../services/customer/productService";
import { useProducts } from "../../hooks/useProducts";

const ProductPage = () => {
  const { products, loading, error } = useProducts();
  const [filters, updateFilters] = useQueryFilters();
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading products...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }
  // Apply filters to products
  const filteredProducts = filterProducts(products, filters);

  function handleAddToCart() {
    // Implement cart functionality
    console.log("Adding to cart:");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        <Filters filters={filters} onFilterChange={updateFilters} />
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductPage;
