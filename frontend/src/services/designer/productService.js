import { apiDelete, apiPost, apiPut } from "../backend_service/apiservice";
import API_ENDPOINTS from "../backend_service/constants";

// productService.js
export const getProductByCreator = async (user) => {
  const response = await apiPost(
    API_ENDPOINTS.PRODUCTS.GET_BY_USER,
    user,
    {},
    user.email,
    user.plainPassword
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw Error(response.message || response.error);
  }
};

export const deleteProduct = async (productId, user) => {
  // Simulating API call
  const response = apiDelete(
    API_ENDPOINTS.PRODUCTS.DELETE(productId),
    {},
    user.email,
    user.plainPassword
  );
  if (response.status === 204) return true;
  else return false;
};

export const updateProduct = async (product, user) => {
  // Simulating API call
  const response = await apiPut(
    API_ENDPOINTS.PRODUCTS.UPDATE(product.productId),
    product,
    {},
    user.email,
    user.plainPassword
  );
  if (response.status === 200) return response.data;
  else return { error: response.message || response.error };
};

export const uploadProduct = async (product, user) => {
  // make api call and upload product
  console.log("Product uploaded:", product);
  const result = await apiPost(
    API_ENDPOINTS.PRODUCTS.ADD,
    product,
    {},
    user.email,
    user.plainPassword
  );
  return result;
};
