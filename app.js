const koa = require('koa');
const app = new koa();

const koaRouter = require('koa-router');
const router = new koaRouter();

const helmet = require('koa-helmet');
const json = require('koa-json');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const { join } = require('path');


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