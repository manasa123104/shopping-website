import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart";
import { categories } from "../data";
import { FREE_SHIPPING, money } from "../money";
import Photo from "./Photo";

const MESSAGES = [
  "Free shipping on orders of $75+",
  "New fall layers are in",
  "Returns accepted for 30 days",
];

export default function Layout() {
  const { items, open, setOpen, count, subtotal, updateQty, remove } = useCart();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [promo, setPromo] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setPromo((n) => (n + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearchOpen(false);
    setOpen(false);
    window.scrollTo(0, 0);
    if (location.pathname === "/search") {
      setQ(new URLSearchParams(location.search).get("q") || "");
    }
  }, [location.pathname, location.search, setOpen]);

  useEffect(() => {
    document.body.classList.toggle("lock", open || menu);
    return () => document.body.classList.remove("lock");
  }, [open, menu]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setMenu(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  function onSearch(event) {
    event.preventDefault();
    const term = q.trim();
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  const remain = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="top">
        <div className="promo">
          <button
            type="button"
            aria-label="Previous message"
            onClick={() => setPromo((n) => (n + MESSAGES.length - 1) % MESSAGES.length)}
          >
            ‹
          </button>
          <p>{MESSAGES[promo]}</p>
          <button
            type="button"
            aria-label="Next message"
            onClick={() => setPromo((n) => (n + 1) % MESSAGES.length)}
          >
            ›
          </button>
        </div>
        <header className="header">
          <div className="header-row inner">
            <div className="side">
              <button
                className="menu-btn"
                type="button"
                aria-expanded={menu}
                onClick={() => setMenu((value) => !value)}
              >
                {menu ? "Close" : "Menu"}
              </button>
            </div>
            <Link className="logo" to="/">
              FIELD
            </Link>
            <div className="tools">
              <button
                type="button"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((value) => !value)}
              >
                Search
              </button>
              <Link className="desk" to="/account">
                Account
              </Link>
              <button type="button" onClick={() => setOpen(true)}>
                Bag{count > 0 ? ` ${count}` : ""}
              </button>
            </div>
          </div>
          <nav className="nav inner" aria-label="Departments">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/c/${category.id}`}
                className={({ isActive }) => (isActive ? "on" : undefined)}
              >
                {category.label}
              </NavLink>
            ))}
            <NavLink
              to="/c/sale"
              className={({ isActive }) => (isActive ? "sale on" : "sale")}
            >
              Sale
            </NavLink>
          </nav>
          {searchOpen && (
            <form className="search-panel inner" onSubmit={onSearch}>
              <label className="sr" htmlFor="q">
                Search
              </label>
              <input
                id="q"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search jeans, tees, baby..."
                autoFocus
              />
            </form>
          )}
        </header>
      </div>

      {menu && (
        <nav className="mobile-nav" aria-label="Mobile">
          {categories.map((category) => (
            <Link key={category.id} to={`/c/${category.id}`}>
              {category.label}
            </Link>
          ))}
          <Link className="sale" to="/c/sale">
            Sale
          </Link>
          <Link to="/account">Account</Link>
          <Link to="/help">Help</Link>
        </nav>
      )}

      <main id="main">
        <Outlet />
      </main>
      <Footer />

      {open && (
        <Bag
          items={items}
          subtotal={subtotal}
          remain={remain}
          progress={progress}
          onClose={() => setOpen(false)}
          updateQty={updateQty}
          remove={remove}
        />
      )}
    </>
  );
}

function Bag({ items, subtotal, remain, progress, onClose, updateQty, remove }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <>
      <button className="overlay" type="button" aria-label="Close bag" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your bag">
        <div className="drawer-head">
          <h2>Your bag</h2>
          <button ref={closeRef} type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-bag">
              <p>Your bag is empty.</p>
              <Link to="/c/women" className="btn" onClick={onClose}>
                Shop women
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article className="line" key={item.key}>
                <Photo src={item.image} alt={item.name} />
                <div>
                  <div className="line-top">
                    <h3>{item.name}</h3>
                    <p>{money(item.price * item.qty)}</p>
                  </div>
                  <p className="muted">
                    {item.color} / {item.size}
                  </p>
                  <div className="line-actions">
                    <div className="qty">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => updateQty(item.key, item.qty - 1)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => updateQty(item.key, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="text" type="button" onClick={() => remove(item.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="ship-note">
              <p>
                {remain === 0
                  ? "You have free shipping."
                  : `You are ${money(remain)} away from free shipping.`}
              </p>
              <div className="bar" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="row-between total">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <Link to="/checkout" className="btn full" onClick={onClose}>
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="logo">FIELD</p>
          <p className="muted">
            Everyday clothing for the whole family. Denim, tees, and layers made to be worn on
            repeat.
          </p>
        </div>
        <div>
          <h2>Shop</h2>
          {categories.map((category) => (
            <Link key={category.id} to={`/c/${category.id}`}>
              {category.label}
            </Link>
          ))}
          <Link to="/c/sale">Sale</Link>
        </div>
        <div>
          <h2>Help</h2>
          <Link to="/help#shipping">Shipping</Link>
          <Link to="/help#returns">Returns</Link>
          <Link to="/help#sizes">Size guide</Link>
          <Link to="/account">Account</Link>
        </div>
        <form onSubmit={submit}>
          <h2>Notes</h2>
          {done ? (
            <p>You're on the list. This demo keeps the email on this page only.</p>
          ) : (
            <>
              <p className="muted">New arrivals and sale reminders. A few times a season.</p>
              <label className="sr" htmlFor="news">
                Email
              </label>
              <div className="news-row">
                <input
                  id="news"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                />
                <button className="btn" type="submit">
                  Sign up
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </>
          )}
        </form>
      </div>
      <p className="legal">© 2026 FIELD. A demo shop for everyday family clothing.</p>
    </footer>
  );
}
