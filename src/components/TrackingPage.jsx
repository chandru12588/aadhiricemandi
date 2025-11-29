// src/components/TrackingPage.jsx
import React, { useState } from "react";

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  const check = () => {
    try {
      const ordersRaw = localStorage.getItem("aadhi_orders");
      const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
      const found = orders.find(o => o.orderId === orderId.trim());
      setResult(found || "NOT_FOUND");
    } catch {
      setResult("ERROR");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Track Your Order</h2>
      <div className="max-w-md">
        <input value={orderId} onChange={(e)=>setOrderId(e.target.value)}
          placeholder="Enter Order ID (e.g. AADI-...)" className="w-full p-2 border rounded" />
        <button onClick={check} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Check</button>
      </div>

      <div className="mt-4">
        {result === null ? null : result === "NOT_FOUND" ? (
          <div className="text-red-600">Order not found on this device.</div>
        ) : result === "ERROR" ? (
          <div className="text-red-600">Error reading orders.</div>
        ) : (
          <div className="bg-white p-3 rounded shadow">
            <div className="font-semibold">Order ID: {result.orderId}</div>
            <div>Status: {result.status}</div>
            <div>Placed on: {new Date(result.createdAt).toLocaleString()}</div>
            <div className="mt-2">
              <div className="font-semibold">Items:</div>
              <ul className="list-disc ml-5">
                {result.cart.map(i => <li key={i.name}>{i.name} x{i.qty}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Note: This simple tracker stores orders on the customer's device only. For real live tracking use the Google Sheets option (free) or a backend.
      </p>
    </div>
  );
}
