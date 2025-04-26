import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";

// Helper function to create Basic Auth header
const getBasicAuthHeader = (username, password) => {
  const base64Credentials = btoa(`${username}:${password}`);
  return { Authorization: `Basic ${base64Credentials}` };
};

/**
 * Generic function to make API calls with proper error handling.
 * @param {string} endpoint - The API endpoint (relative to API_BASE_URL).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {Object} [data] - Request body (for POST, PUT).
 * @param {Object} [params] - URL parameters (for GET).
 * @param {Object} [headers] - Custom headers if needed.
 * @param {string} [username] - Username for Basic Auth.
 * @param {string} [password] - Password for Basic Auth.
 * @returns {Promise<Object>} - API response data or error message.
 */
const apiRequest = async (endpoint, method = "GET", data = null, params = {}, headers = {}, username, password) => {
  try {
    // Add Basic Auth header if username and password are provided
    const authHeader = username && password ? getBasicAuthHeader(username, password) : {};

    const response = await axios({
      url: `${endpoint}`,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Allow custom headers if needed
        ...authHeader, // Add the Basic Auth header here
      },
      withCredentials: true,
    });

    return response; // Return API response 
  } catch (error) {
    console.error(`❌ API Error (${method} ${endpoint}):`, error.response || error.message);

    // Return meaningful error response
    return {
      success: false,
      message: error.response?.data || "Something went wrong. Please try again.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Export specific methods for readability
export const apiGet = (endpoint, params = {}, headers = {}, username, password) => apiRequest(endpoint, "GET", null, params, headers, username, password);
export const apiPost = (endpoint, data, headers = {}, username, password) => apiRequest(endpoint, "POST", data, {}, headers, username, password);
export const apiPut = (endpoint, data, headers = {}, username, password) => apiRequest(endpoint, "PUT", data, {}, headers, username, password);
export const apiDelete = (endpoint, headers = {}, username, password) => apiRequest(endpoint, "DELETE", null, {}, headers, username, password);

export default apiRequest;
