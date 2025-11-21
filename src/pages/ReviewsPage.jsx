import React, { useState, } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function ReviewsPage() {
  // Load reviews from localStorage
  const [reviews, setReviews] = useState(() => {
    const stored = window.localStorage.getItem("sivam_reviews");
    return stored ? JSON.parse(stored) : [];
  });

  const addReview = (newReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("sivam_reviews", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
        Customer Reviews
      </h1>
      <ReviewForm onAddReview={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
