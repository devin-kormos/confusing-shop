import React from 'react';
import ProductList from './product-list';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(data => this.setState(state => ({ product: data })));
  }

  render() {
    const product = this.state.product;
    if (product === null) return null;
    return (
      <div className="container p-3 mt-5 detail-view">
        <div className="row">
          <a onClick={() => this.props.setView('catalog', {})} className="text-muted pl-4 mb-4 point back-to-catalog">Products > {product.name}</a>
        </div>
        <div className="row mb-5">
          <div className="col-lg-4 col-sm-12">
            <img className="product-image" height="400px" width="auto" src={product.image} alt={product.name}></img>
          </div>
          <div className="col-lg-7 col-sm-12">
            <h2>{product.name}</h2>
            <p className="card-text">{product.longDescription}</p>
            <p className="dollarprice">${this.props.params.dollars}.{this.props.params.cents}</p>
            <button onClick={() => this.props.addToCart(product)} type="button" className="btn btn-danger mt-1">Add to Cart</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="tabs">
              <span className="p-2">Additional Information</span>
            </div>
            <div className="description-short p-2">
              <p className="mt-4 pl-2">{product.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* <div className="row extras">
          <div className="col">
            <ProductList />
          </div>
        </div> */}

      </div>
    );
  }
}

export default ProductDetails;
