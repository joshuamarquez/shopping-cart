'use strict';

const app = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');
const { Cart } = require('../../../models');

describe('api/remove-item', () => {
  before('destoy all cart records', () => Cart.destroy({ truncate: true }));
  before('populate cart', () => (
    Cart.create({
      userId: 1,
      productId: 1,
      qty: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  ));

  describe('GET /cart/remove/:id', () => {
    it('should fail to remove item from cart due to authentication', (done) => {
      request(app)
        .get('/cart/remove/1')
        .expect(401, done);
    });

    it('should fail to remove unexisting item from cart', (done) => {
      request(app)
        .get('/cart/remove/-1')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(done);
    });

    it('should remove item from cart', (done) => {
      request(app)
        .get('/cart/remove/1')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.an('string');
        })
        .end((err) => {
          expect(err).to.be.null;

          Cart.findOne({
            where: { productId: 1 },
          })
            .then((cart) => {
              expect(cart).to.be.ok;
              expect(cart.qty).to.be.equal(2);
              done();
            })
            .catch(done);
        });
    });
  });
});
