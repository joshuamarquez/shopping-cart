'use strict';

const app = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('api/add-item', () => {
  describe('GET /cart/add/:id', () => {
    it('should fail to add item to cart due to authentication', (done) => {
      request(app)
        .get('/cart/add/1')
        .expect(401, done);
    });

    it('should fail to add unexisting item to cart', (done) => {
      request(app)
        .get('/cart/add/-1')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(done);
    });

    it('should add item to cart', (done) => {
      request(app)
        .get('/cart/add/1')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.an('string');
        })
        .end(done);
    });
  });
});
