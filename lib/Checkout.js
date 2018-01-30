'use strict';

const { discounts } = require('../config/shop');
const { Product, Cart } = require('../models');
const omit = require('lodash.omit');

class Checkout {
  static async addItem(item, user) {
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        productId: item.id,
      },
    });

    if (cart) {
      cart.qty += 1;
      return cart.save();
    }

    return Cart.create({
      userId: user.id,
      productId: item.id,
      qty: 1,
    });
  }

  static async removeItem(item, user) {
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        productId: item.id,
      },
    });

    if (!cart) {
      return Promise.resolve();
    }

    if (cart.qty > 1) {
      cart.qty -= 1;
      return cart.save();
    }

    return cart.destroy();
  }

  static async do(user) {
    let items = await Cart.findAll({
      where: {
        userId: user.id,
      },
      include: [{
        model: Product,
        as: 'product',
      }],
    });

    items = items.map(item => (
      omit({ ...item.product.dataValues, qty: item.qty }, [
        'createdAt',
        'updatedAt',
      ])
    ));

    return {
      items,
      total: Checkout.computeTotal(items),
    };
  }

  static computeTotal(items) {
    return items.reduce((previous, current) => {
      let currentTotal = current.price * current.qty;

      const discount = discounts.find(d => d.code === current.code);

      if (discount) {
        currentTotal = discount.calculate(current.qty, current.price);
      }

      return previous + currentTotal;
    }, 0);
  }
}

module.exports = Checkout;
