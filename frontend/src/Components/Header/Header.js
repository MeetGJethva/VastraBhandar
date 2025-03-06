import React, { useContext, useState } from "react";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import NavLinks from "./NavLinks";
import { AuthContext } from "../../context/auth_context";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { role, logout } = useContext(AuthContext); // Get role from context

  const navigate = useNavigate(); // Get navigate function from context

  const handleLogin = () => {
    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <div className="h-16"></div>
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Chitra
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLinks />
              <ThemeSwitch />
              {role && (
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <LogOut size={20} />
                </button>
              )}
              {!role && (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  <LogIn size={20} />
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <ThemeSwitch />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-200"
                aria-label="Main menu"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {/* Public Links */}
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
                {/* Hide Products for Designers */}
                {role !== "designer" && (
                  <Link
                    to="/products"
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
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
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
