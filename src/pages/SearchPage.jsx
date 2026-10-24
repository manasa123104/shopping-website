import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../data";
import { usePageTitle } from "../usePageTitle";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const results = searchProducts(q);
  usePageTitle(q ? `Search: ${q}` : "Search");

  return (
    <div className="page inner">
      <h1>Search</h1>
      {q ? (
        <p className="muted count">
          {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
        </p>
      ) : (
        <p className="muted count">Search for jeans, a hoodie, or baby.</p>
      )}
      {q && results.length === 0 && (
        <p className="empty-copy">Nothing matched. Try tee, denim, or fleece.</p>
      )}
      <div className="grid">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
