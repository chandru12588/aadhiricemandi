import React, { useState, useMemo } from "react";
import products from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Slider from "../components/Slider.jsx";
import GoogleMapEmbed from "../components/GoogleMapEmbed.jsx";
import img1 from "../assets/img1.jpg";
import img9 from "../assets/img9.jpg";
import img6 from "../assets/img6.jpg";

export default function Home() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const images = [img1, img9, img6]; // slider images

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag ? p.tags.includes(tag) : true;
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
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
          Sivam Rice Mandi
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
