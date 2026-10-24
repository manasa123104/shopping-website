export const FREE_SHIPPING = 75;
export const SHIPPING_RATE = 8;

export function money(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function shippingFor(subtotal) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING) return 0;
  return SHIPPING_RATE;
}
