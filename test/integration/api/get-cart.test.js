'use strict';

const app = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');
const { Cart } = require('../../../models');

describe('api/add-item', () => {
  before('destoy all cart records', () => Cart.destroy({ truncate: true }));
  before('populate cart', () => (
    Cart.bulkCreate([
      {
        userId: 1,
        productId: 1,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 2,
        qty: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 3,
        qty: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  ));

  describe('GET /cart/add/:id', () => {
    it('should fail to get cart due to authentication', (done) => {
      request(app)
        .get('/cart')
        .expect(401, done);
    });

    it('should get cart', (done) => {
      request(app)
        .get('/cart')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.items).to.be.an('array').with.lengthOf(3);
          expect(response.body.total).to.be.equal(74.5);
        })
        .end(done);
    });
  });
});
