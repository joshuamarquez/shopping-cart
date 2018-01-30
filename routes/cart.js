'use strict';

const { Product } = require('../models');
const Checkout = require('../lib/Checkout');
const error = require('http-errors');
const express = require('express');

const router = express.Router();

async function findProductById(req, res, next) {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw error(404, `Product with id ${productId} not found!`);
    }

    res.locals.product = product;
    next();
  } catch (e) {
    next(e);
  }
}

router.get('/', (req, res, next) => {
  Checkout
    .do(req.user)
    .then(items => res.send(items))
    .catch(err => next(error(500, err)));
});

router.use('/add/:id', findProductById);
router.get('/add/:id', (req, res, next) => {
  const { product } = res.locals;

  Checkout
    .addItem(product, req.user)
    .then(() => {
      res.send({ message: `Item with id ${product.id} added to cart` });
    })
    .catch(err => next(error(500, err)));
});

router.use('/remove/:id', findProductById);
router.get('/remove/:id', (req, res, next) => {
  const { product } = res.locals;

  Checkout
    .removeItem(product, req.user)
    .then(() => {
      res.send({ message: `Item with id ${product.id} removed from cart` });
    })
    .catch(err => next(error(500, err)));
});

module.exports = router;
