// Header.jsx
import React, { useContext, useState, useEffect } from "react";
import ThemeSwitch from "../../Theme/ThemeSwitch";
import NavLinks from "./NavLinks";
import { AuthContext } from "../../context/auth_context";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LogIn, Menu, X, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { role, logout, cartItems } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [cartLength, setCartLength] = useState(0);

  useEffect(()=>{
    setCartLength(cartItems.length);
  },[cartItems])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    // Add a toast notification here if you have a toast library
  };

  return (
    <>
      <div className="h-16"></div>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
            : "bg-white dark:bg-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center group"
            >
              <div className="relative overflow-hidden">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">
                  Chitra
                </h1>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
              
              {role === "CUSTOMER" && (
                <Link 
                  to="/cart" 
                  className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">{cartLength}</span>
                </Link>
              )}
              
              <ThemeSwitch />
              
              {role ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogOut size={18} />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogIn size={18} />
                  <span className="hidden lg:inline">Login</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {role === "CUSTOMER" && (
                <Link 
                  to="/cart" 
                  className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-600 rounded-full">{cartLength}</span>
                </Link>
              )}
              
              <ThemeSwitch />
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Main menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="transition-transform duration-300 ease-in-out" />
                ) : (
                  <Menu size={24} className="transition-transform duration-300 ease-in-out" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-4">
              {/* Public Links */}
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              
              {/* Hide Products for Designers */}
              {role !== "DESIGNER" && (
                <Link
                  to="/products"
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Products
                </Link>
              )}

              {/* Customer-Only Links */}
              {role === "CUSTOMER" && (
                <>
                  <Link
                    to="/customize"
                    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Customize
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Orders
                  </Link>
                </>
              )}

              {/* Designer-Only Links */}
              {role === "DESIGNER" && (
                <>
                  <Link
                    to="/designerCustomize"
                    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Customize
                  </Link>
                  <Link
                    to="/myProducts"
                    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    My Products
                  </Link>
                </>
              )}
              
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                {role ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-colors"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;