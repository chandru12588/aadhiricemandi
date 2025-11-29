import React, { useState, useMemo } from "react";
import products from "../data/products.js";
import { useCart } from "../components/CartContext";
import Slider from "../components/Slider.jsx";
import GoogleMapEmbed from "../components/GoogleMapEmbed.jsx";
import img1 from "../assets/img1.jpg";
import img9 from "../assets/img9.jpg";
import img6 from "../assets/img6.jpg";

export default function Home() {
  const { addItem } = useCart(); // Cart context
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const images = [img1, img9, img6]; // Slider images

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag ? p.tags.includes(tag) : true;
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  const handleAddToCart = (product) => {
    addItem({ ...product, qty: 1 }); // add 1 by default
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6">
      {/* Slider */}
      <Slider images={images} />

      {/* Search and Tag Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rice varieties..."
          className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All</option>
          <option value="traditional">Traditional</option>
          <option value="aromatic">Aromatic</option>
          <option value="millet">Millet</option>
          <option value="special">Special</option>
          <option value="popular">Popular</option>
          <option value="parboiled">Parboiled</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-[#0a1a2f] p-3 shadow rounded-lg flex flex-col justify-between"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-32 sm:h-40 object-cover rounded"
            />
            <div className="mt-2">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                {p.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {p.subtitle}
              </p>
              <p className="text-green-700 dark:text-green-400 font-bold mt-1">
                ₹{p.price}/Kg
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(p)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-[#04202a] rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
          Benefits of Our Rice
        </h2>
        <ul className="list-disc ml-6 mt-3 text-gray-700 dark:text-gray-200">
          <li>Rich in natural vitamins, minerals and fiber.</li>
          <li>Traditional varieties support better digestion.</li>
          <li>Unpolished types retain nutrients and antioxidants.</li>
          <li>Good glycemic properties for healthier meals.</li>
        </ul>
      </section>

      {/* Contact & Location Section */}
      <section
        id="contact"
        className="mt-6 bg-white dark:bg-[#04202a] rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
          Contact & Location
        </h2>
        <p className="mt-2">
          ஆதி அரிசி அங்காடி (Aadhi Arisi Angaadi)
          <br />
          Wholesale & Retail
        </p>
        <p className="mt-2">
          📞{" "}
          <a href="tel:+918220220300" className="text-green-600">
            +91 82202 20300
          </a>
        </p>
        <p className="mt-2">
          📱 Order via WhatsApp:{" "}
          <a className="text-green-600" href="https://wa.me/918220220300">
            Click to chat
          </a>
        </p>

        <div className="mt-4">
          <GoogleMapEmbed />
        </div>
      </section>
    </div>
  );
}
