import React, { useState } from "react";

export default function ReviewForm({ onAddReview }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter your name.");
    if (!comment.trim()) return alert("Please write a comment.");

    const review = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddReview(review);

    // Reset
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#05202a] p-4 rounded-lg shadow mt-4 space-y-3"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Write a Review</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full px-3 py-2 border rounded bg-white dark:bg-[#0b1b2a] dark:text-gray-200"
      />

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => setRating(i)}
            className={`cursor-pointer text-2xl ${
              i <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        className="w-full px-3 py-2 border rounded bg-white dark:bg-[#0b1b2a] dark:text-gray-200"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setName("");
            setRating(5);
            setComment("");
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
