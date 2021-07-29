// Koa Router
const koaRouter = require('@koa/router');
const router = new koaRouter();
const {
  index,
  showAdd,
  add,
  fib,
  getUpload,
  postUpload,
  swipe,
} = require('../controllers/api/v1/controller');

// Routes
router
  .get('/', index)
  .get('/add', showAdd)
  .post('/add', add)
  .get('/fib', fib)
  .get('/test', (ctx) => (ctx.body = { msg: `Hello ${ctx.user}` }))
  .get('/test/:name', (ctx) => (ctx.body = `Hello ${ctx.params.name}`))
  .get('/upload', getUpload)
  .post('/upload', postUpload)
  .get('/swipe', swipe);

module.exports = router;
