'use strict';


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

module.exports = { index, showAdd, add };