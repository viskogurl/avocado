'use strict';

const tryify = require('../tryify');
const fs = require('fs/promises');

const gen = async (parseData) => {

  for (const mw of parseData) {
    app.use(mw);
  }

  const [ data, error ] = await tryify(fs.writeFile('./middleware/mundle.js', mundle.join('')));
  if (error) { throw new Error('gen broke...') };
}

module.exports = gen;