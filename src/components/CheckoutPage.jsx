// src/components/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { generateOrderId, formatOrderMessage } from "../utils/orderUtils";
import { useNavigate } from "react-router-dom";

const WHATSAPP_NUMBER = "918220220300"; // replace with your number

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [payment, setPayment] = useState("COD"); // COD or UPI

  const total = cart.reduce((s, it) => s + (it.price || 0) * it.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all fields");
      return;
    }
    const orderId = generateOrderId();
    const order = {
      orderId,
      cart,
      customer,
      payment,
      total,
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    // save order locally for tracking (customer device)
    try {
      const ordersRaw = localStorage.getItem("aadhi_orders");
      const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
      orders.push(order);
      localStorage.setItem("aadhi_orders", JSON.stringify(orders));
    } catch {}

    // format whatsapp message
    const message = formatOrderMessage({ orderId, cart, customer, payment });
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // open whatsapp
    window.open(waUrl, "_blank");

    // clear cart and navigate to confirmation/tracking
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (cart.length === 0) {
    return <div>
      <h2 className="text-xl">Your cart is empty</h2>
    </div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Name</label>
          <input type="text" value={customer.name} onChange={(e)=>setCustomer({...customer, name: e.target.value})}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Phone</label>
          <input type="tel" value={customer.phone} onChange={(e)=>setCustomer({...customer, phone: e.target.value})}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Delivery Address</label>
          <textarea value={customer.address} onChange={(e)=>setCustomer({...customer, address: e.target.value})}
            className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Payment</label>
          <select value={payment} onChange={(e)=>setPayment(e.target.value)} className="w-full p-2 border rounded">
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="UPI">UPI (You will receive UPI details via WhatsApp)</option>
          </select>
        </div>

        <div className="font-bold">Total: ₹{total}</div>

        <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">Place Order via WhatsApp</button>
      </form>
    </div>
  );
}
