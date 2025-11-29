// src/utils/orderUtils.js
export function generateOrderId() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 7);
  return `AADI-${t}-${r}`.toUpperCase();
}

export function formatOrderMessage({ orderId, cart, customer, payment }) {
  let lines = [];
  lines.push(`Order ID: ${orderId}`);
  lines.push(`Customer: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Address: ${customer.address}`);
  lines.push(`Payment: ${payment}`);
  lines.push("");
  lines.push("Items:");
  cart.forEach(item => {
    lines.push(`- ${item.name} x${item.qty}`);
  });
  lines.push("");
  lines.push("Please confirm availability and delivery time. Thank you!");
  return lines.join("\n");
}
