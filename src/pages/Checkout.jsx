import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { money, shippingFor } from "../money";
import { usePageTitle } from "../usePageTitle";
import Photo from "../components/Photo";

const STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " "
  );

const EMPTY = {
  email: "",
  first: "",
  last: "",
  address: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  card: "",
  exp: "",
  cvc: "",
};

function readOrder() {
  try {
    return JSON.parse(sessionStorage.getItem("field-order") || "null");
  } catch {
    return null;
  }
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(readOrder);
  usePageTitle(order && items.length === 0 ? "Order confirmed" : "Checkout");

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.first.trim()) next.first = "Enter a first name.";
    if (!form.last.trim()) next.last = "Enter a last name.";
    if (!form.address.trim()) next.address = "Enter a street address.";
    if (!form.city.trim()) next.city = "Enter a city.";
    if (!form.state) next.state = "Select a state.";
    if (!/^\d{5}$/.test(form.zip)) next.zip = "Enter a 5-digit ZIP code.";
    const digits = form.card.replace(/\s/g, "");
    if (digits.length !== 16) next.card = "Enter a 16-digit card number.";
    const month = Number(form.exp.slice(0, 2));
    if (!/^\d{2}\/\d{2}$/.test(form.exp) || month < 1 || month > 12) {
      next.exp = "Use MM/YY.";
    }
    if (!/^\d{3,4}$/.test(form.cvc)) next.cvc = "Enter a 3 or 4 digit CVC.";
    setErrors(next);
    if (Object.keys(next).length || items.length === 0) return;

    const placed = {
      id: `F-${String(Date.now()).slice(-6)}`,
      email: form.email.trim(),
      name: `${form.first.trim()} ${form.last.trim()}`,
      address: `${form.address.trim()}${form.apt.trim() ? `, ${form.apt.trim()}` : ""}, ${form.city.trim()}, ${form.state} ${form.zip}`,
      items: items.map((item) => ({ ...item })),
      subtotal,
      shipping,
      total,
    };
    sessionStorage.setItem("field-order", JSON.stringify(placed));
    clear();
    setOrder(placed);
    setForm(EMPTY);
    window.scrollTo(0, 0);
  }

  if (items.length === 0 && order) {
    return (
      <div className="page inner narrow-page">
        <p className="eyebrow">Order {order.id}</p>
        <h1>Thank you, {order.name.split(" ")[0]}.</h1>
        <p className="lede">
          This is a demo order for {order.email}. Nothing was charged, and no email was sent.
        </p>
        <p className="muted">{order.address}</p>
        <div className="receipt">
          {order.items.map((item) => (
            <article className="line" key={item.key}>
              <Photo src={item.image} alt="" />
              <div>
                <div className="line-top">
                  <h3>
                    {item.name} × {item.qty}
                  </h3>
                  <p>{money(item.price * item.qty)}</p>
                </div>
                <p className="muted">
                  {item.color} / {item.size}
                </p>
              </div>
            </article>
          ))}
          <div className="row-between">
            <span>Subtotal</span>
            <span>{money(order.subtotal)}</span>
          </div>
          <div className="row-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Free" : money(order.shipping)}</span>
          </div>
          <div className="row-between total">
            <span>Total</span>
            <span>{money(order.total)}</span>
          </div>
        </div>
        <Link className="btn" to="/">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="narrow">
        <h1>Your bag is empty.</h1>
        <p className="muted">Add a piece, then come back to check out.</p>
        <Link to="/" className="btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page inner checkout">
      <form onSubmit={submit} noValidate>
        <h1>Checkout</h1>
        <p className="muted lede">Demo checkout. Nothing is charged. No email is sent.</p>
        <h2>Contact</h2>
        <div className="form-grid">
          <Field label="Email" error={errors.email} wide>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </Field>
          <Field label="First name" error={errors.first}>
            <input
              autoComplete="given-name"
              value={form.first}
              onChange={(event) => set("first", event.target.value)}
            />
          </Field>
          <Field label="Last name" error={errors.last}>
            <input
              autoComplete="family-name"
              value={form.last}
              onChange={(event) => set("last", event.target.value)}
            />
          </Field>
        </div>
        <h2>Shipping</h2>
        <div className="form-grid">
          <Field label="Address" error={errors.address} wide>
            <input
              autoComplete="address-line1"
              value={form.address}
              onChange={(event) => set("address", event.target.value)}
            />
          </Field>
          <Field label="Apartment, suite (optional)" wide>
            <input
              autoComplete="address-line2"
              value={form.apt}
              onChange={(event) => set("apt", event.target.value)}
            />
          </Field>
          <Field label="City" error={errors.city}>
            <input
              autoComplete="address-level2"
              value={form.city}
              onChange={(event) => set("city", event.target.value)}
            />
          </Field>
          <Field label="State" error={errors.state}>
            <select
              autoComplete="address-level1"
              value={form.state}
              onChange={(event) => set("state", event.target.value)}
            >
              <option value="">Select</option>
              {STATES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </Field>
          <Field label="ZIP code" error={errors.zip}>
            <input
              inputMode="numeric"
              autoComplete="postal-code"
              value={form.zip}
              onChange={(event) => set("zip", event.target.value.replace(/\D/g, "").slice(0, 5))}
            />
          </Field>
        </div>
        <h2>Payment</h2>
        <div className="form-grid">
          <Field label="Card number" error={errors.card} wide>
            <input
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={form.card}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
                set("card", digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim());
              }}
            />
          </Field>
          <Field label="Expiration" error={errors.exp}>
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={form.exp}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                set("exp", digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
              }}
            />
          </Field>
          <Field label="CVC" error={errors.cvc}>
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              value={form.cvc}
              onChange={(event) => set("cvc", event.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          </Field>
        </div>
        <button className="btn full place" type="submit">
          Place order · {money(total)}
        </button>
      </form>
      <aside className="summary">
        <h2>Your bag</h2>
        {items.map((item) => (
          <article className="sum-line" key={item.key}>
            <Photo src={item.image} alt="" />
            <div>
              <p>
                {item.name} × {item.qty}
              </p>
              <p className="muted">
                {item.color} / {item.size}
              </p>
            </div>
            <p>{money(item.price * item.qty)}</p>
          </article>
        ))}
        <div className="row-between">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="row-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : money(shipping)}</span>
        </div>
        <div className="row-between total">
          <span>Total</span>
          <span>{money(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, error, wide, children }) {
  return (
    <label className={wide ? "field span-2" : "field"}>
      <span>{label}</span>
      {children}
      {error && <em role="alert">{error}</em>}
    </label>
  );
}
