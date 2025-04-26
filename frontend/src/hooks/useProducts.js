import { useState, useEffect } from "react";
import { fetchProducts } from "../services/customer/product_service";

export const useProducts = (user, page = 0, size = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (loading || !hasMore) return; // Prevent fetching when there's no more data
      
      setLoading(true);
      const { products: newProducts, error } = await fetchProducts(user, page, size);

      if (error) {
        setError(error);
      } else {
        setProducts((prevProducts) => {
          // Use Set to ensure unique products (assuming `productId` is unique)
          const existingIds = new Set(prevProducts.map((p) => p.productId));
          const uniqueProducts = newProducts.filter((p) => !existingIds.has(p.productId));
          return [...prevProducts, ...uniqueProducts];
        });

        setHasMore(newProducts.length === size); // If fewer than `size` products are returned, stop loading more
      }

      setLoading(false);
    };

    loadProducts();
  }, [user, page, size]);

  return { products, loading, error, hasMore };
};

