import { Link } from "react-router-dom";
import { categories, heroes, products } from "../data";
import { usePageTitle } from "../usePageTitle";
import Photo from "../components/Photo";
import ProductCard from "../components/ProductCard";

export default function Home() {
  usePageTitle("");
  const arrivals = products.filter((product) => product.isNew).slice(0, 8);
  const sale = products.filter((product) => product.compareAt).slice(0, 4);
  const family = categories.filter((category) =>
    ["girls", "boys", "baby", "toddler"].includes(category.id)
  );

  return (
    <>
      <section className="hero">
        <Link to="/c/women" className="hero-panel">
          <img src={heroes.women} alt="" />
          <div className="veil" />
          <div className="copy">
            <p>Women</p>
            <h2>The fleece edit</h2>
            <span className="btn light">Shop women</span>
          </div>
        </Link>
        <Link to="/c/men" className="hero-panel">
          <img src={heroes.men} alt="" />
          <div className="veil" />
          <div className="copy">
            <p>Men</p>
            <h2>Denim and chinos</h2>
            <span className="btn light">Shop men</span>
          </div>
        </Link>
      </section>

      <section className="cats inner" aria-label="Kids and baby">
        {family.map((category) => (
          <Link key={category.id} to={`/c/${category.id}`} className="cat">
            <Photo src={category.image} alt="" />
            <span>{category.label}</span>
          </Link>
        ))}
      </section>

      <section className="section inner">
        <div className="section-head">
          <h2>New arrivals</h2>
          <span className="inline-links">
            <Link to="/c/women">Women</Link>
            <Link to="/c/men">Men</Link>
          </span>
        </div>
        <div className="grid">
          {arrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="story-wrap">
        <div className="story">
          <img src={heroes.denim} alt="Folded blue denim jeans" />
          <div className="story-copy">
            <p className="eyebrow">Denim</p>
            <h2>Light, dark, and straight.</h2>
            <p>Washed for softness, with a little room so they work all week.</p>
            <div className="inline-links">
              <Link className="btn ghost" to="/c/women?type=Jeans">
                Shop women's denim
              </Link>
              <Link className="btn ghost" to="/c/men?type=Jeans">
                Shop men's denim
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section inner">
        <div className="section-head">
          <h2>Marked down</h2>
          <Link to="/c/sale">Shop sale</Link>
        </div>
        <div className="grid">
          {sale.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
