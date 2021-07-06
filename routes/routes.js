const koaRouter = require('@koa/router');
const router = new koaRouter();

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

module.exports = router;
