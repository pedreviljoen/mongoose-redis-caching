<div align="center">
    <img src="./assets/redis-logo.png" width="50%" height="75%">
</div>

# mongoose-redis-caching

> Simple and efficient mongoose redis caching solution

[![Package version](https://img.shields.io/npm/v/mongoose-redis-caching.svg?style=flat-square)](https://npmjs.org/package/mongoose-redis-caching)
[![License](https://img.shields.io/npm/l/mongoose-redis-caching.svg?style=flat-square)](https://github.com/pedreviljoen/mongoose-redis-caching/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/mongoose-redis-caching.svg?style=flat-square)](https://npmjs.org/package/mongoose-redis-caching)
[![Travis CI build status](https://img.shields.io/travis/pedreviljoen/mongoose-redis-caching.svg?style=flat-square)](https://travis-ci.org/pedreviljoen/mongoose-redis-caching)

## About

A simple Mongoose Redis caching module.

## Installation

```sh
npm i mongoose-redis-caching
```

OR

```sh
yarn add mongoose-redis-caching
```

## Usage

Require in the module

```javascript
const mongoose = require("mongoose");
const mongooseRedisCaching = require("mongoose-redis-caching");
```

Configure your mongoose caching instance

```javascript
mongooseRedisCaching(mongoose);
```

Add your own Redis URL to your **.env** file. The default is set to your local redis instance.

Then use as below (with Caching & no compression):

```javascript
const blogs = await Blog.find({ _user: req.user.id }).cache();
```
With time expiration (in seconds, default is 60 sec):

```javascript
const blogs = await Blog.find({ _user: req.user.id }).cache(15);
```

Use as below (without Caching):

```javascript
const blogs = await Blog.find({ _user: req.user.id });
```

## License

MIT

## Coming soon

- [x] Expire items
