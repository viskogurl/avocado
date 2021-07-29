const Koa = require('koa');
const router = require('./routes/routes');
const { tryify } = require('./utils/klar');
const { MongoClient } = require('mongodb');
const serve = require('koa-static');
const mount = require('koa-mount');
const mundler = require('./utils/mundler/parse');
require('dotenv').config();

const app = new Koa();

const dbURI = process.env.dbURI;
const port = process.env.PORT || 3000;

app.use(mount('/public', serve('./public')));
app.use(router.routes()).use(router.allowedMethods());

/**
 * Database connection function.
 * @param {string} URI - Mongo Atlas URI string.
 * @param {number} PORT - Port number.
 */
// const client = new MongoClient(dbURI, {
//   poolSize: 5,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// (async () => {
//   const [data, error] = await tryify(client.connect());
//   if (error) {
//     throw new Error(error);
//   } else {
//     app.listen(port, () => console.log('Server up and running...'));
//   }
// })();
(async (_app, _port) => {
  await mundler(_app);
  _app.listen(_port, () => { console.log(`Running on port: ${_port}`)});
  console.log(app.middleware);
})(app, port);