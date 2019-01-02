<div align="center">
    <img src="./assets/redis-logo.png" width="50%" height="75%">
</div>

# About

A simple Mongoose Redis caching module.

# Installation

```sh
npm i mongoose-redis-caching
```

OR

```sh
yarn add mongoose-redis-caching
```

# Usage

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

With compression:

```javascript
const blogs = await Blog.find({ _user: req.user.id }).cache().compress()
```

Use as below with a set time (in seconds) for cached item to expire:

```javascript
const blogs = await Blog.find({ _user: req.user.id }).cache(60);
```

The default time is 60 seconds if no time is provided.

Use as below (without Caching):

```javascript
const blogs = await Blog.find({ _user: req.user.id });
```

# Coming soon

- [x] Expire items
- [x] Compression of items stored on Redis
