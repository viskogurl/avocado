'use strict';

const Koa = require('koa');
const router = require('./routes/routes');
const { tryify } = require('./utils/klar');
const { MongoClient } = require('mongodb');
const serve = require('koa-static');
const mount = require('koa-mount');
const render = require('koa-ejs');
const mundler = require('./utils/mundler/parse');
const { join } = require('path');
require('dotenv').config();

const app = new Koa();

const dbURI = process.env.dbURI;
const port = process.env.PORT || 3000;

// App Middleware Configuration
const mundle = async (_app) => {
  _app.use(async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      // some errors will have .status
      // however this is not a guarantee
      ctx.status = err.status || 500;
      ctx.type = 'html';
      ctx.body = '<p>Server <em>exploded</em>...</p>';

      // since we handled this manually we'll
      // want to delegate to the regular app
      // level error handling as well so that
      // centralized still functions correctly.
      ctx.app.emit('error', err, ctx);
    }
  });

  // error handler
  _app.on('error', function (err) {
    if (process.env.NODE_ENV != 'test') {
      console.log('sent error %s to the cloud', err.message);
      console.log(err);
    }
  });

  // Middleware Bundler Util Function
  await mundler(_app);

  // Static files
  _app.use(mount('/public', serve('./public')));

  // Koa EJS Configuration
  render(_app, {
    root: join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
  });

  // Routes Configuration
  _app.use(router.routes()).use(router.allowedMethods());
};

// Mongo Client Configuration
const client = new MongoClient(dbURI, {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server Configuration
(async (_app, _port) => {
  await mundle(_app);

  const [data, error] = await tryify(client.connect());
  if (error) {
    throw new Error(error);
  } else {
    _app.listen(_port, () => {
        console.log(`Running on port: ${_port}`);
      });
  }
})(app, port);
