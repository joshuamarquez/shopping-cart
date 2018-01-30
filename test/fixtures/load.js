'use strict';

const {
  Product,
  User,
  sequelize,
} = require('../../models');
const bcrypt = require('bcrypt');

before(() => (
  sequelize.sync({
    force: true,
  })
    .then(() => (
      Product.bulkCreate([
        {
          id: 1,
          code: 'PANTS',
          name: 'Pants',
          price: 5.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          code: 'TSHIRT',
          name: 'T-Shirt',
          price: 20.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          code: 'HAT',
          name: 'Hat',
          price: 7.50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    ))
    .then(() => (
      User.create({
        id: 1,
        username: 'foobar',
        password: bcrypt.hashSync('mypass', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ))
));
