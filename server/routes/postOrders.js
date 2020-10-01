const express = require('express');
const path = require('path');
const fs = require('fs');

const app = module.exports = express();

const db = require('../database');

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  const { name, creditCard, shippingAddress } = req.body;
  if (!cartId) {
    res.status(400).json({
      error: '"cartId" does not exist. Please add items to the cart'
    });
  } else if (!name || !creditCard || !shippingAddress) {
    res.status(400).json({
      error: 'please send a name, creditCard, and shippingAddress in the body'
    });
  } else {
    const sql = `
    INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const params = [cartId, name, creditCard, shippingAddress];
    db.query(sql, params)
      .then(result => {
        const order = result.rows[0];
        if (order.cartId) {
          delete req.session.cartId;
          delete order.cartId;
          return order;
        }
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => next(err));
  }
});
