import React from 'react';
import CartSummaryItem from './inner/cart-summary-item';
import CartSummary from './cart-summary';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.handleReset();
    this.props.placeOrder(order);
    this.props.setView('checkout', {});
  }

  handleReset() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('checkoutForm').reset();
  }

  render() {
    const cartTotal = this.props.cart.reduce((acc, cur) => acc + cur.price, 0).toString();
    let dollars, cents;
    if (cartTotal.length === 3) {dollars = cartTotal.substr(0, 1); cents = cartTotal.substr(-2);
    } else {dollars = cartTotal.slice(0, -2);cents = cartTotal.substr(-2);}
    return (
      <div className="container mt-4">
        <div className="row">
          <form id="checkoutForm" onSubmit={this.handleSubmit} onReset={this.handleReset} className="col-8">
            <h5 className="mt-3 mb-3">Billing Details</h5>
            <label>Name*</label>
            <div><input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="border input-group mb-3 py-1 pl-2"></input></div>
            <label>Credit Card*</label>
            <div><input required value={this.state.creditCard} onChange={this.handleChange} name="creditCard" type="text" className="border input-group mb-3 py-1 pl-2"></input></div>
            <label>Shipping Address*</label>
            <div><input required value={this.state.shippingAddress} onChange={this.handleChange} name="shippingAddress" className="shipping-address border input-group mb-3 py-1 pl-2"></input></div>
            <label>Order notes (optional)</label>
            <div><textarea onChange={this.handleChange} name="orderNotes" className="order-notes border input-group mb-3 py-1 pl-2"></textarea></div>
            <a onClick={() => this.props.setView('cart', {})} className="text-muted mt-3 mb-4 back-to-catalog">Cart > Checkout</a>
            <div className="d-flex justify-content-between mt-3 float-right">
              <button className="m-1 px-4 py-2 btn btn-danger">Place Order</button>
            </div>
          </form>
          <div className="border checkoutCheckout col-4 p-4">
            <h4 className="border-bottom pb-3 mb-0">Your order</h4>
            <div>
              <div className="pb-2 pt-3 border-bottom">
                <div className="d-inline-block subtotal">Subtotal</div>
                <div className="d-inline-block dollardollar">{`$${dollars}.${cents}`}</div>
              </div>
              <div className="pb-2 pt-3 border-bottom">
                <div className="d-inline-block subtotal">Shipping</div>
                <div className="d-inline-block dollardollar">Free</div>
              </div>
              <div className="pb-2 pt-3">
                <div className="d-inline-block subtotal">Total</div>
                <div className="d-inline-block dollardollar">{`$${dollars}.${cents}`}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default CheckoutForm;
