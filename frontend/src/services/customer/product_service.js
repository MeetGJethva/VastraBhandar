import { apiGet } from "../backend_service/apiservice";
import API_ENDPOINTS from "../backend_service/constants";

export const fetchProducts = async (user, page = 0, size = 10) => {
  try {
    const response = await apiGet(
      API_ENDPOINTS.PRODUCTS.GET_ALL,
      { page, size },  // Send page and size for pagination
      {},
      user.email,
      user.plainPassword
    );
    
    if (response.status === 200)
      return { products: response.data, error: null };
    else
      return { error: response.message || response.error };
    
  } catch (error) {
    return { products: null, error: "Failed to fetch products" };
  }
};


export const filterProducts = (products, filters) => {
  if (!products) return null;
  
  return products
    .filter((product) => {
      // console.log(`Filter.category : ${filters.category}`);
      // console.log(`product.category : ${product.category.name}`);
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

      if (
        filters.category !== "all" &&
        filters.category !== product.category?.name
      )
        return false;

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
