import React, { useState, useEffect } from "react";

export default function Cart({ onClose }) {
  const [cart, setCart] = useState(() => {
    const cartJson = window.localStorage.getItem("sivam_cart");
    return cartJson ? JSON.parse(cartJson) : [];
  });

  const total = cart.reduce((sum, p) => sum + p.qty * p.price, 0);

  useEffect(() => {
    localStorage.setItem("sivam_cart", JSON.stringify(cart));
  }, [cart]);

  function removeItem(id) {
    setCart(cart.filter(c => c.id !== id));
  }

  function orderViaWhatsApp() {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    const lines = cart.map((p, idx) => `${idx + 1}. ${p.name} x${p.qty} - ₹${p.price * p.qty}`);
    lines.push(`Total: ₹${total}`);
    const message = `Hello Sivam Rice Mandi,%0AI'd like to place an order:%0A${lines.join("%0A")}%0A%0AName:%0AAddress:%0AContact:`;
    const phone = "918220220300";
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white dark:bg-[#02141d] w-full md:w-2/3 lg:w-1/3 rounded-t-lg md:rounded-lg p-4 z-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div className="mt-3 max-h-64 overflow-auto">
          {cart.length === 0 ? (
            <p className="text-gray-600">Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b">
                <img src={item.img} alt="" className="w-16 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">Qty: {item.qty} × ₹{item.price}</div>
                </div>
                <button className="text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Total</div>
            <div className="font-bold text-lg">₹{total}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={orderViaWhatsApp} className="bg-green-600 text-white px-4 py-2 rounded">
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
