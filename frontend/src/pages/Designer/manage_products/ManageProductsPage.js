import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductByCreator,
  deleteProduct,
  updateProduct,
} from "../../../services/designer/productService";

// Components
import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import ProductGrid from "./ProductGrid";
import EmptyState from "./EmptyState";
import EditProductModal from "./EditProductModal";
import PageHeader from "./PageHeader";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { AuthContext } from "../../../context/auth_context";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsList = await getProductByCreator(user);
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    if(!authLoading)
      fetchProducts();
  }, [user]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const productToDelete = products.find((p) => p.productId === productId);
      await deleteProduct(productToDelete.productId, user);
      setProducts(products.filter((p) => p.productId !== productId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open edit modal with product data
  const handleEditProduct = (product) => {
    setCurrentProduct({ ...product });
    setEditModalOpen(true);
  };

  // Handle product update
  const handleUpdateProduct = async (updatedProductData) => {
    try {
      const updatedProduct = await updateProduct(updatedProductData, user);
      setProducts(
        products.map((p) =>
          p.productId === updatedProduct.productId ? updatedProduct : p
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "price" || sortField === "basePrice") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900">
      {/* Header Section */}
      <PageHeader onAddProduct={() => navigate("/customize")} />

      {/* Search and Sort Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <SortControls sortField={sortField} handleSort={handleSort} />
        </div>
      </div>

      {/* Products List */}
      {loading ? (
        <LoadingSpinner />
      ) : sortedProducts.length === 0 ? (
        <EmptyState
          hasSearchTerm={!!searchTerm}
          onCreateProduct={() => navigate("/designerCustomize")}
        />
      ) : (
        <ProductGrid
          products={sortedProducts}
          onEdit={handleEditProduct}
          onDeleteConfirm={setConfirmDeleteId}
          confirmDeleteId={confirmDeleteId}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Edit Product Modal */}
      {editModalOpen && currentProduct && (
        <EditProductModal
          product={currentProduct}
          onClose={() => setEditModalOpen(false)}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default ManageProductsPage;
