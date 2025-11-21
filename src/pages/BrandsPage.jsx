import React from "react";
import brand1 from "../assets/brand1.jpg"
import brand2 from "../assets/brand2.jpg"
import brand3 from "../assets/brand3.jpg"
import brand4 from "../assets/brand4.jpg"
import brand5 from "../assets/brand5.jpg"
import brand6 from "../assets/brand6.jpg"

const brands = [
  { name: "Appu Brand", img: brand1 },
  { name: "Alamaram", img: brand2 },
  { name: "Rajali", img: brand3 },
  { name: "VIP", img: brand4},
  { name: "Apple", img: brand5 },
  { name: "Sri Lakshmi",img: brand6},
];

export default function BrandsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-5">
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
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {b.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
