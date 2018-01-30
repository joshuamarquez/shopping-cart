# Shopping Cart

Shopping Cart using Express and Sequelize.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2ca2cb4c60c21098e87d)

## API Docs

https://documenter.getpostman.com/view/37810/collection/7TQ9Aix

**Notes**

API is protected with HTTP Basic Authentication, use one of the users
in `seeders/*-users.js` to authenticate or create a new one to request API.

## Install 

Clone this repo and `cd` into it, then:

## Usage (without Docker)

Install dependencies.

```
$ npm install
```

Database setup

```
$ ./node_modules/.bin/sequelize db:migrate
$ ./node_modules/.bin/sequelize db:seed:all
```

Run Shopping Cart

```
$ npm start
```

## Usage (with Docker)

Run Shopping Cart

```
$ docker-compose up -d
```

Database setup

```
$ docker exec shopping_cart_app node ./node_modules/.bin/sequelize db:migrate
$ docker exec shopping_cart_app node ./node_modules/.bin/sequelize db:seed:all
```

**Notes**

* Run database setup commands once containers are up and running.

Tested with:

* Docker 17.12.0-ce
* Docker Compose 1.16.1

## Test

To run unit tests

```
$ npm run test:unit
```

To run integration tests

```
$ npm run test:integration
```

To run all tests

```
$ npm run test
```
