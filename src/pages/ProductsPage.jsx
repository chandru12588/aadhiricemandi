import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import products from "../data/products.js";

export default function ProductsPage() {
  const { addItem } = useCart(); // use context
  const [qtyMap, setQtyMap] = useState({});

  const handleQtyChange = (id, val) => {
    setQtyMap(prev => ({ ...prev, [id]: Math.max(1, Number(val) || 1) }));
  };

  const handleAdd = (product) => {
    const qty = qtyMap[product.id] || 1;
    addItem({ 
      name: product.name, 
      qty, 
      price: product.price, 
      img: product.img 
    });
    alert(`${product.name} x${qty} added to cart`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-5">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white dark:bg-[#0a1a2f] p-3 shadow rounded-lg flex flex-col items-center">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />
            <h2 className="font-semibold text-gray-800 dark:text-gray-200 mt-2">
              {p.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{p.subtitle}</p>
            <p className="text-green-700 dark:text-green-400 font-bold mt-1">
              ₹{p.price}/Kg
            </p>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min="1"
                value={qtyMap[p.id] || 1}
                onChange={(e) => handleQtyChange(p.id, e.target.value)}
                className="w-16 p-1 border rounded"
              />
              <button
                onClick={() => handleAdd(p)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
