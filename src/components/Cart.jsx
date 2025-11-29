import React, { useState } from "react";
import { useCart } from "../components/CartContext";

export default function Cart({ onClose }) {
  const { cart, updateQty, removeItem } = useCart();
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const total = cart.reduce((sum, p) => sum + p.qty * p.price, 0);

  function orderViaWhatsApp() {
    if (!customer.name || !customer.address || !customer.phone) {
      alert("Please fill your Name, Address, and Phone.");
      return;
    }

    const lines = cart.map(
      (p, idx) => `${idx + 1}. ${p.name} x${p.qty} - ₹${p.price * p.qty}`
    );

    const message =
      `Hello Aadhi Arisi Angaadi,%0A` +
      `I'd like to place an order:%0A` +
      `${lines.join("%0A")}%0A` +
      `-----------------------%0A` +
      `Total: ₹${total}%0A` +
      `Payment: ${customer.payment}%0A` +
      `-----------------------%0A` +
      `Customer Details:%0A` +
      `Name: ${customer.name}%0A` +
      `Phone: ${customer.phone}%0A` +
      `Address: ${customer.address}`;

    const phone = "918220220300";
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

      <div className="bg-white dark:bg-[#02141d] w-full md:w-2/3 lg:w-1/3 rounded-t-lg md:rounded-lg p-4 z-50">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">🛒 Your Cart</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        {/* Cart Items */}
        <div className="mt-3 max-h-64 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-gray-600">Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.name} className="flex items-center gap-3 py-2 border-b">
                {item.img && (
                  <img src={item.img} alt="" className="w-16 h-12 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">₹{item.price}</div>

                  {/* Quantity Controls */}
                  <div className="flex gap-2 mt-1">
                    <button 
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => updateQty(item.name, Math.max(1, item.qty - 1))}
                    >−</button>
                    <span className="font-semibold">{item.qty}</span>
                    <button 
                      className="bg-gray-200 px-2 rounded"
                      onClick={() => updateQty(item.name, item.qty + 1)}
                    >+</button>
                  </div>
                </div>

                <button className="text-red-600" onClick={() => removeItem(item.name)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className="mt-4">
          <div className="text-sm text-gray-600">Total</div>
          <div className="font-bold text-lg">₹{total}</div>
        </div>

        {/* Customer Details */}
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <textarea
            placeholder="Delivery Address"
            className="w-full p-2 border rounded"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          ></textarea>

          {/* Payment Options */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={customer.payment === "COD"}
                onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}
              /> COD
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={customer.payment === "UPI"}
                onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}
              /> UPI
            </label>
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-4">
          <button 
            onClick={orderViaWhatsApp}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            📦 Place Order on WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}
