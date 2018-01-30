'use strict';

module.exports = {
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  development: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'database_development',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};
