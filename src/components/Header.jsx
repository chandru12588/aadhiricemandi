import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart.jsx";
import logo from "../assets/logo.jpg";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <header className="bg-white dark:bg-[#041424] shadow sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        {/* Logo + Site Name */}
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-green-700 dark:text-green-300"
            >
              Sivam Rice Mandi
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Wholesale & Retail • Traditional Rice Varieties
            </div>
          </div>
        </div>

        {/* Navigation + Buttons */}
        <div className="flex items-center gap-3">
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-3">
            <Link
              to="/"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600"
            >
              Contact
            </Link>
            <Link
              to="/brands"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600"
            >
              Brands
            </Link>
            <Link
              to="/reviews"
              className="text-gray-800 dark:text-gray-200 hover:text-green-600"
            >
              Reviews
            </Link>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="px-3 py-2 rounded bg-gray-100 dark:bg-[#082033]"
          >
            {dark ? "Light" : "Dark"}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative px-3 py-2 rounded bg-green-600 text-white"
          >
            🛒 Cart
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center px-4 pb-2">
        {/* You can add a hamburger menu here if needed */}
      </div>

      {/* Cart Modal */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </header>
  );
}
