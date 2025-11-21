import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart.jsx";
import logo from "../assets/logo.jpg";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <header className="bg-white dark:bg-[#041424] shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-md object-cover" />
          <div>
            <Link to="/" className="text-2xl font-bold text-green-700 dark:text-green-300">
              Sivam Rice Mandi
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Wholesale & Retail • Traditional Rice Varieties
            </div>
          </div>
        </div>

        {/* Desktop Links + Dark Mode + Cart */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex gap-3 items-center">
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-green-600">Home</Link>
            <Link to="/products" className="text-gray-800 dark:text-gray-200 hover:text-green-600">Products</Link>
            <Link to="/contact" className="text-gray-800 dark:text-gray-200 hover:text-green-600">Contact</Link>
            <Link to="/brands" className="text-gray-800 dark:text-gray-200 hover:text-green-600">Brands</Link>
            <Link to="/reviews" className="text-gray-800 dark:text-gray-200 hover:text-green-600">Reviews</Link>
          </nav>
          <button onClick={toggleDark} className="px-3 py-2 rounded bg-gray-100 dark:bg-[#082033]">
            {dark ? "Light" : "Dark"}
          </button>
          <button onClick={() => setShowCart(true)} className="px-3 py-2 rounded bg-green-600 text-white">
            🛒 Cart
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden px-3 py-2 border rounded ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-[#041424] px-4 pb-4 flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700">
          <Link to="/" className="block text-gray-800 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block text-gray-800 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/contact" className="block text-gray-800 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/brands" className="block text-gray-800 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Brands</Link>
          <Link to="/reviews" className="block text-gray-800 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Reviews</Link>
          {/* Mobile Dark Mode + Cart */}
          <div className="flex gap-2 mt-2">
            <button onClick={toggleDark} className="px-3 py-2 rounded bg-gray-100 dark:bg-[#082033] w-full">
              {dark ? "Light" : "Dark"}
            </button>
            <button onClick={() => setShowCart(true)} className="px-3 py-2 rounded bg-green-600 text-white w-full">
              🛒 Cart
            </button>
          </div>
        </nav>
      )}

      {/* Cart Modal */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </header>
  );
}
