import { usePageTitle } from "../usePageTitle";

export default function Help() {
  usePageTitle("Help");

  return (
    <div className="page inner help">
      <h1>Help</h1>
      <section id="shipping">
        <h2>Shipping</h2>
        <p>Orders of $75 or more ship free. Under that, shipping is $8.</p>
        <p>This is a demo shop, so nothing is packed or mailed.</p>
      </section>
      <section id="returns">
        <h2>Returns</h2>
        <p>Unworn items can be returned within 30 days in a real shop like this one.</p>
        <p>Demo orders are not charged, so there is nothing to refund.</p>
      </section>
      <section id="sizes">
        <h2>Size guide</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Women</th>
                <th>Men</th>
                <th>Girls and boys</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XS</td>
                <td>0–2</td>
                <td>—</td>
                <td>4–5</td>
              </tr>
              <tr>
                <td>S</td>
                <td>4–6</td>
                <td>34–36</td>
                <td>6–7</td>
              </tr>
              <tr>
                <td>M</td>
                <td>8–10</td>
                <td>38–40</td>
                <td>8–10</td>
              </tr>
              <tr>
                <td>L</td>
                <td>12–14</td>
                <td>42–44</td>
                <td>12</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>16–18</td>
                <td>46–48</td>
                <td>14–16</td>
              </tr>
              <tr>
                <td>XXL</td>
                <td>20</td>
                <td>50</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Baby sizes run 0–3M through 18–24M. Toddler sizes run 2T through 5T.</p>
        <p>If you are between sizes, choose the larger one for layers.</p>
      </section>
    </div>
  );
}
