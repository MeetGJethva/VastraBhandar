const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/products`,
    GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
    ADD: `${API_BASE_URL}/products/add`,
  },
  CUSTOMIZATION: {
    UPLOAD_DESIGN: `${API_BASE_URL}/customization/upload`,
    GET_PRESET_DESIGNS: `${API_BASE_URL}/customization/presets`,
  },
};

export default API_ENDPOINTS;
