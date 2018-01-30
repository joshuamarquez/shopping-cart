'use strict';

const { Product } = require('../models');
const error = require('http-errors');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.send(products);
  } catch (e) {
    next(error(500, e));
  }
});

module.exports = router;
