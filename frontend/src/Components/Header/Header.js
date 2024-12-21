// src/components/header/Header.jsx
import React, { useState } from 'react';
import ThemeSwitch from '../../Theme/ThemeSwitch';
import NavLinks from './NavLinks';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
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
              <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
              <a href="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                Products
              </a>
              <a href="/customize" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                Customize
              </a>
              <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;