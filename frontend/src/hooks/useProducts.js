import { useState, useEffect } from "react";
import { fetchProducts } from "../services/customer/product_service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      setTimeout(async () => {
        const { products, error } = await fetchProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(products);
        }
        setLoading(false);
      }, 1000);
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};
