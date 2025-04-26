import React, { createContext, useState, useEffect, useRef, use } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cart } from "../models/Cart";
import API_ENDPOINTS from "../services/backend_service/constants";
import { apiPost } from "../services/backend_service/apiservice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef(new Cart());

  useEffect(() => {
    // Check local storage or session storage for authentication info
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    console.log("Session : " + storedUserId);
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setRole(storedRole);
      setUser(user);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
    setLoading(false);

    // For cart management
    const updateCartItems = (cart) => {
      setCartItems([...cart.getItems()]);
    };

    // Sync cart items with state on initial load
    setCartItems([...cartRef.current.getItems()]);

    cartRef.current.addListener(updateCartItems);

    return () => {
      cartRef.current.removeListener(updateCartItems);
    };
  }, []);

  const login = async (loginData) => {
    const result = await apiPost(API_ENDPOINTS.AUTH.LOGIN, loginData);

    if (result?.status === 200 || result?.success) {
      setIsLoggedIn(true);
      setUserId(loginData.email);
      setRole(result.data.role);

      //storing plain password for api request
      result.data.plainPassword = loginData.password;

      setUser(result.data);
      localStorage.setItem("userId", loginData.email);
      localStorage.setItem("role", result.data.role);
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate("/");
    } else {
      return { success: false, message: result.message || "Login failed." };
    }
  };

  const signup = async (signUpData) => {
    try {
      signUpData.role = signUpData.role.toUpperCase();

      const result = await apiPost(API_ENDPOINTS.AUTH.SIGNUP, signUpData); // Wait for API response

      if (result?.status === 200 || result?.success) {
        return { success: true, message: "Signup successful!" };
      } else {
        return { success: false, message: result.message || "Signup failed." };
      }
    } catch (error) {
      console.error("Signup Error:", error);
      return { success: false, message: "An error occurred during signup." };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        login,
        signup,
        logout,
        role,
        cart: cartRef.current,
        cartItems,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
