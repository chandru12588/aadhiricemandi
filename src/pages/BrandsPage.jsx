// src/pages/BrandsPage.jsx
import React, { useState } from "react";
import { useCart } from "../components/CartContext";

import brand1 from "../assets/brand1.jpg";
import brand2 from "../assets/brand2.jpg";
import brand3 from "../assets/brand3.jpg";
import brand4 from "../assets/brand4.jpg";
import brand5 from "../assets/brand5.jpg";
import brand6 from "../assets/brand6.jpg";

const brands = [
  { name: "Appu Brand", img: brand1, price: 60 },
  { name: "Alamaram", img: brand2, price: 55 },
  { name: "Rajali", img: brand3, price: 50 },
  { name: "VIP", img: brand4, price: 65 },
  { name: "Apple", img: brand5, price: 70 },
  { name: "Sri Lakshmi", img: brand6, price: 60 },
];

export default function BrandsPage() {
  const { addItem } = useCart();
  const [qtyMap, setQtyMap] = useState({});

  const handleQtyChange = (name, val) => {
    setQtyMap(prev => ({ ...prev, [name]: Math.max(1, Number(val) || 1) }));
  };

  const handleAdd = (b) => {
    const qty = qtyMap[b.name] || 1;
    addItem({ name: b.name, img: b.img, qty, price: b.price });
    alert(`${b.name} x${qty} added to cart`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-700 mb-5">
        Top Brands We Sell
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {brands.map((b, idx) => (
          <div
            key={idx}
            className="p-3 bg-white dark:bg-[#0a1a2f] shadow rounded-lg flex flex-col items-center"
          >
            <img
              src={b.img}
              alt={b.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <p className="text-sm font-semibold mb-2">{b.name}</p>
            <p className="text-sm mb-2">₹{b.price} / kg</p>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={qtyMap[b.name] || 1}
                onChange={(e) => handleQtyChange(b.name, e.target.value)}
                className="w-16 p-1 border rounded"
              />
              <button
                onClick={() => handleAdd(b)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
