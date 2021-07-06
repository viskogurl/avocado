const koa = require('koa');
const app = new koa();

const helmet = require('koa-helmet');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const { join } = require('path');
require('dotenv').config();

const router = require('./routes/routes');

const dbURI = process.env.dbURI;
const port = process.env.PORT || 3000;


console.log(process.env);

// Koa Body Parser
app.use(bodyParser());

// Security Headers Middleware
app.use(helmet());

// JSON Prettier Middleware
app.use(json());

// Add additional properties to context
app.context.user = 'Ian';

// Simple Middleware Example
// app.use(async ctx => ctx.body = { msg: 'hello world'});



render(app, {
  root: join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/test', ctx => ctx.body = `Hello ${ctx.user}`);
router.get('/test/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('app running on port 3000'));