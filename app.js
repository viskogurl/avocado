// Koa Instantiation
const Koa = require('koa');
const app = new Koa();

const http = require('http');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const render = require('koa-ejs');
const { join } = require('path');
const router = require('./routes/routes');
const { tryify } = require('./utils/klar');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbURI = process.env.dbURI;
const port = process.env.PORT || 8080;



// Security Headers Middleware
app.use(helmet());

// Koa Body Parser
app.use(bodyParser());

// JSON Prettier Middleware
app.use(json());

// Koa EJS Configuration
render(app, {
  root: join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Router Middleware
app.use(router.routes());
app.use(router.allowedMethods());



/**
 * Database connection function.
 * @param {string} URI - Mongo Atlas URI string.
 * @param {number} PORT - Port number.
 */
const client = new MongoClient(dbURI, {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  const [data, error] = await tryify(client.connect());
  if (error) { throw new Error(error) };
})()

const Server = http.createServer(app.callback()).listen(port, () => console.log('Server up and running...'));


const cleanup = () => {
  console.log(Server);
  console.log(Server.close(() => { console.log('closed')}));
  client.close();
  console.log('\nServer closed...');
  console.log('\nMongo connection closed...');
}

process.on('SIGTERM', () => {
  cleanup();
});

process.on('SIGINT', () => {
  cleanup()
});