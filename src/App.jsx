import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#071025]">
      <Header />
      <main className="py-8 px-4 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </main>
    </div>
  );
}
