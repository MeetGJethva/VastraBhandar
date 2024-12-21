// src/components/header/NavLinks.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link
        to="/"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Home
      </Link>
      <Link
        to="/products"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Products
      </Link>
      <Link
        to="/customize"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      >
        Customize
      </Link>
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
