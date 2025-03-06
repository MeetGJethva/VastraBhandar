export const fetchProducts = async () => {
  try {
    // In a real app, this would be an API call
    const products = [
      {
        id: 1,
        name: "Classic White Sneakers",
        description: "Comfortable everyday sneakers with premium cushioning",
        price: 79.99,
        rating: 4.5,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 2,
        name: "Wireless Headphones",
        description: "High-quality sound with noise cancellation",
        price: 129.99,
        rating: 4.8,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 3,
        name: "Leather Wallet",
        description: "Genuine leather wallet with multiple card slots",
        price: 49.99,
        rating: 4.2,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 4,
        name: "Classic White Sneakers",
        description: "Comfortable everyday sneakers with premium cushioning",
        price: 79.99,
        rating: 4.5,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 5,
        name: "Wireless Headphones",
        description: "High-quality sound with noise cancellation",
        price: 129.99,
        rating: 4.8,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 6,
        name: "Leather Wallet",
        description: "Genuine leather wallet with multiple card slots",
        price: 49.99,
        rating: 4.2,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 7,
        name: "Classic White Sneakers",
        description: "Comfortable everyday sneakers with premium cushioning",
        price: 79.99,
        rating: 4.5,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 8,
        name: "Wireless Headphones",
        description: "High-quality sound with noise cancellation",
        price: 129.99,
        rating: 4.8,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      {
        id: 9,
        name: "Leather Wallet",
        description: "Genuine leather wallet with multiple card slots",
        price: 49.99,
        rating: 4.2,
        image: "/api/placeholder/200/200",
        category : null,
        designer : null,
      },
      // ... more products
    ]; 
    return { products, error: null };
  } catch (error) {
    return { products: null, error: "Failed to fetch products" };
  }
};

export const filterProducts = (products, filters) => {
  if (!products) return null;
  return products
    .filter((product) => {
      // Price filter
      if (filters.priceRange === "under50" && product.price >= 50) return false;
      if (
        filters.priceRange === "50to100" &&
        (product.price < 50 || product.price > 100)
      )
        return false;
      if (filters.priceRange === "over100" && product.price <= 100)
        return false;

      // Rating filter
      if (filters.rating === "4plus" && product.rating < 4) return false;
      if (filters.rating === "3plus" && product.rating < 3) return false;

      if(filters.category !== "all" && filters.category !== product.category) return false;

      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (filters.sortBy === "price") return a.price - b.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
};

// export const sortProducts = (products, sortBy) => {
//   return [...products].sort((a, b) => {
//     if (sortBy === 'price') return a.price - b.price;
//     if (sortBy === 'rating') return b.rating - a.rating;
//     return a.name.localeCompare(b.name);
//   });
// };
