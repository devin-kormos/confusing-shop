import React from 'react';
import { Link } from 'react-router-dom';
import CartSummaryItem from '../components/inner/cart-summary-item';

function CartSummary(props) {
  const cartTotal = props.cart.reduce((acc, cur) => acc + cur.price, 0).toString();
  let dollars, cents;
  if (cartTotal.length === 3) {
    dollars = cartTotal.substr(0, 1);
    cents = cartTotal.substr(-2);
  } else {
    dollars = cartTotal.slice(0, -2);
    cents = cartTotal.substr(-2);
  }
  const backToCatalog = <Link to="/" className="text-muted point back-to-catalog mb-4">&lt; Back to catalog</Link>;
  if (props.cart.length === 0) {
    return (
      <div className="container mt-3">
        {backToCatalog}
        <h1>My Cart</h1>
        <p>There are no items in your cart</p>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      {backToCatalog}
      <h2 className="mt-3 mb-4">My Cart</h2>
      <div className="container">
        {
          props.cart.map(item => {
            return (
              <CartSummaryItem key={item.cartItemId} item={item} />
            );
          })
        }
      </div>
      <div className="d-flex justify-content-between">
        <h5 className="pb-4 pt-3">{`Item Total $${dollars}.${cents}`}</h5>
        <div>
          <button onClick={() => props.setView('checkout', {})} className="mt-3 mb-4 btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
