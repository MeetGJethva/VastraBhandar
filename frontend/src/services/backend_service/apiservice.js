import axios from "axios";

// Base API URL from environment variables
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

/**
 * Generic function to make API calls with proper error handling.
 * @param {string} endpoint - The API endpoint (relative to API_BASE_URL).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {Object} [data] - Request body (for POST, PUT).
 * @param {Object} [params] - URL parameters (for GET).
 * @param {Object} [headers] - Custom headers if needed.
 * @returns {Promise<Object>} - API response data or error message.
 */
const apiRequest = async (endpoint, method = "GET", data = null, params = {}, headers = {}) => {
  try {
    const response = await axios({
      url: `${endpoint}`,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Allow custom headers if needed
      },
    });

    return response.data; // Return API response data

  } catch (error) {
    console.error(`❌ API Error (${method} ${endpoint}):`, error.response || error.message);

    // Return meaningful error response
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong. Please try again.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Export specific methods for readability
export const apiGet = (endpoint, params = {}, headers = {}) => apiRequest(endpoint, "GET", null, params, headers);
export const apiPost = (endpoint, data, headers = {}) => apiRequest(endpoint, "POST", data, {}, headers);
export const apiPut = (endpoint, data, headers = {}) => apiRequest(endpoint, "PUT", data, {}, headers);
export const apiDelete = (endpoint, headers = {}) => apiRequest(endpoint, "DELETE", null, {}, headers);

export default apiRequest;
