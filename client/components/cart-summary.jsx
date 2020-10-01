import React from 'react';
import CartSummaryItem from './inner/cart-summary-item';

function CartSummary(props) {
  const cartTotal = props.cart.reduce((acc, cur) => acc + cur.price, 0).toString();
  let dollars, cents;
  if (cartTotal.length === 3) {dollars = cartTotal.substr(0, 1); cents = cartTotal.substr(-2);
  } else {dollars = cartTotal.slice(0, -2); cents = cartTotal.substr(-2);}
  const backToCatalog = <a onClick={() => props.setView('catalog', {})} className="text-muted point back-to-catalog mb-4">Products > Cart</a>;
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
      <div className="d-flex justify-content-end">
        <div className="checkout-area mt-3">
          <div className="pb-3 border-bottom">
            <div className="d-inline-block subtotal">Subtotal</div>
            <div className="d-inline-block dollardollar">{`$${dollars}.${cents}`}</div>
          </div>

          <div className="float-right">
            <button onClick={() => props.setView('checkout', {})} className="mt-3 mb-4 btn btn-danger">Checkout</button>
          </div>

          </div>
      </div>
    </div>
  );
}

export default CartSummary;
