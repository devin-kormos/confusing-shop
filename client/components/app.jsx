import React from 'react';
import Header from './header';
import ProductDetails from './product-details';
import ProductList from './product-list';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
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

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: data });
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

  setView(name, params) {
    this.setState({
      view:
        { name: name, params: params }
    });
  }

  render() {
    const header = <Header setView={this.setView} cartItemCount={this.state.cart.length} />;
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container">
          {header}
          <ProductList setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div className="container">
          {header}
          <CartSummary setView={this.setView} cart={this.state.cart} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div className="container">
          {header}
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div className="container">
          {header}
          <CheckoutForm setView={this.setView} cart={this.state.cart} placeOrder={this.placeOrder} />
        </div>
      );
    }
  }
}
