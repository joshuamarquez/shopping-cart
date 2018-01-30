'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('api-error-handler');
const error = require('http-errors');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const { User } = require('./models');
const bcrypt = require('bcrypt');

const products = require('./routes/products');
const cart = require('./routes/cart');

passport.use(new Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return done(null, false);
    }

    if (!await bcrypt.compare(password, user.password)) {
      return done(null, false);
    }

    return done(null, user.dataValues);
  } catch (err) {
    return done(err);
  }
}));

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  '/product',
  passport.authenticate('basic', { session: false }),
  products,
);

app.use(
  '/cart',
  passport.authenticate('basic', { session: false }),
  cart,
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(error(404, 'Not Found'));
});

app.use(errorHandler());

module.exports = app;
