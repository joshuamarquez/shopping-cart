'use strict';

const { expect } = require('chai');
const models = require('../../../models');

describe('models/index', () => {
  it('should return Product model', () => {
    expect(models.Product).to.exist;
  });

  it('should return User model', () => {
    expect(models.User).to.exist;
  });

  it('should return Cart model', () => {
    expect(models.Cart).to.exist;
  });
});
