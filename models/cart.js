'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
  });

  Cart.associate = function associate(models) {
    Cart.belongsTo(models.User, { as: 'user' });
    Cart.belongsTo(models.Product, { as: 'product' });
  };

  return Cart;
};
