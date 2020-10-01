import React from 'react';

function CartSummaryItem(props) {
  const item = props.item;
  const price = props.item.price.toString();
  let dollars, cents;
  if (price.length > 3) {dollars = price.slice(0, -2); cents = price.substr(-2);
  } else {dollars = price.substr(0, 1); cents = price.substr(1, 2);}
  return (
    <div className="row border-top d-flex align-items-stretch cart-item-div">
      <div className="col-lg-4 col-sm-12 my-3">
        <img height="200" width="auto" src={item.image} className="product-image" alt={item.name} />
      </div>
      <div className="col-lg-6 col-sm-12 pt-4 pb-3">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text"><small className="text-secondary">${dollars}.{cents}</small></p>
        <p className="card-text">{item.shortDescription}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
