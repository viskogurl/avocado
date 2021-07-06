import koa from 'koa';
const app = new koa();

import koaRouter from 'koa-router';
const router = new koaRouter();

import helmet from 'koa-helmet';
import json from 'koa-json';
import render from 'koa-ejs';
import bodyParser from 'koa-bodyparser';
import * as path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Replace with DB
const things = ['My Family', 'Programming', 'Music'];

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

// List of things
const index = async (ctx) => {
  await ctx.render('index', {
    title: 'Things I Love',
    things
  });
}

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);



// Show Add Page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

render(app, {
  root: path.join(__dirname, 'views'),
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