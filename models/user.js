'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) { }, // eslint-disable-line
    },
  });

  return User;
};
