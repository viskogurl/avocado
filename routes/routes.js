// Koa Router
const koaRouter = require('@koa/router');
const router = new koaRouter();
const { index, showAdd, add, fib, getUpload, postUpload, swipe } = require('../controllers/api/v1/controller');


// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/fib', fib);
router.get('/test', ctx => ctx.body = { msg: `Hello ${ctx.user}` });
router.get('/test/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);
router.get('/upload', getUpload);
router.post('/upload', postUpload);
router.get('/swipe', swipe)

module.exports = router;
