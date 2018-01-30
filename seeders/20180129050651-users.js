'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Users', [
      {
        username: 'joshua',
        password: bcrypt.hashSync('pass123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'foobar',
        password: bcrypt.hashSync('mypass', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  ),

  down: queryInterface => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};
