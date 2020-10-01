import React from 'react';

function ProductListItem(props) {
  const price = props.product.price.toString();
  let dollars, cents;
  if (price.length > 3) {
    dollars = price.slice(0, -2);
    cents = price.substr(-2);
  } else {
    dollars = price.substr(0, 1);
    cents = price.substr(1, 2);
  }

  return (
    <div className="col-lg-4 col-sm-12 col-md-6 d-flex align-items-stretch mb-5 product">
      <div onClick={() => props.setView('details', { productId: props.product.productId, dollars: dollars, cents: cents })} className="card point product-card">
        <img height="200" src={props.product.image} className="card-img product-image" height="420" alt={props.product.name} />
        <div className="card-img-overlay internal">
          <div className="card-info-t">
            <h5 className="card-title">{props.product.name}</h5>
            <p className="card-text"><small className="text-secondary">${dollars}.{cents}</small></p>
            <div className="card-text-b pr-3">
              <div className="card-text">{props.product.shortDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
