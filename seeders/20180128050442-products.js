'use strict';

module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Products', [
      {
        code: 'PANTS',
        name: 'Pants',
        price: 5.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'TSHIRT',
        name: 'T-Shirt',
        price: 20.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'HAT',
        name: 'Hat',
        price: 7.50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  ),

  down: queryInterface => (
    queryInterface.bulkDelete('Products', null, {})
  ),
};
