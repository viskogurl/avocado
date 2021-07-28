const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes/routes');
const helmet = require('koa-helmet');
const json = require('koa-json');
const { tryify } = require('./utils/klar');
const { MongoClient } = require('mongodb');
const serve = require('koa-static');
const mount = require('koa-mount');
require('dotenv').config();

const app = new Koa();

const dbURI = process.env.dbURI;
const port = process.env.PORT || 8080;

app.use(mount('/public', serve('./public')));

app.use(helmet({ contentSecurityPolicy: false, }));

app.use(koaBody());
app.use(koaBody({ multipart: true }));
app.use(json());

app.use(router.routes()).use(router.allowedMethods());

console.log(app.middleware);

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

app.listen(3000, () => { console.log('upp and running on port 3000')});

const cleanup = () => {
  console.log(Server);
  console.log(
    Server.close(() => {
      console.log('closed');
    })
  );
  client.close();
  console.log('\nServer closed...');
  console.log('\nMongo connection closed...');
};

process.on('SIGTERM', () => {
  cleanup();
});

process.on('SIGINT', () => {
  cleanup();
});
