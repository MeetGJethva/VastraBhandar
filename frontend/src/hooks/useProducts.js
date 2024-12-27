import { useState, useEffect } from 'react';
import { fetchProducts, sortProducts, filterProducts } from '../services/customer/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'name',
    priceRange: 'all',
    rating: 'all'
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredAndSortedProducts = sortProducts(
    filterProducts(products, filters),
    filters.sortBy
  );

  return {
    products: filteredAndSortedProducts,
    loading,
    error,
    filters,
    setFilters
  };
};