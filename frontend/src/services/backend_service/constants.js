const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/users/login`,
    SIGNUP: `${API_BASE_URL}/users/signup`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/vendors/products`,
    // GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
    GET_BY_USER:`${API_BASE_URL}/vendors/products/user`,
    ADD: `${API_BASE_URL}/vendors/product`,
    DELETE: (id) => `${API_BASE_URL}/vendors/product/${id}`,
    UPDATE: (id) =>`${API_BASE_URL}/vendors/product/${id}`,
  },
  CUSTOMIZATION: {
    UPLOAD_DESIGN: `${API_BASE_URL}/customization/upload`,
    GET_PRESET_DESIGNS: `${API_BASE_URL}/customization/presets`,
  },
  CATEGORY: {
    GET_ALL: `${API_BASE_URL}/vendors/categories`
  },
  ORDER: {
    ADD : `${API_BASE_URL}/orders/customer/order`,
    GET_BY_ID : `${API_BASE_URL}/orders/customer`,
    DELETE: `${API_BASE_URL}/orders`
  }
};

export default API_ENDPOINTS;
