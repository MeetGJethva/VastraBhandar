// productService.js
export const getProductByCreator = async (userId) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      productId: "1",
      name: "Premium Leather Jacket",
      description: "High-quality leather jacket with premium finish.",
      price: 249.99,
      basePrice: 199.99,
      imageUrl: "/api/placeholder/300/300",
      customization: { color: "Black", size: "M" },
      creator: userId,
      rating: 4.2,
      ratingCount: 198,
    },
    {
      productId: "2",
      name: "Casual Denim Shirt",
      description: "Comfortable casual denim shirt for everyday wear.",
      price: 89.99,
      basePrice: 69.99,
      imageUrl: "/api/placeholder/300/300",
      customization: { color: "Blue", size: "L" },
      creator: userId,
      rating: 4.5,
      ratingCount: 128,
    },
    {
      productId: "3",
      name: "Athletic Running Shoes",
      description: "Lightweight running shoes with advanced cushioning.",
      price: 129.99,
      basePrice: 99.99,
      imageUrl: "/api/placeholder/300/300",
      customization: { color: "Red", size: "42" },
      creator: userId,
      rating: 3.5,
      ratingCount: 130,
    },
  ];
};

export const deleteProduct = async (product) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
};

export const updateProduct = async (product) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return product;
};

export const uploadProduct = (product) => {
  // make api call and upload product
  console.log("Product uploaded:", product);
};
