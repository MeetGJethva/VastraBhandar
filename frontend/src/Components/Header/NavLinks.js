import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";

const NavLinks = () => {
  const { role } = useContext(AuthContext); // Get role from context

  return (
    <nav className="hidden md:flex space-x-8">
      {/* Public Links */}
      <Link
        to="/"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Home
      </Link>
      {/* Hide Products for Designers */}
      {role !== "designer" && (
        <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
          Products
        </Link>
      )}

      {/* Customer-Only Links */}
      {role === "customer" && (
        <>
          <Link
            to="/customize"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Customize
          </Link>
          <Link
            to="/orders"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Cart
          </Link>
        </>
      )}

      {/* Designer-Only Links */}
      {role === "designer" && (
        <>
          <Link
            to="/designerCustomize"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Customize
          </Link>
          <Link
            to="/myProducts"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            My Products
          </Link>
        </>
      )}

      <Link
        to="/about"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        About
      </Link>
    </nav>
  );
};

export default NavLinks;
