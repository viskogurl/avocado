// Koa Router
const koaRouter = require('@koa/router');
const router = new koaRouter();

// Koa Body Parser
const bodyParser = require('koa-bodyparser');
router.use(bodyParser());

// JSON Prettier Middleware
const json = require('koa-json');
router.use(json());

// Replace with DB
const things = ['My Family', 'Programming', 'Music'];

// List of things
const index = async (ctx) => {
  await ctx.render('index', {
    title: 'Things I Love',
    things,
  });
};

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

// Routes

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/test', ctx => ctx.body = { msg: `Hello ${ctx.user}` });
router.get('/test/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);

module.exports = router;
