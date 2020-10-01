import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  const cartText = props.cartItemCount === 1 ? 'item' : 'items';
  return (
    <nav className="container">
      <div className="container-fluid py-5 px-0">
        <div className="container-fluid d-inline-flex px-0 justify-content-between align-items-center">
          <Link to="/" className="home point navbar-brand">
            <img src="/images/strawberry.svg" width="40" height="40" className="pr-2" />
              SHOP
          </Link>
          <Link to="/cart" className="cart-div point navbar-brand mr-0">
            <span className="mr-2">{`${props.cartItemCount} ${cartText}`}</span>
            <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
