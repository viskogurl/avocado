// Koa Router
const koaRouter = require('@koa/router');
const router = new koaRouter();
const { index, showAdd, add } = require('../controllers/api/v1/controller');

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/test', ctx => ctx.body = { msg: `Hello ${ctx.user}` });
router.get('/test/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);

module.exports = router;
