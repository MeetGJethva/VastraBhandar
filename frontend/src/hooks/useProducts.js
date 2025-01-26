import { useState, useEffect } from "react";
import { fetchProducts } from "../services/customer/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { products , error } = await fetchProducts();
      
      if (error) {
        setError(error);
      } else {
        setProducts(products);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};
