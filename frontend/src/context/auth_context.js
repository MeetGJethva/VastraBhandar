import React, { createContext, useState, useEffect, useRef } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cart } from "../models/Cart";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef(new Cart());

  useEffect(() => {
    // Check local storage or session storage for authentication info
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    console.log("Session : " + storedUserId);
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }

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
    try {
      if (
        (loginData.email === "meet@gmail.com" &&
        loginData.password === "0512") ||
        (loginData.email === "meet1@gmail.com" &&
          loginData.password === "1234") 
      ) {
        setIsLoggedIn(true);
        setUserId(loginData.email);
        setRole(loginData.email === "meet@gmail.com" ? "designer" : "customer");
        localStorage.setItem("userId", loginData.email);
        localStorage.setItem("role", loginData.email === "meet@gmail.com" ? "designer" : "customer");
        navigate("/");
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (signUpData) => {};

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
