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

Then use as below (with Caching):

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

# Coming soon

- [x] Expire items
