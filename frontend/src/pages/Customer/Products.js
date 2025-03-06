import { ProductList } from "../../Components/UI/ProductList";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { filterProducts } from "../../services/customer/product_service";
import { useProducts } from "../../hooks/useProducts";
import { AuthContext } from "../../context/auth_context";
import { useContext, useState } from "react";
import CustomAlert from "../../Components/UI/AlertIcon";
import { SearchAndFilters } from "../../Components/filters/SearchAndFilters";
import LoadingSpinner from "../../Components/LoadingSpinner";

const ProductPage = () => {
  const { products, loading, error } = useProducts();
  const [filters, updateFilters] = useQueryFilters();
  const { cart } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Loading state
  if (loading) {
    return (
      <LoadingSpinner/>
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

  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Apply filters to products
  filteredProducts = filterProducts(filteredProducts, filters);

  function handleAddToCart(product_item) {
    // Implement cart functionality
    cart.addItem(product_item);

    // Show alert when item is added
    setShowAlert(true);
    setAlertMessage(
      `${product_item.name || "Item"} added to cart successfully!`
    );
    setAlertType("success");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 p-4">
      {/* Combined Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={updateFilters}
      />

      {/* Product List */}
      <div className="w-full">
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>

      <CustomAlert
        show={showAlert}
        message={alertMessage}
        type={alertType}
        duration={3000}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default ProductPage;
