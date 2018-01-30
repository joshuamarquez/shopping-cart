'use strict';

const app = require('../../../app');
const request = require('supertest');
const { expect } = require('chai');

describe('api/get-products', () => {
  describe('GET /product', () => {
    it('should fail to get products due to authentication', (done) => {
      request(app)
        .get('/product')
        .expect(401, done);
    });

    it('should get products', (done) => {
      request(app)
        .get('/product')
        .auth('foobar', 'mypass')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          expect(response.body).to.be.an('array').with.lengthOf(3);
        })
        .end(done);
    });
  });
});
