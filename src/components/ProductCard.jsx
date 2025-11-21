import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${p.id}`) || "[]");
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setAverageRating(avg);
    }
  }, [p.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("sivam_cart") || "[]");
    const found = cart.find(c => c.id === p.id);
    if (found) found.qty += 1;
    else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, img: p.img });
    localStorage.setItem("sivam_cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="bg-white dark:bg-[#04202a] shadow rounded-lg overflow-hidden flex flex-col">
      <Link to={`/product/${p.id}`} className="block">
        <img src={p.img} alt={p.name} className="w-full h-44 sm:h-48 md:h-52 object-cover" />
      </Link>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{p.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{p.subtitle}</p>

          {/* Average Rating */}
          <div className="flex items-center gap-1 mt-1">
            {[1,2,3,4,5].map((i) => (
              <span
                key={i}
                className={`text-sm ${i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
              >
                ★
              </span>
            ))}
            <span className="text-gray-600 dark:text-gray-300 text-sm">({averageRating.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold text-green-700 dark:text-green-400">₹{p.price}</div>
          <button
            onClick={addToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
