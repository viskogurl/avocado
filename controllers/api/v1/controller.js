'use strict';

const { uploadFile } = require('../../../coordinators/upload');
const { createReadStream } = require('fs');

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
  console.log(body);
  things.push(body.thing);
  ctx.redirect('/');
}

async function fib(ctx) {
  await ctx.render('fib');
}

async function getUpload(ctx) {
  await ctx.render('upload');
}

async function postUpload(ctx) {
  const files = ctx.request.files;
  const file = files[Object.keys(files)[0]];
  const { key, url } = await uploadFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type,
  });
  ctx.body = { key, url };
}

async function swipe(ctx, next) {
  ctx.type = 'html';
  ctx.body = createReadStream('./views/swipe.html');
}

module.exports = { index, showAdd, add, fib, getUpload, postUpload, swipe };
