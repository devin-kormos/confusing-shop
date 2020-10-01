import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Index from './pages/index'
import Header from './components/header';
import ProductDetails from './components/product-details';
import ProductList from './components/product-list';
import CartSummary from './components/cart-summary';
import CheckoutForm from './components/checkout-form';
import Modal from './components/modal';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

// Pages
import MainPage from './pages/index';
import NotFoundPage from './pages/404';
import CartPage from './pages/cart';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        const newCart = this.state.cart.slice();
        newCart.push(data);
        this.setState({ cart: newCart });
      });
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(() => {
        this.setState({ cart: [] });
        this.setState({ view: { name: 'catalog', params: {} } });
      });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route exact path="/cart" component={CartPage} />
          <Redirect to="/404"/>
        </Switch>
      </Router>
    );
  }
}
