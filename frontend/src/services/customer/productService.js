export const fetchProducts = async () => {
    // In a real app, this would be an API call
    const products = [
        {
            id: 1,
            name: "Classic White Sneakers",
            description: "Comfortable everyday sneakers with premium cushioning",
            price: 79.99,
            rating: 4.5,
            image: "/api/placeholder/200/200"
          },
          {
            id: 2,
            name: "Wireless Headphones",
            description: "High-quality sound with noise cancellation",
            price: 129.99,
            rating: 4.8,
            image: "/api/placeholder/200/200"
          },
          {
            id: 3,
            name: "Leather Wallet",
            description: "Genuine leather wallet with multiple card slots",
            price: 49.99,
            rating: 4.2,
            image: "/api/placeholder/200/200"
          },{
            id: 1,
            name: "Classic White Sneakers",
            description: "Comfortable everyday sneakers with premium cushioning",
            price: 79.99,
            rating: 4.5,
            image: "/api/placeholder/200/200"
          },
          {
            id: 2,
            name: "Wireless Headphones",
            description: "High-quality sound with noise cancellation",
            price: 129.99,
            rating: 4.8,
            image: "/api/placeholder/200/200"
          },
          {
            id: 3,
            name: "Leather Wallet",
            description: "Genuine leather wallet with multiple card slots",
            price: 49.99,
            rating: 4.2,
            image: "/api/placeholder/200/200"
          },{
            id: 1,
            name: "Classic White Sneakers",
            description: "Comfortable everyday sneakers with premium cushioning",
            price: 79.99,
            rating: 4.5,
            image: "/api/placeholder/200/200"
          },
          {
            id: 2,
            name: "Wireless Headphones",
            description: "High-quality sound with noise cancellation",
            price: 129.99,
            rating: 4.8,
            image: "/api/placeholder/200/200"
          },
          {
            id: 3,
            name: "Leather Wallet",
            description: "Genuine leather wallet with multiple card slots",
            price: 49.99,
            rating: 4.2,
            image: "/api/placeholder/200/200"
          }
      // ... more products
    ];
    return products;
  };
  
  export const filterProducts = (products, filters) => {
    const { priceRange, rating } = filters;
    
    return products
      .filter(product => {
        if (priceRange === 'under50') return product.price < 50;
        if (priceRange === '50to100') return product.price >= 50 && product.price <= 100;
        if (priceRange === 'over100') return product.price > 100;
        return true;
      })
      .filter(product => {
        if (rating === '4plus') return product.rating >= 4;
        if (rating === '3plus') return product.rating >= 3;
        return true;
      });
  };
  
  export const sortProducts = (products, sortBy) => {
    return [...products].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  };