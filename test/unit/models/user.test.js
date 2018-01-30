'use strict';

const {
  User,
  sequelize,
} = require('../../../models');
const { expect } = require('chai');

describe('models/user', () => {
  before(() => sequelize.sync({ force: true }));

  describe('#create()', () => {
    it('should create a user', (done) => {
      User.create({
        username: 'foobar',
        password: 'mypass',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((user) => {
          expect(user.username).to.equal('foobar');
          done();
        })
        .catch(done);
    });
  });

  describe('#findAll()', () => {
    it('should find all users', (done) => {
      User.findAll()
        .then((user) => {
          expect(user).to.be.an('array').with.length(1);
          done();
        })
        .catch(done);
    });
  });
});
