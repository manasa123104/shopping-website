import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart";
import Layout from "./components/Layout";
import Account from "./pages/Account";
import Catalog from "./pages/Catalog";
import Checkout from "./pages/Checkout";
import Help from "./pages/Help";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import { usePageTitle } from "./usePageTitle";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="c/:category" element={<Catalog />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="help" element={<Help />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="narrow">
      <h1>We can't find that page.</h1>
      <Link to="/" className="btn">
        Back home
      </Link>
    </div>
  );
}
