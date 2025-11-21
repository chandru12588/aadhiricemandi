import React, { useState, useEffect } from "react";

export default function Slider({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow">
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-64 sm:h-72 md:h-80 object-cover transition duration-700 ease-in-out"
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-green-600" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
