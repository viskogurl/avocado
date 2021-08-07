'use strict';

const { uploadFile } = require('../../../coordinators/upload');

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

module.exports = { index, showAdd, add, postUpload};
