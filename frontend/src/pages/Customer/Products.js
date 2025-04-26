import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { ProductList } from "../../Components/UI/ProductList";
import { useQueryFilters } from "../../hooks/useQueryFilters";
import { useProducts } from "../../hooks/useProducts";
import { AuthContext } from "../../context/auth_context";
import CustomAlert from "../../Components/UI/AlertIcon";
import { SearchAndFilters } from "../../Components/filters/SearchAndFilters";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { filterProducts } from "../../services/customer/product_service";

const ProductPage = () => {
  const [filters, updateFilters] = useQueryFilters();
  const { cart, user } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [page, setPage] = useState(0);

  const { products, loading, error, hasMore } = useProducts(user, page, 10);
  const observer = useRef(); // Ref for infinite scrolling

  useEffect(() => {
    setPage(0); // Reset pagination when filters or search term changes
  }, [filters, searchTerm]);

  // Intersection Observer for infinite scrolling
  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredProducts = filterProducts(filteredProducts, filters);

  function handleAddToCart(product_item) {
    cart.addItem(product_item);
    setShowAlert(true);
    setAlertMessage(
      `${product_item.name || "Item"} added to cart successfully!`
    );
    setAlertType("success");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 p-4">
      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={updateFilters}
      />

      {/* Product List */}
      <div
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4"
        style={{
          overflowY: "auto",
          height: "80vh",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          "&::-webkit-scrollbar": {
            display: "none",
          } /* Chrome, Safari, newer versions of Opera */,
        }}
      >
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          lastProductRef={lastProductRef}
          Loading={loading}
        />
        {/* Attach the ref to the last product */}
        {hasMore && <div ref={lastProductRef} style={{ height: "20px" }}></div>}

        {/* Loading Spinner at Bottom */}
        {loading && (
          <div className="flex justify-center my-4">
            <LoadingSpinner />
          </div>
        )}
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
