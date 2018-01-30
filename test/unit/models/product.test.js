'use strict';

const {
  Product,
  sequelize,
} = require('../../../models');
const { expect } = require('chai');

describe('models/product', () => {
  before(() => sequelize.sync({ force: true }));

  describe('#create()', () => {
    it('should create a product', (done) => {
      Product.create({
        code: 'PANTS',
        name: 'Pants',
        price: 5.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((product) => {
          expect(product.code).to.equal('PANTS');
          done();
        })
        .catch(done);
    });
  });

  describe('#findAll()', () => {
    it('should find all products', (done) => {
      Product.findAll()
        .then((product) => {
          expect(product).to.be.an('array').with.length(1);
          done();
        })
        .catch(done);
    });
  });
});
