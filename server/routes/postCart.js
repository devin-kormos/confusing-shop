let express = require('express'),
  path = require('path'),
  fs = require('fs'),

  app = module.exports = express();

const db = require('../database');

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'productId must be a positive integer'
    });
  }
  const sql = `
  SELECT "price"
  FROM "products"
  WHERE "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const price = result.rows[0];
      if (!price) {
        throw next(new ClientError('That product doesn\'t exist. Please enter a different productId', 404));
      } else if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price.price
        };
      } else {
        const cartSQL = `
        INSERT INTO "carts" ("cartId", "createdAt")
        VALUES (default, default)
        RETURNING "cartId"
        `;
        return db.query(cartSQL)
          // .then(result => res.json(result))
          .then(result => {
            const cartId = result.rows[0].cartId;
            return {
              cartId,
              price: price.price
            };
          })
          .catch(err => next(err));
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const cartItemSQL = `
        insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
      `;
      const params = [req.session.cartId, productId, result.price];
      return db.query(cartItemSQL, params)
        .then(result => result.rows[0].cartItemId)
        .catch(err => next(err));
    })
    .then(result => {
      const cartItemId = result;
      const productInfoSQL = `
      SELECT "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
      FROM "cartItems" AS "c"
      JOIN "products" AS "p" USING ("productId")
      WHERE "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      return db.query(productInfoSQL, params)
        .then(result => res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});
