'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  }, {
    classMethods: {
      associate: models => {}, // eslint-disable-line
    },
  });

  return Product;
};
