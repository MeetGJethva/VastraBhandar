import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";

const NavLinks = () => {
  const { role } = useContext(AuthContext);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const linkClasses = (path) => {
    return `relative px-1 py-2 text-gray-700 dark:text-gray-200 transition-colors duration-300 ${
      isActive(path) 
        ? "font-medium text-blue-600 dark:text-blue-400" 
        : "hover:text-blue-600 dark:hover:text-blue-400"
    }`;
  };
  
  const activeLinkIndicator = (
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-full"></span>
  );

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {/* Public Links */}
      <Link to="/" className={linkClasses("/")}>
        Home
        {isActive("/") && activeLinkIndicator}
      </Link>
      
      {/* Hide Products for Designers */}
      {role !== "DESIGNER" && (
        <Link to="/products" className={linkClasses("/products")}>
          Products
          {isActive("/products") && activeLinkIndicator}
        </Link>
      )}

      {/* Customer-Only Links */}
      {role === "CUSTOMER" && (
        <>
          <Link to="/customize" className={linkClasses("/customize")}>
            Customize
            {isActive("/customize") && activeLinkIndicator}
          </Link>
          <Link to="/orders" className={linkClasses("/orders")}>
            Orders
            {isActive("/orders") && activeLinkIndicator}
          </Link>
        </>
      )}

      {/* Designer-Only Links */}
      {role === "DESIGNER" && (
        <>
          <Link to="/designerCustomize" className={linkClasses("/designerCustomize")}>
            Customize
            {isActive("/designerCustomize") && activeLinkIndicator}
          </Link>
          <Link to="/myProducts" className={linkClasses("/myProducts")}>
            My Products
            {isActive("/myProducts") && activeLinkIndicator}
          </Link>
        </>
      )}

      <Link to="/about" className={linkClasses("/about")}>
        About
        {isActive("/about") && activeLinkIndicator}
      </Link>
    </nav>
  );
};

export default NavLinks;