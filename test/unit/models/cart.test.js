'use strict';

const {
  Product,
  User,
  Cart,
  sequelize,
} = require('../../../models');
const { expect } = require('chai');

describe('models/cart', () => {
  before(() => sequelize.sync({ force: true }));

  before('create user and product', () => (
    Product.create({
      id: 1,
      code: 'PANTS',
      name: 'Pants',
      price: 5.00,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then(() => (
        User.create({
          id: 1,
          username: 'foobar',
          password: 'mypass',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ))
  ));

  describe('#create()', () => {
    it('should create cart', (done) => {
      Cart.create({
        userId: 1,
        productId: 1,
        qty: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((cart) => {
          expect(cart.userId).to.equal(1);
          expect(cart.productId).to.equal(1);
          done();
        })
        .catch(done);
    });
  });

  describe('#findAll()', () => {
    it('should find all carts', (done) => {
      Cart.findAll()
        .then((cart) => {
          expect(cart).to.be.an('array').with.length(1);
          done();
        })
        .catch(done);
    });
  });
});
