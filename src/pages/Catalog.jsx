import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  TYPE_ORDER,
  getCategory,
  labelFor,
  productsByCategory,
} from "../data";
import { usePageTitle } from "../usePageTitle";
import ProductCard from "../components/ProductCard";

export default function Catalog() {
  const { category: categoryId = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const category = getCategory(categoryId);
  const isSale = categoryId === "sale";
  const title = labelFor(categoryId);
  usePageTitle(title || "Shop");

  if (!category && !isSale) {
    return (
      <div className="narrow">
        <h1>That department is not on the floor.</h1>
        <Link to="/" className="btn">
          Back home
        </Link>
      </div>
    );
  }

  const pool = productsByCategory(categoryId);
  const types = TYPE_ORDER.filter((type) => pool.some((product) => product.type === type));
  const requested = params.get("type") || "All";
  const type = requested === "All" || types.includes(requested) ? requested : "All";
  const sort = params.get("sort") || "featured";

  const filtered = type === "All" ? pool : pool.filter((product) => product.type === type);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "new") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    return 0;
  });

  function setQuery(next) {
    const updated = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "All" || value === "featured") updated.delete(key);
      else updated.set(key, value);
    });
    setParams(updated, { replace: true });
  }

  return (
    <div className="page inner">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>{title}</span>
      </nav>
      <header className="page-intro">
        <h1 className={isSale ? "sale-title" : undefined}>{title}</h1>
        <p className="muted">
          {isSale
            ? "Markdowns on denim, fleece, and layers. Prices as marked."
            : category.blurb}
        </p>
      </header>
      <div className="toolbar">
        <div className="chips" role="list">
          <button
            type="button"
            className={type === "All" ? "chip on" : "chip"}
            onClick={() => setQuery({ type: "All" })}
          >
            All
          </button>
          {types.map((name) => (
            <button
              key={name}
              type="button"
              className={type === name ? "chip on" : "chip"}
              onClick={() => setQuery({ type: name })}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="sort">
          <span className="sr">Sort</span>
          <select value={sort} onChange={(event) => setQuery({ sort: event.target.value })}>
            <option value="featured">Featured</option>
            <option value="new">New</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
          </select>
        </label>
      </div>
      <p className="muted count">
        {sorted.length} {sorted.length === 1 ? "item" : "items"}
      </p>
      <div className="grid">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
