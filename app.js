const koa = require('koa');
const app = new koa();

const helmet = require('koa-helmet');
const render = require('koa-ejs');
const { join } = require('path');
require('dotenv').config();

const router = require('./routes/routes');

const dbURI = process.env.dbURI;
const port = process.env.PORT || 3000;

// Security Headers Middleware
app.use(helmet());

// Add additional properties to context
app.context.user = 'Ian';

render(app, {
  root: join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Server running on port: ${port}`));