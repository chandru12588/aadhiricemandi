import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.js";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  // Reviews for this product from localStorage
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem(`reviews_${id}`);
    return stored ? JSON.parse(stored) : [];
  });

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  if (!product) return <div>Product not found</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("sivam_cart") || "[]");
    const found = cart.find((c) => c.id === product.id);
    if (found) found.qty += 1;
    else cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      img: product.img,
    });
    localStorage.setItem("sivam_cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="bg-white dark:bg-[#04202a] rounded-lg p-6 space-y-6">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.img}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{product.subtitle}</p>
          <div className="font-bold text-2xl mt-2 text-green-700 dark:text-green-400">₹{product.price}</div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={addToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <a
              href={`https://wa.me/918220220300?text=Hi%20Sivam%20Rice%20Mandi%2C%20I%20want%20to%20buy%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Product Benefits */}
      <section>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Benefits</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-200">
          Traditional and nutrient-rich rice variety grown and processed with care.
          Great for family meals and special dishes.
        </p>
      </section>

      {/* Reviews */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customer Reviews</h3>
        <ReviewForm onAddReview={(r) => setReviews([r, ...reviews])} />
        <ReviewList reviews={reviews} />
      </section>
    </div>
  );
}
