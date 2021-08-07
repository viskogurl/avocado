'use strict';

// Koa Router
const koaRouter = require('@koa/router');
const router = new koaRouter();
const {
  index,
  showAdd,
  add,
  postUpload,
} = require('../controllers/api/v1/controller');

// Routes
router
  .get('/', index)
  .get('/add', showAdd)
  .post('/add', add)
  .post('/upload', postUpload)

module.exports = router;
