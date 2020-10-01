const express = require('express');
const path = require('path');
const fs = require('fs');

const app = module.exports = express();

const db = require('../database');

app.get('/api/products', (req, res, next) => {
  const sql = `
  SELECT
  "name",
  "productId",
  "price",
  "image",
  "shortDescription"
  FROM "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});
