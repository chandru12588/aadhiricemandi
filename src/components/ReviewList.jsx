import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-600 mt-2">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="p-3 border rounded-lg bg-white dark:bg-[#04202a] space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{r.name}</span>
            <span className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i <= r.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                  }`}
                >
                  ★
                </span>
              ))}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
