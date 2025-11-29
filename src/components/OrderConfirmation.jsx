// src/components/OrderConfirmation.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Order Placed</h2>
      <p>Your order has been created.</p>
      <p className="mt-2">Order ID: <strong>{orderId}</strong></p>
      <p className="mt-3">Use the tracking page to check order status:</p>
      <Link to={`/track`} className="text-blue-600">Go to Tracking Page</Link>
      <p className="mt-3">Share this Order ID with the shop for updates.</p>
    </div>
  );
}
