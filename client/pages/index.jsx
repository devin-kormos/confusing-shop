import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from '../components/cart-summary';
import Header from '../components/header';
import ProductList from '../components/product-list';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.getCartItems = this.getCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: data });
      });
  }

  render() {
    return (
      <div>
        <Header cartItemCount={this.state.cart.length} />
        <ProductList />
      </div>
    );
  }

}

export default MainPage;
