import React from "react";
import { Link } from "react-router-dom";
import products from "../data/products.js";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-5">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="bg-white dark:bg-[#0a1a2f] p-3 shadow rounded-lg block hover:shadow-lg transition"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />
            <h2 className="font-semibold text-gray-800 dark:text-gray-200 mt-2">
              {p.name}
            </h2>
            <p className="text-green-700 dark:text-green-400 font-bold mt-1">
              ₹{p.price}/Kg
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
