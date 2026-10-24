import { Link } from "react-router-dom";
import { useCart } from "../cart";
import { usePageTitle } from "../usePageTitle";

export default function Account() {
  const { setOpen, count } = useCart();
  usePageTitle("Account");

  return (
    <div className="narrow">
      <h1>Account</h1>
      <p>
        FIELD keeps your bag in this browser. {count > 0 ? `You have ${count} in your bag.` : "Your bag is empty."}
      </p>
      <p className="muted">Checkout does not ask you to sign in, and this demo does not store accounts.</p>
      <div className="inline-links">
        <button className="btn" type="button" onClick={() => setOpen(true)}>
          Open your bag
        </button>
        <Link className="btn ghost" to="/help">
          Shipping and returns
        </Link>
      </div>
    </div>
  );
}
