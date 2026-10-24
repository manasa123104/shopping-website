import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart";
import { getProduct, labelFor, products } from "../data";
import { money } from "../money";
import { usePageTitle } from "../usePageTitle";
import Photo from "../components/Photo";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product?.colors[0]?.name || "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  usePageTitle(product?.name || "Product");

  useEffect(() => {
    setSize("");
    setColor(product?.colors[0]?.name || "");
    setQty(1);
    setError("");
  }, [id, product]);

  if (!product) {
    return (
      <div className="narrow">
        <h1>That piece is no longer listed.</h1>
        <Link to="/" className="btn">
          Back home
        </Link>
      </div>
    );
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  function onAdd() {
    if (!size) {
      setError("Select a size.");
      return;
    }
    add(product, { size, color, qty });
    setError("");
  }

  return (
    <div className="page inner">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/c/${product.category}`}>{labelFor(product.category)}</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>
      <div className="pdp">
        <div className="pdp-photo">
          <Photo src={product.image} alt={product.name} />
        </div>
        <div className="pdp-info">
          <p className="eyebrow">{labelFor(product.category)}</p>
          <h1>{product.name}</h1>
          <p className="fit">{product.fit}</p>
          <p className="price large">
            {product.compareAt ? (
              <>
                <s>{money(product.compareAt)}</s>
                <span className="now">{money(product.price)}</span>
              </>
            ) : (
              <span>{money(product.price)}</span>
            )}
          </p>
          <p className="choice">Color: {color}</p>
          <div className="swatch-row">
            {product.colors.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                className={color === swatch.name ? "swatch on" : "swatch"}
                style={{ background: swatch.hex }}
                aria-label={swatch.name}
                aria-pressed={color === swatch.name}
                onClick={() => setColor(swatch.name)}
              />
            ))}
          </div>
          <p className="muted photo-note">
            {product.photoNote || `Photo shows ${product.colors[0].name}.`}
          </p>
          <div className="size-head">
            <span>Size</span>
            <span className="muted">{size || "Select a size"}</span>
          </div>
          <div className="sizes" role="list">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                className={size === option ? "size-btn on" : "size-btn"}
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setError("");
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <details className="guide">
            <summary>Size guide</summary>
            <p>
              Adult sizes run XS–XXL. Kids' XS fits about a 4–5, and XL fits about a 14–16. Between
              sizes, choose the larger one if you plan to layer.
            </p>
          </details>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="buy-row">
            <div className="qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((value) => Math.min(10, value + 1))}
              >
                +
              </button>
            </div>
            <button className="btn full" type="button" onClick={onAdd}>
              Add to bag
            </button>
          </div>
          <p className="muted ship-line">Free shipping on orders of $75+.</p>
          <p className="description">{product.description}</p>
          <details open>
            <summary>Details</summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Fabric and care</summary>
            <p>{product.fabric}</p>
            <p>{product.care}</p>
          </details>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2>You may also like</h2>
          </div>
          <div className="grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
