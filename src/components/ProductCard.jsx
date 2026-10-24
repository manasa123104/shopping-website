import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { money } from "../money";
import Photo from "./Photo";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <article className="card">
      <div className="card-media">
        <Link to={`/product/${product.id}`}>
          <Photo src={product.image} alt={product.name} />
        </Link>
        {product.compareAt ? (
          <span className="flag">Sale</span>
        ) : product.isNew ? (
          <span className="flag flag-new">New</span>
        ) : null}
        <div className="quick">
          <p>Add</p>
          <div className="quick-sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  add(product, { size, color: product.colors[0].name })
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Link className="card-name" to={`/product/${product.id}`}>
        {product.name}
      </Link>
      <div className="swatches">
        {product.colors.slice(0, 5).map((color) => (
          <i key={color.name} style={{ background: color.hex }} title={color.name} />
        ))}
      </div>
      <p className="price">
        {product.compareAt ? (
          <>
            <s>{money(product.compareAt)}</s>
            <span className="now">{money(product.price)}</span>
          </>
        ) : (
          <span>{money(product.price)}</span>
        )}
      </p>
    </article>
  );
}
