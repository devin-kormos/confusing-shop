let express = require('express'),
  path = require('path'),
  fs = require('fs'),

  app = module.exports = express();

const db = require('../database');

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) { res.status(200).json([]); } else {
    const sql = `
    SELECT "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
    FROM "cartItems" as "c"
    JOIN "products" AS "p" using("productId")
    WHERE "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  }
});
